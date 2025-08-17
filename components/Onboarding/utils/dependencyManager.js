/**
 * Dependency Manager for onboarding steps
 * Handles step dependencies, validation chains, and business logic
 */
export class DependencyManager {
  constructor() {
    this.dependencies = new Map();
    this.validators = new Map();
    this.blockingSteps = new Set();
    this.circularDependencyCache = new Map();
  }

  /**
   * Define step dependencies
   * @param {string} stepId - The step that has dependencies
   * @param {string[]} requiredSteps - Array of step IDs that must be completed first
   * @param {Object} options - Additional dependency options
   */
  defineDependency(stepId, requiredSteps, options = {}) {
    this.dependencies.set(stepId, {
      required: requiredSteps || [],
      optional: options.optional || [],
      conditional: options.conditional || null,
      customValidator: options.customValidator || null,
      blocking: options.blocking || false,
      message: options.message || `Complete ${requiredSteps.join(', ')} first`,
    });

    // Mark as blocking if specified
    if (options.blocking) {
      this.blockingSteps.add(stepId);
    }
  }

  /**
   * Add custom validator for complex business logic
   * @param {string} stepId - Step to validate
   * @param {Function} validator - Custom validation function
   */
  addCustomValidator(stepId, validator) {
    this.validators.set(stepId, validator);
  }

  /**
   * Check if a step can be accessed
   * @param {string} stepId - Step to check
   * @param {Object} completedSteps - Set of completed step IDs
   * @param {Object} data - Current setup data
   * @returns {Object} Access result with details
   */
  canAccessStep(stepId, completedSteps, data = {}) {
    const dependency = this.dependencies.get(stepId);

    if (!dependency) {
      return {
        canAccess: true,
        reason: 'No dependencies defined',
        blockingSteps: [],
        missingSteps: [],
      };
    }

    const missingSteps = dependency.required.filter(
      step => !completedSteps.has(step)
    );
    const canAccess = missingSteps.length === 0;

    // Check conditional dependencies
    if (canAccess && dependency.conditional) {
      const conditionalResult = this.evaluateCondition(
        dependency.conditional,
        data
      );
      if (!conditionalResult.canAccess) {
        return {
          canAccess: false,
          reason: conditionalResult.reason,
          blockingSteps: conditionalResult.blockingSteps || [],
          missingSteps: conditionalResult.missingSteps || [],
        };
      }
    }

    // Run custom validator if exists
    if (canAccess && dependency.customValidator) {
      const customValidator = this.validators.get(stepId);
      if (customValidator) {
        const validationResult = customValidator(data, completedSteps);
        if (!validationResult.canAccess) {
          return {
            canAccess: false,
            reason: validationResult.reason,
            blockingSteps: validationResult.blockingSteps || [],
            missingSteps: validationResult.missingSteps || [],
          };
        }
      }
    }

    return {
      canAccess,
      reason: canAccess ? 'All dependencies satisfied' : dependency.message,
      blockingSteps: missingSteps.filter(step => this.blockingSteps.has(step)),
      missingSteps,
    };
  }

  /**
   * Get all steps that block a specific step
   * @param {string} stepId - Step to check
   * @param {Object} completedSteps - Set of completed step IDs
   * @returns {string[]} Array of blocking step IDs
   */
  getBlockingSteps(stepId, completedSteps) {
    const dependency = this.dependencies.get(stepId);
    if (!dependency) return [];

    return dependency.required.filter(step => !completedSteps.has(step));
  }

  /**
   * Get dependency chain for a step
   * @param {string} stepId - Step to analyze
   * @returns {Object} Dependency chain information
   */
  getDependencyChain(stepId) {
    const chain = new Set();
    const visited = new Set();

    this.buildChain(stepId, chain, visited);

    return {
      direct: this.dependencies.get(stepId)?.required || [],
      all: Array.from(chain),
      depth: this.calculateChainDepth(stepId),
      hasCircular: this.detectCircularDependencies(stepId),
    };
  }

  /**
   * Build dependency chain recursively
   * @param {string} stepId - Current step
   * @param {Set} chain - Accumulated chain
   * @param {Set} visited - Visited steps to prevent infinite loops
   */
  buildChain(stepId, chain, visited) {
    if (visited.has(stepId)) return;
    visited.add(stepId);

    const dependency = this.dependencies.get(stepId);
    if (!dependency) return;

    dependency.required.forEach(requiredStep => {
      chain.add(requiredStep);
      this.buildChain(requiredStep, chain, visited);
    });
  }

  /**
   * Calculate the depth of a dependency chain
   * @param {string} stepId - Step to calculate depth for
   * @returns {number} Chain depth
   */
  calculateChainDepth(stepId) {
    const dependency = this.dependencies.get(stepId);
    if (!dependency || dependency.required.length === 0) return 0;

    return (
      1 +
      Math.max(
        ...dependency.required.map(step => this.calculateChainDepth(step))
      )
    );
  }

  /**
   * Detect circular dependencies
   * @param {string} stepId - Step to check
   * @returns {boolean} Whether circular dependencies exist
   */
  detectCircularDependencies(stepId) {
    if (this.circularDependencyCache.has(stepId)) {
      return this.circularDependencyCache.get(stepId);
    }

    const visited = new Set();
    const recursionStack = new Set();

    const hasCircular = this.detectCircularDependencyDFS(
      stepId,
      visited,
      recursionStack
    );
    this.circularDependencyCache.set(stepId, hasCircular);

    return hasCircular;
  }

  /**
   * DFS to detect circular dependencies
   * @param {string} stepId - Current step
   * @param {Set} visited - Visited steps
   * @param {Set} recursionStack - Current recursion stack
   * @returns {boolean} Whether circular dependency found
   */
  detectCircularDependencyDFS(stepId, visited, recursionStack) {
    if (recursionStack.has(stepId)) return true;
    if (visited.has(stepId)) return false;

    visited.add(stepId);
    recursionStack.add(stepId);

    const dependency = this.dependencies.get(stepId);
    if (dependency) {
      for (const requiredStep of dependency.required) {
        if (
          this.detectCircularDependencyDFS(
            requiredStep,
            visited,
            recursionStack
          )
        ) {
          return true;
        }
      }
    }

    recursionStack.delete(stepId);
    return false;
  }

  /**
   * Evaluate conditional dependencies
   * @param {Function|Object} condition - Conditional logic
   * @param {Object} data - Current data
   * @returns {Object} Evaluation result
   */
  evaluateCondition(condition, data) {
    if (typeof condition === 'function') {
      return condition(data);
    }

    if (typeof condition === 'object') {
      // Handle complex conditional logic
      const { field, operator, value, requiredSteps } = condition;

      let conditionMet = false;
      switch (operator) {
        case 'equals':
          conditionMet = data[field] === value;
          break;
        case 'notEquals':
          conditionMet = data[field] !== value;
          break;
        case 'exists':
          conditionMet = data[field] != null && data[field] !== '';
          break;
        case 'notExists':
          conditionMet = data[field] == null || data[field] === '';
          break;
        case 'in':
          conditionMet = Array.isArray(value) && value.includes(data[field]);
          break;
        case 'notIn':
          conditionMet = Array.isArray(value) && !value.includes(data[field]);
          break;
        default:
          conditionMet = false;
      }

      return {
        canAccess: conditionMet,
        reason: conditionMet
          ? 'Condition met'
          : `Condition not met: ${field} ${operator} ${value}`,
        requiredSteps: requiredSteps || [],
      };
    }

    return { canAccess: true, reason: 'No condition to evaluate' };
  }

  /**
   * Get next available steps
   * @param {Object} completedSteps - Set of completed step IDs
   * @param {Object} data - Current setup data
   * @returns {string[]} Array of available step IDs
   */
  getAvailableSteps(completedSteps, data = {}) {
    const allSteps = Array.from(this.dependencies.keys());
    return allSteps.filter(stepId => {
      const accessResult = this.canAccessStep(stepId, completedSteps, data);
      return accessResult.canAccess;
    });
  }

  /**
   * Get steps that can be completed next
   * @param {Object} completedSteps - Set of completed step IDs
   * @param {Object} data - Current setup data
   * @returns {string[]} Array of next step IDs
   */
  getNextSteps(completedSteps, data = {}) {
    const availableSteps = this.getAvailableSteps(completedSteps, data);
    return availableSteps.filter(stepId => !completedSteps.has(stepId));
  }

  /**
   * Validate entire dependency graph
   * @returns {Object} Validation result
   */
  validateDependencyGraph() {
    const errors = [];
    const warnings = [];

    // Check for circular dependencies
    for (const stepId of this.dependencies.keys()) {
      if (this.detectCircularDependencies(stepId)) {
        errors.push(`Circular dependency detected for step: ${stepId}`);
      }
    }

    // Check for orphaned steps (steps that are required but not defined)
    const allRequiredSteps = new Set();
    for (const dependency of this.dependencies.values()) {
      dependency.required.forEach(step => allRequiredSteps.add(step));
    }

    for (const requiredStep of allRequiredSteps) {
      if (!this.dependencies.has(requiredStep)) {
        warnings.push(
          `Required step "${requiredStep}" is not defined in dependency graph`
        );
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Clear cache and reset state
   */
  clearCache() {
    this.circularDependencyCache.clear();
  }

  /**
   * Get dependency statistics
   * @returns {Object} Statistics about the dependency graph
   */
  getStatistics() {
    const totalSteps = this.dependencies.size;
    const totalDependencies = Array.from(this.dependencies.values()).reduce(
      (sum, dep) => sum + dep.required.length,
      0
    );

    const maxDepth = Math.max(
      ...Array.from(this.dependencies.keys()).map(stepId =>
        this.calculateChainDepth(stepId)
      )
    );

    return {
      totalSteps,
      totalDependencies,
      maxDepth,
      blockingSteps: this.blockingSteps.size,
      hasCircularDependencies: Array.from(this.dependencies.keys()).some(
        stepId => this.detectCircularDependencies(stepId)
      ),
    };
  }
}

// Export singleton instance
export const dependencyManager = new DependencyManager();

// Initialize default dependencies for onboarding steps
dependencyManager.defineDependency('step1', [], {
  blocking: false,
  message: 'Step 1 has no dependencies',
});

dependencyManager.defineDependency('step2', ['step1'], {
  blocking: true,
  message: 'Complete organization setup first',
  customValidator: (data, completedSteps) => {
    // Custom validation: step2 requires step1 to be fully completed
    if (!data.accountType || !data.association) {
      return {
        canAccess: false,
        reason: 'Organization details must be completed',
        missingSteps: ['step1'],
      };
    }
    return { canAccess: true };
  },
});

dependencyManager.defineDependency('step3', ['step1', 'step2'], {
  blocking: true,
  message: 'Complete organization and branding setup first',
  conditional: {
    field: 'logo',
    operator: 'exists',
    value: true,
    requiredSteps: ['step2'],
  },
});

dependencyManager.defineDependency('step4', ['step1', 'step2', 'step3'], {
  blocking: true,
  message: 'Complete all previous steps first',
  customValidator: (data, completedSteps) => {
    // Custom validation: step4 requires all previous steps to be completed
    const requiredSteps = ['step1', 'step2', 'step3'];
    const missingSteps = requiredSteps.filter(
      step => !completedSteps.has(step)
    );

    if (missingSteps.length > 0) {
      return {
        canAccess: false,
        reason: 'All previous steps must be completed',
        missingSteps,
      };
    }

    return { canAccess: true };
  },
});

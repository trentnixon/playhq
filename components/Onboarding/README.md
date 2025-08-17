# Onboarding System Documentation

## 🏗️ System Architecture

### **Core Components**

#### **1. Main Page**

- **File**: `pages/members/onboarding.jsx`
- **Purpose**: Main onboarding page that handles routing and conditional rendering
- **Key Features**:
  - Uses `useOnboarding()` from `OnboardingProvider` for state management
  - Conditional rendering based on account status
  - Maps step IDs to components dynamically

#### **2. Onboarding Provider**

- **File**: `components/Onboarding/OnboardingProvider.jsx`
- **Purpose**: Central state management for the entire onboarding flow
- **Key Features**:
  - Wraps the entire onboarding system
  - Provides `useOnboarding()` context to all components
  - Handles step validation and progression
  - Manages completion status

#### **3. Initial Setup Screen**

- **File**: `components/Onboarding/components/InitialSetupScreen.jsx`
- **Purpose**: Handles account creation and initial navigation
- **Key Features**:
  - Account creation flow
  - Sets `LinkedAccount` cookie after account creation
  - Triggers `forceRefresh()` to update account context
  - Direct state updates using `actions.setHasAccount(true)` and `actions.setStep(0)`
  - Comprehensive error handling with retry functionality

#### **4. Step Components**

- **File**: `components/Onboarding/steps/Step1Organization.jsx`
- **Purpose**: Organization setup with progressive disclosure
- **Key Features**:

  - Conditional rendering (Association/Club sections hidden until Account Type selected)
  - Database field pre-filling from account data
  - Form validation and auto-save

- **File**: `components/Onboarding/steps/Step2OrganisationLogo.jsx`
- **Purpose**: Logo upload and branding setup
- **Key Features**:

  - Image upload functionality
  - Logo validation and preview
  - Integration with account branding
  - Account type validation for logo saving

- **File**: `components/Onboarding/steps/Step3Theme.jsx`
- **Purpose**: Theme selection and branding customization
- **Key Features**:
  - Theme selection interface with public themes and custom theme creation
  - Integration with `SelectATheme` component
  - Automatic theme application to user account
  - Support for both predefined and custom themes
  - Responsive design for mobile and desktop

#### **5. Theme Components**

- **File**: `components/Members/Common/Customiser/Design/SelectATheme.js`
- **Purpose**: Main theme selection interface
- **Key Features**:

  - Display of public themes with color previews
  - Custom theme creation interface
  - Theme selection with immediate application
  - Responsive design for mobile and desktop
  - Integration with account context for data persistence
  - Comprehensive error handling and loading states

- **File**: `components/Members/Common/Customiser/Design/Components/CreateNewTheme.js`
- **Purpose**: Custom theme creation and editing
- **Key Features**:
  - Color picker interface for primary and secondary colors
  - Automatic initialization with current theme colors
  - Create new themes or update existing custom themes
  - Responsive design for mobile and desktop
  - Integration with account context for data persistence
  - Real-time color validation and preview

#### **6. Reusable Components**

- **File**: `components/Onboarding/components/OnboardingStepWrapper.jsx`
- **Purpose**: Wrapper component for consistent step behavior
- **Key Features**:
  - Standardized error handling and loading states
  - Success feedback and validation display
  - Continue button with validation
  - Retry functionality
  - Automatic `forceRefresh()` call before step completion

#### **7. State Management**

- **File**: `Hooks/useOnboarding.js`
- **Purpose**: Core state management and user status tracking
- **Key Features**:
  - Database-driven state (uses actual account fields)
  - Comprehensive user status hooks
  - Account initialization and refresh logic
  - Step completion and validation

## 🔄 Current Flow

### **1. Initial Load**

1. User visits `/members/onboarding`
2. `useUserStatus()` checks account existence
3. If no account: Shows `InitialSetupScreen`
4. If account exists: Shows appropriate step based on `state.currentStep`

### **2. Account Creation**

1. User clicks "Let's Get Started"
2. `createUserAccount()` API call
3. `setAccountFromLocalCookie()` sets the account ID
4. `forceRefresh()` triggers account context update
5. State updates: `setHasAccount(true)`, `setStep(0)`
6. Navigation to Step 1

### **3. Step Progression**

1. **Step 1**: Organization setup with progressive disclosure
2. **Step 2**: Logo upload and branding (with account type validation)
3. **Step 3**: Theme selection and customization
   - User can select from public themes or create custom themes
   - Theme selection immediately applies to user account
   - Custom themes are saved to CMS and linked to user account
4. Each step saves to database via `saveOnboardingProgress()`
5. `OnboardingStepWrapper` calls `forceRefresh()` before step completion

## 🎨 Theme System Details

### **Theme Selection Flow**

1. **Public Themes**: Users can select from predefined themes
2. **Custom Themes**: Users can create personalized themes with color pickers
3. **Theme Application**: Selected themes are immediately applied to user account
4. **Data Persistence**: Themes are saved to CMS and linked to user accounts

### **Custom Theme Creation**

- **Color Pickers**: Primary and secondary color selection with real-time preview
- **Theme Initialization**: Automatically loads current theme colors for editing
- **Validation**: Ensures both colors are selected before saving
- **Responsive Design**: Adapts to mobile and desktop screen sizes

### **Theme Data Structure**

```javascript
const themeData = {
  Theme: {
    primary: '#FF0000', // Primary color (hex)
    secondary: '#00FF00', // Secondary color (hex)
    dark: '#111', // Dark color
    white: '#FFF', // White color
  },
  CreatedBy: 'user-id', // User who created the theme
  isPublic: false, // Whether theme is public
  accounts: ['user-id'], // Users who can use this theme
  Name: 'Custom Theme', // Theme name
};
```

## 🎯 How to Initialize the Onboarding System

### **1. Wrap Your App with OnboardingProvider**

```javascript
// In your main page or layout
import OnboardingProvider from '../../components/Onboarding/OnboardingProvider';

const OnboardingPage = () => (
  <OnboardingProvider>
    <SetupErrorBoundary>
      <MembersWrapper>
        <OnboardingContent />
      </MembersWrapper>
    </SetupErrorBoundary>
  </OnboardingProvider>
);
```

### **2. Access State in Components**

```javascript
import { useOnboarding } from '../../components/Onboarding/OnboardingProvider';

const MyComponent = () => {
  const { state, actions } = useOnboarding();

  // Access current step
  const currentStep = state.currentStep;

  // Access step data
  const step1Data = state.data.step1;
  const step2Data = state.data.step2;
  const step3Data = state.data.step3;

  // Access completion status
  const completedSteps = state.completedSteps;

  return <div>Current Step: {currentStep + 1}</div>;
};
```

### **3. Map Steps to Components**

```javascript
// In pages/members/onboarding.jsx
const stepComponents = {
  step1: Step1Organization,
  step2: Step2OrganisationLogo,
  step3: Step3Theme,
  // Add more steps here as they're created
};

const OnboardingContent = () => {
  const { state } = useOnboarding();

  return (
    <Box>
      {(() => {
        const stepKey = `step${state.currentStep + 1}`;
        const StepComponent = stepComponents[stepKey] || Step1Organization;
        return <StepComponent />;
      })()}
    </Box>
  );
};
```

## 🚀 How to Move Between Steps

### **1. Complete Current Step (Recommended)**

```javascript
// In any step component
const MyStep = () => {
  const { actions } = useOnboarding();

  const handleContinue = async () => {
    // Save step data
    const updatedData = { ...state.data, step1: stepData };
    actions.updateData({ step1: stepData });
    await saveOnboardingProgress(updatedData);

    // Complete step and advance
    await actions.completeCurrentStep();
  };

  return (
    <OnboardingStepWrapper
      stepId='step1'
      isValid={isValid}
      onContinue={handleContinue}
    >
      {/* Step content */}
    </OnboardingStepWrapper>
  );
};
```

### **2. Manual Step Navigation (Advanced)**

```javascript
// Direct step navigation
const { actions } = useOnboarding();

// Go to specific step
actions.setStep(1); // Goes to Step 2 (index 1)

// Go to next step
actions.setStep(state.currentStep + 1);

// Go to previous step
actions.setStep(state.currentStep - 1);
```

### **3. Step Validation**

```javascript
// Validation happens automatically in completeCurrentStep()
const validateCurrentStep = useCallback(
  stepId => {
    const stepData = getStepData(stepId, state.data);
    const validationResult = validateStep(stepId, stepData);

    actions.setErrors(validationResult.errors);
    actions.setWarnings(validationResult.warnings);

    return validationResult.isValid;
  },
  [state.data, actions]
);
```

## ✅ How to Finalize Steps

### **1. Step Completion Pattern**

```javascript
const handleContinue = async () => {
  if (!isValid) {
    setStepError('Please complete all required fields');
    return;
  }

  setIsLoading(true);
  setStepError(null);

  try {
    // 1. Update local state
    const updatedData = { ...state.data, step1: stepData };
    actions.updateData({ step1: stepData });

    // 2. Save to database
    await saveOnboardingProgress(updatedData);

    // 3. Complete step and advance
    await actions.completeCurrentStep();
  } catch (error) {
    setStepError(error.message || 'Failed to save. Please try again.');
  } finally {
    setIsLoading(false);
  }
};
```

### **2. Using OnboardingStepWrapper**

```javascript
return (
  <OnboardingStepWrapper
    stepId='step1'
    isLoading={isLoading}
    error={stepError}
    isValid={isValid}
    onRetry={() => {
      setStepError(null);
      setIsLoading(false);
    }}
    onContinue={handleContinue}
  >
    {/* Your step content */}
  </OnboardingStepWrapper>
);
```

### **3. Step Data Structure**

```javascript
// Step data is stored in state.data with step-specific keys
const stepData = {
  step1: {
    accountType: 'Club',
    association: 'Cricket NSW',
    club: 'Sydney Cricket Club',
    isRightsHolder: true,
    isPermissionGiven: true,
  },
  step2: {
    logo: 'logo-url',
    logoUrl: 'https://example.com/logo.png',
    logoUploaded: true,
  },
  step3: {
    themeSelected: true,
    themeId: 7,
    themeName: 'Classic Blue',
    customTheme: false,
    primaryColor: '#FF0000',
    secondaryColor: '#00FF00',
  },
  // ... more steps
};
```

## 🗄️ Data Flow & Account ID Management

### **Critical: Account ID is the Foundation**

The **Account ID** is the most important piece of data in the onboarding system. It's used for:

- All database operations (saving form data)
- API calls to the CMS
- Data retrieval and updates
- Form component configuration

### **Account Data Refresh Strategy**

The system uses a **dual refresh approach** to ensure account data is always current:

1. **`ReRender()`**: Triggers account context refresh
2. **`forceRefresh()`**: Clears cached data and forces fresh fetch
3. **Automatic refresh**: Called before each step completion

### **Theme Data Refresh**

For theme components, the system implements specific refresh strategies:

1. **Immediate Application**: Theme selection immediately applies to user account
2. **CMS Synchronization**: Custom themes are saved to CMS and linked to user
3. **Context Refresh**: `forceRefresh()` ensures account context reflects new theme data
4. **UI Updates**: Components re-render to show updated theme information

### **How to Access Account Information from Any Component**

#### **1. Account ID Access**

```javascript
import { useAccountId } from '../../../Hooks/useOnboarding';

const MyComponent = () => {
  const accountId = useAccountId(); // Returns "356" or null

  // Always check if accountId exists before using
  if (!accountId) {
    return <div>Account not ready</div>;
  }

  return <div>Account ID: {accountId}</div>;
};
```

#### **2. Full Account Data Access**

```javascript
import { useAccountDetails } from '../../../context/userContext';

const MyComponent = () => {
  const { account, ReRender, forceRefresh } = useAccountDetails();

  // Access account data
  const accountType = account?.attributes?.account_type?.data?.attributes?.Name;
  const associations = account?.attributes?.associations?.data;
  const clubs = account?.attributes?.clubs?.data;
  const theme = account?.attributes?.theme?.data;

  // Force refresh account data (clears cache and fetches fresh)
  const refreshAccount = () => forceRefresh();

  // Trigger account context refresh
  const triggerReRender = () => ReRender();

  return <div>Account Type: {accountType}</div>;
};
```

#### **3. User Status & Account Readiness**

```javascript
import { useUserStatus } from '../../../Hooks/useOnboarding';

const MyComponent = () => {
  const userStatus = useUserStatus();

  // Check account status
  const hasAccount = userStatus.hasAccount;
  const accountId = userStatus.accountId;
  const accountExists = userStatus.accountExists;
  const canSaveToCMS = userStatus.canSaveToCMS();

  return (
    <div>
      <p>Has Account: {hasAccount ? 'Yes' : 'No'}</p>
      <p>Account ID: {accountId || 'None'}</p>
      <p>Can Save: {canSaveToCMS ? 'Yes' : 'No'}</p>
    </div>
  );
};
```

## 🛠️ Usage Examples

### **Creating a New Step**

```javascript
// 1. Create the step component
const Step4ContactInfo = () => {
  const { state, actions } = useOnboarding();
  const [stepData, setStepData] = useState({
    email: '',
    phone: '',
    address: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [stepError, setStepError] = useState(null);
  const [isValid, setIsValid] = useState(false);

  const handleContinue = async () => {
    if (!isValid) {
      setStepError('Please complete all required fields');
      return;
    }

    setIsLoading(true);
    setStepError(null);

    try {
      const updatedData = { ...state.data, step4: stepData };
      actions.updateData({ step4: stepData });
      await saveOnboardingProgress(updatedData);
      await actions.completeCurrentStep();
    } catch (error) {
      setStepError(error.message || 'Failed to save. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const retry = () => {
    setStepError(null);
    setIsLoading(false);
  };

  return (
    <OnboardingStepWrapper
      stepId='step4'
      isLoading={isLoading}
      error={stepError}
      isValid={isValid}
      onRetry={retry}
      onContinue={handleContinue}
    >
      {/* Your step content */}
    </OnboardingStepWrapper>
  );
};

// 2. Add to step mapping
const stepComponents = {
  step1: Step1Organization,
  step2: Step2OrganisationLogo,
  step3: Step3Theme,
  step4: Step4ContactInfo,
};
```

### **In Form Components**

```javascript
const MyFormComponent = () => {
  const accountId = useAccountId();
  const canSaveToCMS = useCanSaveToCMS();

  return (
    <SelectFixturaSetting
      COLLECTIONID={accountId}
      // ... other props
    />
  );
};
```

### **In API Calls**

```javascript
const MyAPIComponent = () => {
  const accountId = useAccountId();

  const saveData = async () => {
    if (!accountId) return;

    await fetcher(`/accounts/${accountId}`, {
      method: 'PUT',
      body: JSON.stringify({ data: formData }),
    });
  };
};
```

### **Theme Component Integration**

```javascript
// Using SelectATheme in onboarding
const Step3Theme = () => {
  const { actions } = useOnboarding();

  const handleThemeSelect = selectedTheme => {
    // Theme is automatically applied to account
    // Update step data
    actions.updateData({
      step3: {
        themeSelected: true,
        themeId: selectedTheme.id,
        themeName: selectedTheme.attributes.Name,
        customTheme: !selectedTheme.attributes.isPublic,
      },
    });
  };

  return <SelectATheme onThemeSelect={handleThemeSelect} isOnboarding={true} />;
};
```

## 🎯 Best Practices

1. **Always use `useOnboarding()`** from the provider for state management
2. **Use `actions.completeCurrentStep()`** for step progression
3. **Always check `accountId`** before database operations
4. **Use `OnboardingStepWrapper`** for consistent step behavior
5. **Implement proper error handling** with user-friendly messages
6. **Add loading states** for better UX
7. **Validate data before saving** to prevent errors
8. **Use step-specific data keys** in state.data
9. **Handle retry scenarios** gracefully
10. **Keep step components focused** on their specific functionality
11. **Use `forceRefresh()`** when account data needs to be updated
12. **Avoid excessive console logging** - only log critical errors
13. **For theme components**: Use `forceRefresh()` after theme operations to ensure UI updates
14. **For color pickers**: Provide fallback values and proper type checking
15. **For custom themes**: Validate color objects before API calls

## 🔧 Error Handling Strategy

### **Error Types & Handling**

1. **Network Errors**: Retry with exponential backoff
2. **Validation Errors**: Show field-specific messages
3. **Account Errors**: Redirect to initial setup
4. **Database Errors**: Show user-friendly messages with retry options
5. **Theme Errors**: Handle color picker initialization and API failures gracefully

### **Error Recovery**

- **Automatic**: Retry failed operations
- **Manual**: User-initiated retry buttons
- **Graceful Degradation**: Fallback to basic functionality

## 🔧 Troubleshooting

### **Navigation Issues**

- Ensure `actions.completeCurrentStep()` is called
- Check that validation passes before step completion
- Verify state updates are reflected in UI

### **Data Not Saving**

- Confirm `accountId` is available via `useAccountId()`
- Check `canSaveToCMS()` returns true
- Verify API endpoints are correct

### **Form Not Pre-filling**

- Ensure account data is loaded via `useUserStatus()`
- Check database fields match expected structure
- Verify `SelectedBaseValueObject` props are passed correctly

### **Account Data Not Updating**

- Use `forceRefresh()` to clear cached data and fetch fresh
- Check that `LinkedAccount` cookie is set correctly
- Verify account creation completed successfully

### **Theme Issues**

- **Color pickers not showing current colors**: Check `UseBaseColor` function and color initialization
- **Theme not applying**: Verify `forceRefresh()` is called after theme operations
- **Custom theme not saving**: Check CMS permissions and theme object structure
- **UI not re-rendering**: Ensure `forceRefresh()` is called in theme completion handlers

## 🚀 Making Code Reusable

### **Component Patterns**

1. **Wrapper Components**: `OnboardingStepWrapper` provides consistent behavior
2. **Provider Pattern**: `OnboardingProvider` manages global state
3. **Step Mapping**: Dynamic component loading based on current step
4. **Validation Schemas**: Reusable validation rules
5. **Theme Components**: Reusable theme selection and creation interfaces

### **Extension Points**

1. **Add New Steps**: Update `stepComponents` mapping
2. **Custom Validation**: Add validation schemas to `utils/validation.js`
3. **Custom UI**: Override wrapper components as needed
4. **Custom Hooks**: Extend existing hooks or create new ones
5. **Custom Themes**: Extend theme system with additional color schemes

### **Testing Strategy**

1. **Unit Tests**: Test individual components and hooks
2. **Integration Tests**: Test step flows and navigation
3. **Error Scenarios**: Test error handling and recovery
4. **User Flows**: Test complete onboarding journeys
5. **Theme Testing**: Test color picker functionality and theme application

## 📝 Recent Updates

### **Theme Component Improvements (Latest)**

- **Enhanced Documentation**: Comprehensive JSDoc for all theme components
- **Improved Error Handling**: Better validation and error recovery for color pickers
- **Code Cleanup**: Removed debug logs and improved code organization
- **Type Safety**: Better type checking for color objects and API calls
- **UI Consistency**: Standardized loading states and user feedback
- **Responsive Design**: Improved mobile and desktop experience
- **Data Synchronization**: Better account context refresh after theme operations

### **Key Fixes Implemented**

1. **Color Picker Initialization**: Fixed issue where color pickers weren't showing current theme colors
2. **Theme Re-rendering**: Resolved issue where UI wasn't updating after theme changes
3. **Account Context Refresh**: Improved `forceRefresh()` implementation for better data synchronization
4. **Loading States**: Enhanced loading indicators and user feedback
5. **Error Recovery**: Better error handling and retry mechanisms

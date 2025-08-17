import React from 'react';
import styles from './Containers.module.scss';

export const Container = React.forwardRef(
  ({ children, className = '', ...props }, ref) => (
    <div className={`${styles.container} ${className}`} ref={ref} {...props}>
      {children}
    </div>
  )
);

Container.displayName = 'Container';

export const GradientContainer = React.forwardRef(
  ({ children, className = '', ...props }, ref) => (
    <div
      className={`${styles.gradientContainer} ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
);

GradientContainer.displayName = 'GradientContainer';

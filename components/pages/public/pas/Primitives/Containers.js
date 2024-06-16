import React from 'react';
import styles from './Containers.module.scss';

export const Container = ({ children, className = '', ...props }) => (
  <div className={`${styles.container} ${className}`} {...props}>
    {children}
  </div>
);

export const GradientContainer = ({ children, className = '', ...props }) => (
  <div className={`${styles.gradientContainer} ${className}`} {...props}>
    {children}
  </div>
);

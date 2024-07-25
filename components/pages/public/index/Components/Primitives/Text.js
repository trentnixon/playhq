import React from 'react';
import styles from './Text.module.scss';

export const P = ({ children, className = '', ...props }) => (
  <p className={`${styles.p} ${className}`} {...props}>
    {children}
  </p>
);

export const H1 = ({ children, className = '', ...props }) => (
  <h1 className={`${styles.h1} ${className}`} {...props}>
    {children}
  </h1>
);

export const H2 = ({ children, className = '', ...props }) => (
  <h2 className={`${styles.h2} ${className}`} {...props}>
    {children} 
  </h2>
);

export const Span = ({ children, className = '', ...props }) => (
  <span className={`${styles.span} ${className}`} {...props}>
    {children}
  </span>
);

export const HighlightSpan = ({ children, className = '', ...props }) => (
  <span className={`${styles.highlightSpan} ${className}`} {...props}>
    {children}
  </span>
);

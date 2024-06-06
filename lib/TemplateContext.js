import React, { createContext, useContext, useState } from 'react';

// Create a context
const TemplateContext = createContext();

// Create a provider component
export const TemplateProvider = ({ children }) => {
  const [template, setTemplate] = useState(null);

  return (
    <TemplateContext.Provider value={{ template, setTemplate }}>
      {children}
    </TemplateContext.Provider>
  );
};

// Create a hook to use the Template context
export const useTemplate = () => {
  return useContext(TemplateContext);
};

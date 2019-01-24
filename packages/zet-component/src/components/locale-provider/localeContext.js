import React from 'react';

const defaultValue = {
  locale: {
    disabled: false,
  }
}

export const ResourceContext = React.createContext(defaultValue);

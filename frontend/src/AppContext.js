import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [asset, setAsset] = useState("BTC");

  return (
    <AppContext.Provider value={{ asset, setAsset }}>
      {children}
    </AppContext.Provider>
  );
};


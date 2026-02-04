'use client';

import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [flightSearchData, setFlightSearchData] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);

  return (
    <GlobalContext.Provider value={{ 
      flightSearchData, 
      setFlightSearchData, 
      selectedFlight, 
      setSelectedFlight 
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};

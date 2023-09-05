import React, { createContext, useState, useContext } from 'react';

const TrainerContext = createContext();

export const TrainerProvider = ({ children }) => {
  const [trainer, setTrainer] = useState(null);

  return (
    <TrainerContext.Provider value={{ trainer, setTrainer }}>
      {children}
    </TrainerContext.Provider>
  );
}

export const useTrainer = () => {
    const context = useContext(TrainerContext);
    if (context === undefined) {
      throw new Error('useTrainer must be used within a TrainerProvider'); 
    }
    return context;
  }
  

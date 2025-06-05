import React, { createContext, SetStateAction, useContext, useState } from 'react';

export type ExplorerOpenContextType = {
  explorerOpen: boolean;
  setExplorerOpen: React.Dispatch<SetStateAction<boolean>>;
};

const ExplorerOpenContext = createContext<ExplorerOpenContextType | undefined>(undefined);

export const ExplorerOpenProvider = ({ children }: { children: React.ReactNode }) => {
  const [explorerOpen, setExplorerOpen] = useState<boolean>(true);

  return (
    <ExplorerOpenContext.Provider value={{ explorerOpen, setExplorerOpen }}>
      {children}
    </ExplorerOpenContext.Provider>
  );
};

export const useExplorerOpen = () => {
  const context = useContext(ExplorerOpenContext);
  if (!context) {
    throw new Error('getExplorerOpen must be used within a ExplorerOpenProvider');
  }
  return context;
};

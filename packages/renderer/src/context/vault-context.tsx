import React, { createContext, SetStateAction, useContext, useMemo } from 'react';
import { Vault } from '../lib/vault';

const VaultContext = createContext<Vault | null>(null);

export const VaultProvider = ({ children }: { children: React.ReactNode }) => {
  const vault = useMemo(() => new Vault(), []);

  return <VaultContext.Provider value={vault}>{children}</VaultContext.Provider>;
};

export const useVault = () => {
  const context = useContext(VaultContext);
  if (!context) {
    throw new Error('useVault must be used within a VaultProvider');
  }
  return context;
};

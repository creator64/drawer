import React, { createContext, SetStateAction, useContext, useState } from 'react';

type DrawingPathContextType = {
  drawingPath?: string;
  setDrawingPath: React.Dispatch<SetStateAction<string | undefined>>;
};

const DrawingPathContext = createContext<DrawingPathContextType | undefined>(undefined);

export const DrawingPathProvider = ({ children }: { children: React.ReactNode }) => {
  const [drawingPath, setDrawingPath] = useState<string>();

  return (
    <DrawingPathContext.Provider value={{ drawingPath, setDrawingPath }}>
      {children}
    </DrawingPathContext.Provider>
  );
};

export const useDrawingPath = () => {
  const context = useContext(DrawingPathContext);
  if (!context) {
    throw new Error('getDrawingPath must be used within a DrawingPathProvider');
  }
  return context;
};

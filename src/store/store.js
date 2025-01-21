import React, { createContext, useContext, useState } from "react";
import { workspaceData } from "../utils/defaultData";

const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [workspace, setWorkspace] = useState(workspaceData);

  const handleWorkspace = (workspace) => {
    setWorkspace(workspace);
  };

  return (
    <AppContext.Provider value={{ workspace, handleWorkspace }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = () => {
  return useContext(AppContext);
};

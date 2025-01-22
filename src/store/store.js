import React, { createContext, useContext, useState } from "react";
import { workspaceData } from "../utils/defaultData";

export const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [workspace, setWorkspace] = useState(workspaceData);
  const [eventCallbackData, setEventCallbackData] = useState('');

  const handleWorkspace = (workspace) => {
    setWorkspace(workspace);
  };
  
  const eventSource = new EventSource('http://localhost:9091/events');
  eventSource.onopen = function () {
                console.log('SSE connection established!');
            };
  eventSource.onclose = function () {
                console.log('SSE connection cancelled!');
            };
             // Listen for incoming messages (events) from the server
  eventSource.onmessage = function (event) {
            console.log('Received event:', event.data);
            // Append the event data to the DOM or handle it as needed
            try {
              const parsedData = JSON.parse(event.data);
              console.log('Parsed event data:', parsedData);
              setEventCallbackData(JSON.stringify(parsedData)); // Use parsed data
    } catch (error) {
        console.error('Error parsing event data:', error);
    }
        };

        // Handle any errors that occur with the SSE connection
        eventSource.onerror = function (error) {
            console.error('Error with SSE:', error);
        };

  return (
    <AppContext.Provider value={{ workspace, handleWorkspace, eventCallbackData }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = () => {
  return useContext(AppContext);
};

import Workspace from "./components/workspace/Workspace";
import { AppProvider } from "./store/store";
import "./App.css";
import { createContext, useActionState, useState } from "react";
function App() {
  return (
    <AppProvider >
      <div className="App">
        <header className="App-header">
          <h1>Task Router App</h1>
        </header>
        <Workspace />
      </div>
    </AppProvider>
  );
}

export default App;

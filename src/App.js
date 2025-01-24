import Workspace from "./components/workspace/Workspace";
import { AppProvider } from "./store/store";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AppProvider>
      <ToastContainer />
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

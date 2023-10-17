import { createContext, useState } from "react";
import "./App.css";
import Pages from "./Pages/Pages/Pages";

export const AppContext = createContext();
function App() {
  const [csvData, setCSVData] = useState([]);
  const [file, setFile] = useState(null);
  return (
    <div className="App app-os">
      <AppContext.Provider value={{csvData, setCSVData, file, setFile}}>
        <Pages />
      </AppContext.Provider>
    </div>
  );
}

export default App;

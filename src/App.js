import { createContext, useState } from "react";
import "./App.css";
import Pages from "./Pages/Pages/Pages";
import { useEffect } from "react";

export const AppContext = createContext();
function App() {
  const [csvData, setCSVData] = useState([]);
  const [file, setFile] = useState(null);
  const [token, setToken] = useState("");

  // const localStorageToken = localStorage.getItem("token");
  // console.log("localStorageToken", localStorageToken)
  // useEffect(() => {
  //   setToken(localStorageToken);    
  // }, []);
  return (
    <div className="App app-os">
      <AppContext.Provider value={{ csvData, setCSVData, file, setFile, token, setToken }}>
        <Pages />
      </AppContext.Provider>
    </div>
  );
}

export default App;

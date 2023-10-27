import { createContext, useState } from "react";
import "./App.css";
import Pages from "./Pages/Pages/Pages";
import { useEffect } from "react";

export const AppContext = createContext();
function App() {
  const [csvData, setCSVData] = useState([]);
  const [file, setFile] = useState(null);
  const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");

  const localStorageToken = localStorage.getItem("token");
  // console.log("localStorageToken", localStorageToken);
  const localStorageUserName = localStorage.getItem("username");
  // console.log("localStorageUserName", localStorageUserName);
  useEffect(() => {
    setUserName(localStorageUserName);
    setToken(localStorageToken);
  }, []);
  return (
    <div className="App app-os">
      <AppContext.Provider
        value={{
          csvData,
          setCSVData,
          file,
          setFile,
          token,
          setToken,
          userName,
          setUserName,
        }}
      >
        <Pages />
      </AppContext.Provider>
    </div>
  );
}

export default App;

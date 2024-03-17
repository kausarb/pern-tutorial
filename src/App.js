import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import "./App.css";
import styled from "styled-components";
import { AuthProvider } from "./contexts/AuthContext";
import { useState } from "react";

function App() {
  const [token, setToken] = useState("");

  console.log("token", token);

  return (
    <>
      <AuthProvider>
        <Router>
          <AppContainer>
            <Routes>
              <Route
                path="/"
                element={
                  token ? (
                    <Navigate to="/dashboard" />
                  ) : (
                    <Home setToken={setToken} />
                  )
                }
              />
              <Route
                path="/dashboard"
                element={
                  token ? (
                    <Dashboard setToken={setToken} />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
            </Routes>
          </AppContainer>
        </Router>
      </AuthProvider>
    </>
  );
}

const AppContainer = styled.div`
  background: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  );
  height: 100vh;
  margin: 0;
  padding: 0;
  padding-left: 5px;
  padding-right: 5px;
`;

export default App;

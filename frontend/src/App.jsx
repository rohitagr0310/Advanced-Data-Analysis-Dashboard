import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/dashboard/home';
import Login from './components/authentication/login';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')


  // Function to check if the user is logged in
  const isAuthenticated = () => {
    return loggedIn;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated() ? (
                <Home
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  firstName={firstName}
                  lastName={lastName}
                  username={username}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/login"
            element={<Login
              setLoggedIn={setLoggedIn}
              setFirstName={setFirstName}
              setLastName={setLastName}
              setUsername={setUsername}
            />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

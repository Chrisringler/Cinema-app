import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import NavBar from './components/navBar/NavBar';
import UploadCSV from './components/ListPost/UploadCSV';
import DetallePelicula from './components/detalles/DetallePelicula';
import FormCreateMovie from './components/formCreateMovie/FormCreateMovie';
import Login from './components/login/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
  }

  return (
    <div className="App">
   <NavBar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <Routes>
        {isAuthenticated ? (
          <>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/lista" element={<UploadCSV />} />
            <Route exact path="/movies/:id" element={<DetallePelicula />} />
            <Route exact path="/create" element={<FormCreateMovie />} />
          </>
        ) : (
          <Route path="/*" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        )}
      </Routes>
    </div>
  );
}

export default App;

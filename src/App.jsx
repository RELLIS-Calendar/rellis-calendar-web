import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./pages/Home";
import Currentrsvp from "./pages/Currentrsvp";
import Settings from "./pages/Settings";
import Eventhosting from "./pages/Eventhosting";
import Calendar from "./pages/Calendar";
import Profile from "./pages/Profile";
import './App.css'


function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />

        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Currentrsvp" element={<Currentrsvp />} />
            <Route path="/Settings" element={<Settings />} />
            <Route path="/Eventhosting" element={<Eventhosting />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Calendar" element={<Calendar />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;

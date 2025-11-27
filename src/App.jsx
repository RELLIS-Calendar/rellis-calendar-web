import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Currentrsvp from "./pages/Currentrsvp/Currentrsvp";
import Settings from "./pages/Settings/Settings";
import Eventhosting from "./pages/Eventhosting/Eventhosting";
import Calendar from "./pages/Calendar/Calendar";
import Profile from "./pages/Profile/Profile";
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

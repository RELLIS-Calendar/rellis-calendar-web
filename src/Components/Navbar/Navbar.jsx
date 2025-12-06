import logo from '../../assets/logo.png';
import settings from '../../assets/settings.png';
import group from '../../assets/group.png';
import star from '../../assets/star.png';
import profile from '../../assets/profile.png';
import calendar from '../../assets/calendar.png';
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="nav">
      
      <a href="/" className="nav-logo">
      <img src={logo} alt="Logo" className="nav-icon" />
      </a>

      
      <div className="nav-links">
        <a href="/Calendar"><img src={calendar} alt="calendar" className="nav-icon" /></a>
        {/* <a href="/Currentrsvp"><img src={star} alt="star" className="nav-icon" /></a>
        <a href="/Eventhosting"><img src={group} alt="group" className="nav-icon" /></a>
        <a href="/Profile"><img src={profile} alt="profile" className="nav-icon" /></a> */}
        {/* <a href="/settings"><img src={settings} alt="settings" className="nav-icon" /></a> */}

      </div>
    </nav>
  );
}

export default Navbar;
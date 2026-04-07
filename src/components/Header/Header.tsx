import { Link } from "@tanstack/react-router";

import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-item">
          <Link to="/">Home</Link>
        </div>
        <div className="nav-item">
          <Link to="/login">Login</Link>
        </div>
        <div className="nav-item">
          <Link to="/signup">Sign Up</Link>
        </div>
        <div className="nav-item">
          <Link to="/feed">Feed</Link>
        </div>
      </nav>
    </header>
  );
}

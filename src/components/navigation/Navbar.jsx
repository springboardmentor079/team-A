import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Users } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="lp-nav">
        {/* Brand */}
        <div className="brand">
          <div className="logo-box">
            <Users size={22} />
          </div>
          CivicX
        </div>

        {/* Desktop links */}
        <div className="nav-links desktop">
          <Link to="/" className="outline">Home</Link>
          <Link to="/login" className="outline">Sign In</Link>
        </div>

        {/* Hamburger */}
        <button className="hamburger" onClick={() => setOpen(!open)}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${open ? "show" : ""}`}>
        <Link to="/" className="outline" onClick={() => setOpen(false)}>
          Home
        </Link>
        <Link to="/login" className="outline" onClick={() => setOpen(false)}>
          Sign In
        </Link>
      </div>
    </>
  );
}

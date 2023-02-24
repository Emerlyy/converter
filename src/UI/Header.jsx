import React from "react";
import { Link } from "react-router-dom";
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <Link to='/' className="logo">Currency converter</Link>
      <nav>
        <ul className="header-list">
          <li><Link to='/'>Converter</Link></li>
          <li><Link to='/table'>Table</Link></li>
        </ul>
      </nav>
    </header >
  );
}

export default Header;
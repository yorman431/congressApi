import React from 'react';
import './Header.scss';
import {Link} from 'react-router-dom';

function Header() {
  return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
      <Link className="navbar-brand" to="#">ProPublica</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#congresNav"
              aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="congresNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to={'/'}>Home</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;

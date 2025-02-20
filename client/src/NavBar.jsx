import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import React from "react";
export const Navbar = () => {
    return (
        <div className='Navbar'>
        <nav>
            <ul className='navbar-menu'>
            <li>
            <Link to='/'>Home</Link>
            </li>
            <li>
            <Link to="/customers">Customer</Link>
            </li>
            </ul>
        </nav>
        </div>
    );
};

export default Navbar;
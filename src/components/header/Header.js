import React from 'react';
import './Header.scss'
import {Link, NavLink} from "react-router-dom";
const Header = ({props}) => {
    return (
        <header className="header">
            <h1 className="header__title">
                <Link to="/">
                    <span>ДОБРИЙ</span> ПОРТАЛ
                </Link>
            </h1>
            <nav className="header__menu">
                <ul>
                    <li><NavLink className={(navData)=>
                                     (navData.isActive ? 'active' : '') }
                                 to="/">Головна</NavLink></li>
                    <li><NavLink className={(navData)=>
                        (navData.isActive ? 'active' : '') }  to="/login">Логін</NavLink></li>
                    <li><NavLink className={(navData)=>
                        (navData.isActive ? 'active' : '') }  to="/register">Реєстрація</NavLink></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;

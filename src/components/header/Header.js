import React from 'react';
import './Header.scss'
import {Link, NavLink} from "react-router-dom";
import {motion} from "framer-motion";
const containerVariants = {
    hidden:{
        opacity:0,
        color:"#000",
        scale:1,
        y:0
    },
    onHover:{
      color:"#365D98FF",
        scale:1.1,
        y:-5
    },
    visible:{
        opacity: 1,
        transition:{
            duration:0.5
        }
    }
}
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
                    <motion.li
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="onHover"
                    ><NavLink className={(navData)=>
                                     (navData.isActive ? 'active' : '') }
                                 to="/">Головна</NavLink></motion.li>
                    /
                    <motion.li
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="onHover"
                    ><NavLink className={(navData)=>
                        (navData.isActive ? 'active' : '') }  to="/login">Логін</NavLink></motion.li>
                    /
                    <motion.li
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="onHover"
                    ><NavLink className={(navData)=>
                        (navData.isActive ? 'active' : '') }  to="/register">Реєстрація</NavLink></motion.li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;

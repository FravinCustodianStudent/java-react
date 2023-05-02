import React, {useContext, useEffect} from 'react';
import './Header.scss'
import {Link, NavLink, useNavigate} from "react-router-dom";
import {AnimatePresence, motion} from "framer-motion";
import {UserContext} from "../app/App";
import useTaskService from "../../services/useTaskService";
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
const Header = () => {
    const navigate = useNavigate();
    const { user,setUser } = useContext(UserContext);
    const {getUserByToken,logout} = useTaskService();
    useEffect(() => {
        if (user == null){
            const token = localStorage.getItem('token');
            if (token){
                getUserByToken()
                    .then(res=>{
                        setUser(res.data);
                    })
            }
        }
    }, [user]);
    const onButtonPressed = () =>{
        logout();
        navigate('/login');
        setUser(null)

    }
    return (
        <header className="header">
            <h1 className="header__title">
                <Link to="/">
                    <span>ДОБРИЙ</span> ПОРТАЛ
                </Link>

            </h1>
            <nav className="header__menu">
                <AnimatePresence>
                    {user === null ? <motion.ul
                        initial={{opacity:0}}
                        animate={{opacity:1}}
                        transition={{duration:0.3}}
                        exit={{opacity:0}}
                    >

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
                </motion.ul> : <motion.ul
                        initial={{opacity:0}}
                        animate={{opacity:1}}
                        transition={{duration:0.3}}
                        exit={{opacity:0}}
                    >

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
                        (navData.isActive ? 'active' : '') }  to="/user">Аккаунт</NavLink></motion.li>
                    /
                    <motion.li
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="onHover"
                    ><a onClick={()=>{
                        onButtonPressed()
                    }}>Вихід</a></motion.li>
                </motion.ul>}
                </AnimatePresence>

            </nav>
        </header>
    );
};

export default Header;

import React, {useContext, useEffect, useState} from 'react';
import * as Yup from 'yup';
import {useFormik} from "formik";
import "./login.scss";
import {Button, TextField} from "@mui/material";
import {useHttp} from "../../../hooks/http.hook";
import Spinner from "../../spinners/Spiners";
import {AnimatePresence, motion} from "framer-motion";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../../app/App";


const validationSchema=Yup.object({
    username: Yup.string()
        .required("обов'язкове поле для заповнення"),
    password: Yup.string()
        .required("обов'язкове поле для заповнення")
})
const Login = ({props}) => {
    const {GETAuthentication,process,setProcess} = useHttp();
    const [errorMessage,setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const setAuthentification = (user,token) =>{
        setUser(user);
        localStorage.setItem('token',token);
    }
    useEffect(()=>{
       setProcess("confirmed");
    },[]);
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit:  (values) => {
            setErrorMessage(null);
            GETAuthentication(values)
                .then((res)=> setAuthentification(res.data['user'],res.data['token']))
                .then(setProcess("confirmed"))
                .then(navigate('/'))
                .catch(err=>{
                    console.log(err)
                    setProcess("confirmed")
                    setErrorMessage(err.response.data.description)
            });
        },
    });
    return (
        <motion.div className="form"
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:0.3}}
        >
            <form onSubmit={formik.handleSubmit}>
                <h2>Аутентифікація</h2>
                <TextField
                    className="form-input"
                    fullWidth
                    id="username"
                    name="username"
                    label="Логін"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                />
                <TextField
                    fullWidth
                    className="form-input"
                    id="password"
                    name="password"
                    label="Пароль"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                {errorMessage}
                <Button disabled={ process === "waiting"? true : false}
                        color="primary" variant="contained" fullWidth type="submit">
                    Зайти
                </Button>
                <AnimatePresence>
                    {process === "loading" ? <Spinner/> : null}
                </AnimatePresence>
            </form>
        </motion.div>
    );
};


export default Login;

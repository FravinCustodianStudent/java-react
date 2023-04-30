import React, {useEffect, useState} from 'react';
import * as Yup from 'yup';
import {useFormik} from "formik";
import "./login.scss";
import {Button, TextField} from "@mui/material";
import {useHttp} from "../../../hooks/http.hook";
import Spinner from "../../spinners/Spiners";
import {motion} from "framer-motion";
import {useNavigate} from "react-router-dom";


const validationSchema=Yup.object({
    login: Yup.string()
        .required("обов'язкове поле для заповнення"),
    password: Yup.string()
        .required("обов'язкове поле для заповнення")
})
const Login = ({props}) => {
    const {GETAuthentication,process,setProcess} = useHttp();
    const [errorMessage,setErrorMessage] = useState(null);
    const navigate = useNavigate();
    useEffect(()=>{
       setProcess("confirmed");
    },[]);
    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const json = JSON.stringify(values, null, 2);
            setErrorMessage(null);
            GETAuthentication(json)
                .then(res=>{
                    console.log(process)
                    localStorage.setItem('token',res.data)
                    setProcess("confirmed")
                    console.log(process)
                    navigate('/');
                })
                .catch(err=>{
                    console.log(err)
                    setErrorMessage(err.message)
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
                    id="login"
                    name="login"
                    label="Логін"
                    value={formik.values.login}
                    onChange={formik.handleChange}
                    error={formik.touched.login && Boolean(formik.errors.login)}
                    helperText={formik.touched.login && formik.errors.login}
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
                {process === "loading" ? <Spinner/> : null}
            </form>
        </motion.div>
    );
};


export default Login;

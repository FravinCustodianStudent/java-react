import React, {useEffect, useState} from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";

import {Button, TextField} from "@mui/material";
import {motion} from "framer-motion";
import Spinner from "../../spinners/Spiners";
import {useNavigate} from "react-router-dom";
import {useHttp} from "../../../hooks/http.hook";
const validationSchema=Yup.object({
    username: Yup.string()
        .required("обов'язкове поле для заповнення"),
    password: Yup.string()
        .required("обов'язкове поле для заповнення"),
    email: Yup.string()
        .required("обов'язкове поле для заповнення")
        .email("неправильний формат пошти")
})
const Register = ({props}) => {
    const {GETAuthentication,process,setProcess} = useHttp();
    const [errorMessage,setErrorMessage] = useState(null);
    const navigate = useNavigate();
    useEffect(()=>{
        setProcess("confirmed");
    },[]);

    const formik = useFormik({
        initialValues:{
            email:'',
            username:'',
            password:''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const json = JSON.stringify(values, null, 2);
            setErrorMessage(null);
            //refactor to registration
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
                <h2>Реєстрація</h2>
                <TextField
                    className="form-input"
                    fullWidth
                    id="username"
                    name="username"
                    label="Логін"
                    value={formik.values.login}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                />

                <TextField
                    className="form-input"
                    fullWidth
                    id="email"
                    name="email"
                    label="Пошта"
                    value={formik.values.login}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
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
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Зареєструватися
                </Button>
                {process === "loading" ? <Spinner/> : null}
            </form>
        </motion.div>
    );
};

export default Register;

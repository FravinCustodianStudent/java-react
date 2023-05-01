import React, {useEffect, useState} from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";

import {Button, TextField} from "@mui/material";
import {AnimatePresence, motion} from "framer-motion";
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
const Register = () => {
    const {CreateUser,process,setProcess} = useHttp();
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
            setErrorMessage(null);
            //refactor to registration
            CreateUser(values)
                .then(res=>{
                    setProcess("confirmed");
                    navigate('/login');

                })
                .catch(err=>{
                    setProcess("confirmed");
                    console.log(err)
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
                <AnimatePresence>
                    {process === "loading" ? <Spinner/> : null}
                </AnimatePresence>

            </form>
        </motion.div>
    );
};

export default Register;

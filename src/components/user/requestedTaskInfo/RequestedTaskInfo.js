import {useFormik} from "formik";
import * as Yup from "yup";
import {Button, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import React from "react";
import "./RequestedTaskInfo.scss";

const validationSchema=Yup.object({
    username: Yup.string()
        .required("обов'язкове поле для заповнення"),
    description: Yup.string()
        .required("обов'язкове поле для заповнення"),
    tags: Yup.string().required("Обов'язково виберите тег")
})

const RequestedTaskInfo = () =>{
    const formik = useFormik({
        initialValues: {
            username: '',
            description: '',
            tags:''
        },
        validationSchema: validationSchema,
        onSubmit:  (values) => {
            console.log(values)
        },
    });
    return (
        <div className="task__creation">
            <div className="task__creation__selectline"></div>
            <form onSubmit={formik.handleSubmit}
            >
                <TextField
                    className="form-input"
                    fullWidth
                    id="username"
                    name="username"
                    label="Назва завдання"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                />
                <TextField
                    className="form-input"
                    fullWidth
                    id="description"
                    name="description"
                    label="Опис"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                />
                <TextField
                    className="form-input"
                    fullWidth
                    id="tags"
                    name="tags"
                    label="Тег"
                    value={formik.values.tags}
                    onChange={formik.handleChange}
                    error={formik.touched.tags && Boolean(formik.errors.tags)}
                    helperText={formik.touched.tags && formik.errors.tags}
                />
                <Button
                        color="primary" variant="contained" fullWidth type="submit">
                    Створити Завдання
                </Button>
            </form>
        </div>
    )
}

export default RequestedTaskInfo;
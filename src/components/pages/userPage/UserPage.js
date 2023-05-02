import React from 'react';
import RequestedTaskList from "../../user/requestedTasksList/RequestedTaskList";
import "./UserPage.scss";
import UserTasksList from "../../user/userTasksList/UserTasksList";
import RequestedTaskInfo from "../../user/requestedTaskInfo/RequestedTaskInfo";
import UserTaskInfo from "../../user/userTaskInfo/UserTaskInfo";
import axios from "axios";

const UserPage = () => {
    const baseUrl = "http://localhost:8080";
    const og = () =>{
        axios.get(baseUrl+ '/users/1',
            {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ localStorage.getItem('token'),
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS, PUT',
                    'Access-Control-Allow-Headers': 'X-Requested-With, content-type',
                    'Access-Control-Allow-Credentials': 'true',
                }
            })
            .then((res)=>console.log(res))
            .catch(err=>console.log(err))
    }
    return (
        <div className="user__content">
            <div className="user__content__lists">
            <RequestedTaskList/>
                <UserTasksList/>
            </div>
            <div className="user__content__menu">
                <RequestedTaskInfo/>
                <UserTaskInfo/>
            </div>
        </div>
    );
};
export default UserPage;

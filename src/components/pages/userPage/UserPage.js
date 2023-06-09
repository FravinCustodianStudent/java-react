import React, {useContext, useEffect, useRef, useState} from 'react';
import RequestedTaskList from "../../user/requestedTasksList/RequestedTaskList";
import "./UserPage.scss";
import UserTasksList from "../../user/userTasksList/UserTasksList";
import RequestedTaskInfo from "../../user/requestedTaskInfo/RequestedTaskInfo";
import UserTaskInfo from "../../user/userTaskInfo/UserTaskInfo";
import axios from "axios";
import {UserContext} from "../../app/App";
import useTaskService from "../../../services/useTaskService";
import {useNavigate} from "react-router-dom";

const UserPage = () => {
    const [userTaskList, setUserTaskList] = useState([]);
    const [requiredTaskList, setRequiredTaskList] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);
    const { user,setUser } = useContext(UserContext);
    const itemRefs = useRef([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token') === null){
            navigate('/login');
        }
    });

    const OnTaskSelected = (id) =>{
        setCurrentTask(id);
    }
    return (
        <div className="user__content">
            <div className="user__content__lists">
            <RequestedTaskList TaskList={requiredTaskList} setTaskList={setRequiredTaskList}/>
                <UserTasksList TaskList={userTaskList} setTaskList={setUserTaskList} currentTask={currentTask}
                               setCurrentTask={setCurrentTask} OnTaskSelected={OnTaskSelected} itemRefs={itemRefs}/>
            </div>
            <div className="user__content__menu">
                <RequestedTaskInfo TaskList={userTaskList} setTaskList={setUserTaskList} />
                {userTaskList.length >0 && currentTask != null ?<UserTaskInfo currentTask={currentTask} setcurrentTask={setCurrentTask}
                                                                                userTaskList={userTaskList}
                                                       itemRefs={itemRefs}
                                                       setUserTaskList={setUserTaskList }/>: null}


            </div>
        </div>
    );
};
export default UserPage;

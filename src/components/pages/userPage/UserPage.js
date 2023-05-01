import React from 'react';
import RequestedTaskList from "../../user/requestedTasksList/RequestedTaskList";
import "./UserPage.scss";
import UserTasksList from "../../user/userTasksList/UserTasksList";
import RequestedTaskInfo from "../../user/requestedTaskInfo/RequestedTaskInfo";
import UserTaskInfo from "../../user/userTaskInfo/UserTaskInfo";

const UserPage = () => {
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

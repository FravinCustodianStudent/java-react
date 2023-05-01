import {useState} from "react";
import useUserTaskService from "../../../services/useUserTaskService";
import "./UserTasksList.scss";

const UserTasksList = () =>{
    const [newItemLoading, setnewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const {process,setProcess,getAllTask} = useUserTaskService();

    return(
        <div className="user__task__list">
            <h2>Твої завдання</h2>
            <div className="user__task">
                <div className="user__task__line"></div>
                <div className="user__task__content">
                        <div className="user__task__content-header">TaskName</div>
                        <div className="user__request__content-username">Кількість запитів: 4</div>
                </div>
            </div>
            <div className="user__task user__task__active">
                <div className="user__task__line"></div>
                <div className="user__task__content">
                    <div className="user__task__content-header">TaskName</div>
                    <div className="user__request__content-username">Кількість запитів: 4</div>
                </div>
            </div>
        </div>
    )
}

export default UserTasksList;
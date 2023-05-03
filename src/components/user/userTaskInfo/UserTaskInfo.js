
import "./UserTaskList.scss";
import {Button} from "@mui/material";
import useTaskService from "../../../services/useTaskService";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../app/App";
import Spinner from "../../spinners/Spiners";
const UserTaskInfo = (props) =>{
    const { addExecutor,finishTask} = useTaskService();
    const [userTaskProcess, setUserTaskProcess] = useState("confirmed");
    const { user } = useContext(UserContext);
    const itemRefs = props.itemRefs;

    useEffect(() => {
    }, [props.currentTask]);
    const onAddExecutorPressed = (taskId,id) =>{
        setUserTaskProcess("loading");
        addExecutor(taskId,id)
            .then(()=>{
                props.setcurrentTask(props.currentTask);
                setUserTaskProcess("confirmed")
            })
    }
    const OnSubmitPressed = () =>{
        finishTask(props.currentTask.id)
            .then(()=>{
                let tasks = props.userTaskList;
                tasks = tasks.filter((elem)=>{
                    return elem.id !== props.currentTask.id
                })
                itemRefs.current.forEach(item=>item.classList.remove('user__task__active'))

                props.setUserTaskList(tasks);
            })
    }
    const renderItems = (arr,onAddExecutorPressed,taskId) =>{
        const items = arr.map((item,i)=>{
            return(
                <>
                    {item.executor ? <div className="task__manage__content__list__item">
                            <div className="task__manage__content__list__item__username">{item.username}</div>
                            <div className="task__manage__content__list__item__button">
                                <Button
                                    disabled={true}
                                    variant="contained"
                                    onClick={()=>{
                                        onAddExecutorPressed(taskId,item.id);
                                    }}
                                    sx={{
                                        width:130,
                                        background:"#EBC259"
                                    }}>Підтвердити</Button>
                            </div>
                        </div> :
                        <div className="task__manage__content__list__item">
                            <div className="task__manage__content__list__item__username">{item.username}</div>
                            <div className="task__manage__content__list__item__button">
                                <Button
                                    variant="contained"
                                    onClick={()=>{
                                        onAddExecutorPressed(taskId,item.id);
                                    }}
                                    sx={{
                                        width:130,
                                        background:"#EBC259"
                                    }}>Підтвердити</Button>
                            </div>
                        </div>}
                </>

            )
        })
        return(
            <>
                {items}
            </>
        )
    }
    return (

        <div className="task__manage">
            <div className="task__manage__line"></div>
            {props.currentTask != null ?
                <>
                    <div className="task__manage__content">
                        <div className="task__manage__header">{props.currentTask.name}</div>
                        <div className="task__manage__content__list">
                            {userTaskProcess !="loading" && props.currentTask.volunteers !== null ? renderItems(
                                props.currentTask.volunteers,onAddExecutorPressed,props.currentTask.id) : <Spinner/>}
                        </div>
                    </div>
                    <div className="task__manage__button">
                        <Button disabled={userTaskProcess==="loading"} onClick={()=>{
                            OnSubmitPressed()
                        }}  variant="contained">Закрити завдання</Button>
                    </div>
                </>
                :
                <Spinner/>
            }


        </div>
    )
}

export default UserTaskInfo;
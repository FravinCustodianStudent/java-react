import {useContext, useEffect, useRef, useState} from "react";
import "./UserTasksList.scss";
import {UserContext} from "../../app/App";
import useTaskService from "../../../services/useTaskService";
import Spinner from "../../spinners/Spiners";

const UserTasksList = (props) =>{
    const { user } = useContext(UserContext);
    const {process,setProcess,getTasksCreatedByUser} = useTaskService();
    const itemRefs = props.itemRefs;
    useEffect(() => {
        if (user!= null){
            console.log(props.TaskList)
            if (props.TaskList == null || props.TaskList.length===0){
                getTasksCreatedByUser(user.id)
                    .then((res)=>{
                        props.setTaskList(res.data);
                    })
                    .catch(err=>console.log(err))
            }

        }
    });
    const focusOnItem = (id) =>{
        console.log(itemRefs.current);
        itemRefs.current = itemRefs.current.filter(item=>{
            return item != null;
        })
        itemRefs.current.forEach(item=>item.classList.remove('user__task__active'))
        itemRefs.current[id].classList.add('user__task__active');
        itemRefs.current[id].focus();
    }
    const renderItems = (arr,OnTaskSelected) =>{
        if (!Array.isArray(arr)){
            arr = [arr]
        }
        const items = arr.map((item,i)=>{

            return(
                <div className="user__task"
                     key={i}
                     tabIndex={0}
                     ref={el=>itemRefs.current[i] =el}
                     onClick={()=>{
                         OnTaskSelected(item);
                         focusOnItem(i);
                     }}
                >
                    <div className="user__task__line"></div>
                    <div className="user__task__content">
                        <div className="user__task__content-header">{item.name}</div>
                        <div className="user__request__content-username">Кількість запитів: {item.volunteers === null? 0 : item.volunteers.length}</div>
                    </div>
                </div>
                )
        })
        return(
            <>
                {items}
            </>
        )
    }
    return(
        <div className="user__task__list">
            <h2>Твої завдання</h2>
            {user != null ? renderItems(props.TaskList,props.OnTaskSelected) : <Spinner/>}
            {user != null && props.TaskList === null? "Невиконаних завдань немає" : null}
            {/*<div className="user__task user__task__active">*/}
            {/*    <div className="user__task__line"></div>*/}
            {/*    <div className="user__task__content">*/}
            {/*        <div className="user__task__content-header">TaskName</div>*/}
            {/*        <div className="user__request__content-username">Кількість запитів: 4</div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}

export default UserTasksList;
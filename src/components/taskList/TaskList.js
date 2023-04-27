import React, {useEffect, useMemo, useRef, useState} from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import Spinner from "../spinners/Spiners";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useTaskService from "../../services/useTaskService";
import SetContent from "../../utils/setContent";
import "./TaskList.scss";
const setContent = (process,Component,newItemLoading)=>{
    switch (process){
        case 'waiting':
            return <Spinner/>;
        case 'loading':
         return newItemLoading ? <Component/> : <Spinner/>;
        case 'confirmed':
            return <Component/>;
        case 'error':
           return <ErrorMessage/>;
        default:
            throw new Error('Unexpected process state');
    }
}

const TaskList = (props) => {

    const [taskList, setTaskList] = useState([]);
    const [newItemLoading, setnewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [taskEnded, setTaskEnded] = useState(false);
    const {process,setProcess,getAllTask} = useTaskService();
    const itemRefs = useRef([]);
    useEffect(() => {
        onRequest(offset,true);
    }, []);
    const onRequest = (offset,initial) =>{
        initial ? setnewItemLoading(false):setnewItemLoading(true);
        getAllTask(offset)
            .then(onCharListLoaded)
            .then(()=>setProcess('confirmed'))
    }
    const onCharListLoaded = async(newTaskList) => {
        let ended = false;
        if (newTaskList.length < 9) {
            ended = true;
        }
        setTaskList([...taskList, ...newTaskList]);
        setnewItemLoading(false);
        setOffset(offset + 9);
        setTaskEnded(ended);
    }
    const focusOnItem = (id) =>{
        console.log(itemRefs.current)
        itemRefs.current.forEach(item=>item.classList.remove('task__item_selected'))
        itemRefs.current[id].classList.add('task__item_selected');
        itemRefs.current[id].focus();
    }

    const renderItems = arr =>{
        const items = arr.map((item, i) => {

            return(
                <CSSTransition key={item.id} timeout={350} classNames="task__item">
                    <li
                    className="task__item"
                    tabIndex={0}
                    ref={el=>itemRefs.current[i] =el}
                    onClick={()=>{
                        props.OnTaskSelected(item.id);
                        focusOnItem(i);
                    }}
                    >
                        <div className="task__item_select-line"></div>
                        <div className="task__item_header">
                            <div className="task__item_header-name">{item.taskName}</div>
                            <div className="task__item_header-username">{item.username}</div>
                        </div>
                        <div className="task__item_decription">{item.description}</div>
                    </li>
                </CSSTransition>
            )
        })
        return (
            <ul className="task__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        );
    }

    const elements = useMemo(() => {
        return SetContent(process,() => renderItems(taskList),newItemLoading)
    },[process]);
    return (
        <div className="task__list">
            {elements}
            <button
                disabled={newItemLoading}
                style={{'display' : taskEnded ? 'none' : 'block'}}
                className="button button__main button__long"
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
};



export default TaskList;
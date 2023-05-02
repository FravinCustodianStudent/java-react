import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import Spinner from "../spinners/Spiners";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useTaskService from "../../services/useTaskService";
import SetContent from "../../utils/setContent";
import "./TaskList.scss";
import {motion} from "framer-motion";
import {UserContext} from "../app/App";
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
    const [newItemLoading, setnewItemLoading] = useState(false);
    const [taskEnded, setTaskEnded] = useState(false);
    const [page,setPage] = useState(0);
    const {process,setProcess,getAllTask} = useTaskService();
    const itemRefs = useRef([]);
    useEffect(() => {
            onRequest(true);

    }, []);
    const onRequest = (initial) =>{
        initial ? setnewItemLoading(false):setnewItemLoading(true);
        getAllTask(page)
            .then(onCharListLoaded)
            .then(()=>setProcess('confirmed'))
            .catch(err=> console.log(err))
    }
    const onCharListLoaded = async(res) => {
        console.log(res)
        const newTaskList = res.data.tasks;
        let ended = false;
        if (newTaskList.length < 9) {
            ended = true;
            setPage(page+1);
        }
        props.setTaskList([...props.taskList, ...newTaskList]);
        setnewItemLoading(false);

        setTaskEnded(ended);
    }
    const focusOnItem = (id) =>{
        itemRefs.current.forEach(item=>item.classList.remove('task__item_selected'))
        itemRefs.current[id].classList.add('task__item_selected');
        itemRefs.current[id].focus();
    }

    const renderItems = arr =>{
        const items = arr.map((item, i) => {

            return(
                <CSSTransition key={item.id} timeout={350} classNames="task__item">
                    <motion.li
                        initial={{opacity:0,boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)"}}
                        animate={{opacity:1}}
                        transition={{duration:0.1,ease:'easeInOut'}}
                        whileHover={{y:-10,boxShadow:"0px 4px 15px rgba(0, 0, 0, 0.6)"}}

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
                            <div className="task__item_header-name">{item.name}</div>
                            <div className="task__item_header-username">{item.author.username}</div>
                        </div>
                        <div className="task__item_decription">{item.shortDescription}</div>
                    </motion.li>
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
        return SetContent(process,() => renderItems(props.taskList),newItemLoading)
    },[process]);
    return (
        <div className="task__list">
            {elements}
            <motion.button
                disabled={newItemLoading}
                style={{'display' : taskEnded ? 'none' : 'block'}}
                className="button button__main button__long"
                onClick={() => onRequest()}>
                <div className="inner">load more</div>
            </motion.button>
        </div>
    )
};



export default TaskList;

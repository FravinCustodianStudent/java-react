import React, {useEffect, useState} from 'react';
import useTaskService from "../../services/useTaskService";
import setContent from "../../utils/setContent";
import "./TaskInfo.scss";
import {motion} from "framer-motion";
const TaskInfo = (props) => {
    const [task,setTask] = useState(null);
    const {getTaskById ,clearError ,process ,setProcess,deleteTaskById} = useTaskService();

    useEffect(() => {
        updateTask()
    }, [props.taskId]);

    const updateTask=()=>{
        const {taskId} = props;
        if (!taskId){
            return;
        }

        clearError();
        getTaskById(taskId)
            .then((task)=>onTaskLoaded(task))
            .then(()=>setProcess('confirmed'))
            .catch(err=>{
                console.log(err)
            })



    }
    const onButtonPressed = (id) =>{
        //TODO: when implemented - expand functionality by remove task from list and choose another one task
        setProcess('loading');


    }

    const onTaskLoaded = (task) =>{
        console.log(task)
        setTask(task);
    }
    return (
        <div className="task__info">
            {setContent(process,View,task,onButtonPressed)}
        </div>
    );
};

const View = ({data}) =>{
    const {id,username,taskName,description} = data;

    return(
        <motion.div
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:0.4}}
        >
            <div className="task__selectline__top"></div>
            <div className="task__basics">
                <div className="task__basics__info">
                    <div className="task__info__general-name">
                        <div className="task__info__general-name">{taskName}</div>
                        <div className="task__info__general-username">{username}</div>
                    </div>

                </div>
                <motion.button
                    initial={{background:"#ffffff"}}
                    whileHover={{background:"#5993EB",color:"#FFFFFF",
                        y:-5,boxShadow:"0px 4px 10px rgba(0, 0, 0, 0.5)"}}
                    transition={{duration:0.2}}
                    onClick={(e)=> {
                        data.onButtonPressed(id);
                    e.preventDefault()
                } }
                               className="task__info__btn">
                    Допомогти
                </motion.button>
            </div>
            <div className="task__description">{description}</div>
            <div className="task__selectline__bottom"></div>
        </motion.div>



    )
}
export default TaskInfo;

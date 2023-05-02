import React, {useContext, useEffect, useState} from 'react';
import useTaskService from "../../services/useTaskService";
import setContent from "../../utils/setContent";
import "./TaskInfo.scss";
import {motion} from "framer-motion";
import {UserContext} from "../app/App";
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
        console.log(task.data)
        setTask(task.data);
    }
    return (
        <div className="task__info">
            {setContent(process,View,task,onButtonPressed)}
        </div>
    );
};

const View = ({data}) =>{
    const {id,author,name,description,volunteers} = data;
    const { user } = useContext(UserContext);
    const {addVolunteer} = useTaskService();
    const checkVolonteers = (volunteers) =>{
        if (volunteers === null) return false;
        volunteers.forEach(element => {
            if (element.id === user.id){
                return true;
            }
        } )
        return false;
    }
    const onButtonPressed = (taskid) =>{
        addVolunteer(taskid)
            .then(res=>{
                console.log(res)
            });
    }
    return(
        <motion.div
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:0.1}}
        >
            <div className="task__selectline__top"></div>
            <div className="task__basics">
                <div className="task__basics__info">
                    <div className="task__info__general-name">
                        <div className="task__info__general-name">{name}</div>
                        <div className="task__info__general-username">{author.username}</div>
                    </div>

                </div>
                <motion.button
                    initial={{background:"#ffffff"}}
                    whileHover={{background:"#5993EB",color:"#FFFFFF",
                        y:-5,boxShadow:"0px 4px 10px rgba(0, 0, 0, 0.5)"}}
                    disabled={checkVolonteers(volunteers) || author.id === user.id}
                    transition={{duration:0.2}}
                    onClick={(e)=> {
                        onButtonPressed(id);
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

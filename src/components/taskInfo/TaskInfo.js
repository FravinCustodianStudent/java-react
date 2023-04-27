import React, {useEffect, useState} from 'react';
import useTaskService from "../../services/useTaskService";
import setContent from "../../utils/setContent";
import "./TaskInfo.scss";
const TaskInfo = (props) => {
    const [task,setTask] = useState(null);
    const {getTaskById ,clearError ,process ,setProcess,POST} = useTaskService();

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



    }
    const onButtonPressed = (task) =>{
        //TODO: when implemented - expand functionality by remove task from list and choose another one task
                    //POST(task).then()
    }

    const onTaskLoaded = (task) =>{
        console.log(task)
        setTask(task);
    }
    return (
        <div className="task__info">
            {setContent(process,View,task)}
        </div>
    );
};

const View = ({data}) =>{
    const {id,username,taskName,description} = data;

    return(
        <>
            <div className="task__selectline__top"></div>
            <div className="task__basics">
                <div className="task__basics__info">
                    <div className="task__info__general-name">
                        <div className="task__info__general-name">{taskName}</div>
                        <div className="task__info__general-username">{username}</div>
                    </div>

                </div>
                <button onClick={(e)=> {
                    e.preventDefault()
                } } className="task__info__btn">
                    Допомогти
                </button>
            </div>
            <div className="task__description">{description}</div>
            <div className="task__selectline__bottom"></div>
        </>



    )
}
export default TaskInfo;

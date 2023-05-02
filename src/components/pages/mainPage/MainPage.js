import React, {useState} from 'react';
import TaskList from "../../taskList/TaskList";
import TaskInfo from "../../taskInfo/TaskInfo";
import ErrorBoundary from "../../errorBoundry/ErrorBoundary";
import { motion} from "framer-motion";
const MainPage = () => {
    const [selectedTask,setTask] = useState(2);
    const [taskList, setTaskList] = useState([]);
    const OnTaskSelected=(id)=>{
        setTask(id);
    }
    return (

            <motion.div className="task__content"
                        initial={{opacity:0,x:0}}
                        animate={{opacity:1}}
                        transition={{duration:0.5}}
                        exit={{opacity:0,x:150}}
            >

                <ErrorBoundary>
                    <TaskList OnTaskSelected={OnTaskSelected} taskList={taskList} setTaskList={setTaskList}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <TaskInfo taskId={selectedTask} taskList={taskList} setTaskList={setTaskList}/>
                </ErrorBoundary>

            </motion.div>

    );
};

export default MainPage;

import React, {useState} from 'react';
import TaskList from "../../taskList/TaskList";
import TaskInfo from "../../taskInfo/TaskInfo";
import ErrorBoundary from "../../errorBoundry/ErrorBoundary";

const MainPage = () => {
    const [selectedTask,setTask] = useState(1);
    const OnTaskSelected=(id)=>{
        setTask(id);
    }
    return (
        <>
            <div className="task__content">

                <ErrorBoundary>
                    <TaskList OnTaskSelected={OnTaskSelected}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <TaskInfo taskId={selectedTask}/>
                </ErrorBoundary>

            </div>
        </>

    );
};

export default MainPage;

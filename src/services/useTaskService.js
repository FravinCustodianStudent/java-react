import {useHttp} from "../hooks/http.hook";

const useTaskService = () => {
    const { process, setProcess, POST, GET, DELETE, clearError} = useHttp();

    const getAllTask = (currentPage)=>{
        const request={
            page:currentPage,
            size:9
        }
        return POST(request,"/tasks",);
    }
    const addVolunteer = (taskId) =>{
        return POST(null,`/tasks/${taskId}/addVolunteer`);
    }
    const getTaskById = (id)=>{
        return GET(null,`/tasks/${id}/get`) ;
    }

    const addVolunteerToTask = (id) =>{
        return GET(null,`/tasks/${id}/addVolunteer`)
    }
    const createTask = (task) =>{
        const finalTask ={
            name: task.name,
            shortDescription : task.description.length>20 ? task.description.slice(0,20) : task.description,
            description: task.description,
            tags: [...task.tags]
        }
        return POST(finalTask,"/tasks/create");
    }
    const logout = () =>{
        localStorage.removeItem('token');
    }

    const getUserVolunteerRequests = (id) =>{
        return GET(null,`/tasks/volunteeredBy/${id}`);
    }
    const addExecutor = (taskId,executorId)=>{
        return POST(null,`/tasks/${taskId}/chooseExecutor/${executorId}`);
    }
    const finishTask = (taskId)=>{
        return POST(null,`/tasks/${taskId}/finish`);
    }
    const getTasksCreatedByUser = (id) =>{
        return GET(null,`/tasks/createdBy/${id}`);
    }
    const getUserByToken = () => {
        return GET(null,"/user");
    }

    return{
        process, setProcess, POST,  GET, DELETE, clearError,
        getAllTask,getTaskById,addVolunteer,getUserVolunteerRequests,getUserByToken,getTasksCreatedByUser,
        addVolunteerToTask,addExecutor,finishTask,createTask,logout
    }

};

export default useTaskService;
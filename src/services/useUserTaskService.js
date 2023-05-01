import {useHttp} from "../hooks/http.hook";

const useUserTaskService = () =>{
    const { process, setProcess, POST, PUT, GET, DELETE, clearError} = useHttp();
    return{
        process, setProcess, POST, PUT, GET, DELETE, clearError
    }
}

export default useUserTaskService;
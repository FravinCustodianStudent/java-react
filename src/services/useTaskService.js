import {useHttp} from "../hooks/http.hook";

const useTaskService = () => {
    const { process, setProcess, POST, GET, DELETE, clearError} = useHttp();

    const mockTask = [
        {id:1,
        username:"simpleName",
        taskName:"taskName", description:"Lorem ipsum dolor sit amet " +
                "consectetur. Nulla aenean nunc auctor penatibus nunc " +
                "tincidunt elementum et. Laoreet natoque id mi ac. Dui id ut " +
                "morbi magnis amet aliquam sed tellus. Tortor pretium facilisis" +
                " egestas pharetra. Magna dui ultricies eleifend fames. Mauris " +
                "tincidunt faucibus non amet diam. Vulputate euismod imperdiet dui " +
                "aliquam consectetur. Lectus sit auctor quis amet eget suspendisse. " +
                "Sagittis ultricies ultrices accumsan tincidunt."},
        {id:2,
            username:"simpleName2",
            taskName:"taskName2", description:"Lorem ipsum dolor sit amet " +
                "consectetur. Nulla aenean nunc auctor penatibus nunc " +
                "tincidunt elementum et. Laoreet natoque id mi ac. Dui id ut " +
                "morbi magnis amet aliquam sed tellus. Tortor pretium facilisis" +
                " egestas pharetra. Magna dui ultricies eleifend fames. Mauris " +
                "tincidunt faucibus non amet diam. Vulputate euismod imperdiet dui " +
                "aliquam consectetur. Lectus sit auctor quis amet eget suspendisse. " +
                "Sagittis ultricies ultrices accumsan tincidunt."},
        {id:3,
            username:"simpleName3",
            taskName:"taskName3", description:"Lorem ipsum dolor sit amet " +
                "consectetur. Nulla aenean nunc auctor penatibus nunc " +
                "tincidunt elementum et. Laoreet natoque id mi ac. Dui id ut " +
                "morbi magnis amet aliquam sed tellus. Tortor pretium facilisis" +
                " egestas pharetra. Magna dui ultricies eleifend fames. Mauris " +
                "tincidunt faucibus non amet diam. Vulputate euismod imperdiet dui " +
                "aliquam consectetur. Lectus sit auctor quis amet eget suspendisse. " +
                "Sagittis ultricies ultrices accumsan tincidunt."},


    ]

    //TODO: Refactor this peace of shit when api will be ready
    const getAllTask = (currentPage)=>{
        const request={
            page:currentPage,
            size:9
        }
        return POST(request,"/tasks",);
    }
    const getTaskById = (id)=>{
        return GET(null,`/tasks/${id}/get`) ;
    }

    const addVolunteerToTask = (id) =>{
        return GET(null,`/${id}/addVolunteer`)
    }
    const deleteVolunteerFromTask = (id) =>{
        return DELETE(null,`/${id}/deleteVolunteer`)
    }

    return{
        process, setProcess, POST,  GET, DELETE, clearError,
        getAllTask,getTaskById
    }

};

export default useTaskService;
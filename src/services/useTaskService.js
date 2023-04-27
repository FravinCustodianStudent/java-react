import {useHttp} from "../hooks/http.hook";

const useTaskService = () => {
    const { process, setProcess, POST, PUT, GET, DELETE, clearError} = useHttp();

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

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    //TODO: Refactor this peace of shit when api will be ready
    const getAllTask = async (body,offset)=>{
        //const res = await GET(body,offset);
        //return res;
        //await new Promise(r => setTimeout(r, 2000));
        return mockTask;
    }
    const getTaskById = async (id)=>{
        //const res = await GET(id)
        //return res;
        const result = mockTask
            .find((item)=> item.id === id)
        //await new Promise(r => setTimeout(r, 2000));
        return result ;
    }
    const createTask = async (task)=>{
        const res = await POST(task);
    }

    const updateTask = async (task)=>{
        const res = await PUT(task);
    }
    const deleteTaskById = async (id)=>{
        const res = await DELETE(id);
    }

    return{
        process, setProcess, POST, PUT, GET, DELETE, clearError,
        getAllTask,getTaskById,createTask,updateTask,deleteTaskById
    }

};

export default useTaskService;
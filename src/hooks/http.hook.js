import {useCallback, useContext, useState} from "react";
import axios from "axios";
import {UserContext} from "../components/app/App";
import {useNavigate} from "react-router-dom";

export const useHttp = () => {
    const [process, setProcess] = useState('waiting');
    const {user } = useContext(UserContext);
    //const baseUrl = "http://localhost:8080";
    const navigate = useNavigate();
    const baseUrl = "https://knu-help-wanted.herokuapp.com";
    // function delay(time) {
    //     return new Promise(resolve => setTimeout(resolve, time));
    // }

    const CreateUser = (requestBody)=>{
    setProcess('loading');
    return axios.post(baseUrl + '/users/create', requestBody);
        }
    const GETAuthentication = useCallback(async (requestBody)=>{
        setProcess('loading')
        return axios.post(baseUrl+`/login`,requestBody);
    },[]);


    const baseHeaders = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ localStorage.getItem('token'),
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS, PUT',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type',
            'Access-Control-Allow-Credentials': 'true',
    }

    const GET = useCallback(async (params,route)=>{

        //TODO: Redirect if no token presented
        if (localStorage.getItem('token') === null){
            navigate('/login');
        }
        setProcess('loading');
            return axios.get(baseUrl+route,{
                params: {...params},
                headers: baseHeaders
            });
    },
        []);
    
    const POST = useCallback(  (body,route) => {
            //TODO: Redirect if no token presented
            if (localStorage.getItem('token') === null){
                navigate('/login');
            }
            setProcess('loading');

            return axios.post(baseUrl+route,body,{
                headers:baseHeaders,
            })

        },
        [],
    );
    const PUT = useCallback(  (body) => {
            //TODO: Redirect if no token presented
            setProcess('loading');


        },
        [],
    );
    const DELETE = useCallback(  (route) => {
            //TODO: Redirect if no token presented
            if (localStorage.getItem('token') === null){
                navigate('/login');
            }
            return axios.delete(baseUrl+route,{
                headers:{
                    Authorization : localStorage.getItem('token')
                }
            })
        },
        [],
    );
    const clearError = useCallback(() => {
        setProcess('loading');
    }, []);
    return {process, setProcess, POST, PUT, GET, DELETE, clearError,GETAuthentication,CreateUser}


}
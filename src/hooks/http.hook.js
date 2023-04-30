import {useCallback, useState} from "react";
import axios from "axios";

export const useHttp = () => {
    const [process,setProcess] = useState('waiting');
    const baseUrl = "http://localhost:8080";
    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
    const GETAuthentication = useCallback(async (body)=>{
        setProcess('loading')
        try {
            const obj = JSON.parse(body);
            const username = obj["login"];
            const password = obj["password"];

            return axios.post(baseUrl+`/login?username=${username}&password=${password}`);
        }catch (e){
            setProcess('error');
            throw e;
        }
    },[]);

    const GET = useCallback(async (body,offset)=>{
        //TODO: Redirect if no token presented
        const token = 'eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2ODIzNzAwMDAsInJvbGUiOiJVU0VSIiwidXNlcm5hbWUiOiIxIn0.BPZSaDwFzRsJcptHY2ZUUWhd9WIbsDhrX_ycxpWieYEcx3a8dT1kIvPYT62uacwGyJ9Q2OWM-8u3IOXD_iqiNg';
        setProcess('loading');
        try {
            const request = new XMLHttpRequest();
            const url = 'http://localhost:8080/user';

            request.open('GET', url);
            request.setRequestHeader('Content-Type', 'application/json');
            //request.setRequestHeader('Access-Control-Allow-Origin', '*');
            request.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT');
            request.setRequestHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
            request.setRequestHeader('Access-Control-Allow-Credentials', 'true');
            request.setRequestHeader('Authorization', 'Bearer ' + token )
            await request.send(body);
            const response = request.response;
            return response.json();
        }catch (e){
            setProcess('error');
            throw e;
        }
    },
        []);
    
    const POST = useCallback( async (body) => {
            //TODO: Redirect if no token presented
            const token = 'eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2ODIzNzAwMDAsInJvbGUiOiJVU0VSIiwidXNlcm5hbWUiOiIxIn0.BPZSaDwFzRsJcptHY2ZUUWhd9WIbsDhrX_ycxpWieYEcx3a8dT1kIvPYT62uacwGyJ9Q2OWM-8u3IOXD_iqiNg';
            setProcess('loading');
            try {
                const request = new XMLHttpRequest();
                const url = 'http://localhost:8080/user';
                request.open('POST', url);
                request.setRequestHeader('Content-Type', 'application/json');
                //request.setRequestHeader('Access-Control-Allow-Origin', '*');
                request.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT');
                request.setRequestHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                request.setRequestHeader('Access-Control-Allow-Credentials', 'true');
                request.setRequestHeader('Authorization', 'Bearer ' + token )
                await request.send(body);
                const response = request.response;
                return response.json();

            }catch (e){
                setProcess('error');
                throw e;
            }

        },
        [],
    );
    const PUT = useCallback( async (body) => {
            //TODO: Redirect if no token presented
            const token = 'eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2ODIzNzAwMDAsInJvbGUiOiJVU0VSIiwidXNlcm5hbWUiOiIxIn0.BPZSaDwFzRsJcptHY2ZUUWhd9WIbsDhrX_ycxpWieYEcx3a8dT1kIvPYT62uacwGyJ9Q2OWM-8u3IOXD_iqiNg';
            setProcess('loading');

            try {
                const request = new XMLHttpRequest();
                const url = 'http://localhost:8080/user';
                request.open('PUT', url);
                request.setRequestHeader('Content-Type', 'application/json');
                //request.setRequestHeader('Access-Control-Allow-Origin', '*');
                request.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT');
                request.setRequestHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                request.setRequestHeader('Access-Control-Allow-Credentials', 'true');
                request.setRequestHeader('Authorization', 'Bearer ' + token )
                await request.send(body);
                const response = request.response;
                return response.json();

            }catch (e){
                setProcess('error');
                throw e;
            }

        },
        [],
    );
    const DELETE = useCallback( async (body) => {
            //TODO: Redirect if no token presented
            const token = 'eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2ODIzNzAwMDAsInJvbGUiOiJVU0VSIiwidXNlcm5hbWUiOiIxIn0.BPZSaDwFzRsJcptHY2ZUUWhd9WIbsDhrX_ycxpWieYEcx3a8dT1kIvPYT62uacwGyJ9Q2OWM-8u3IOXD_iqiNg';
            setProcess('loading');

            try {
                const request = new XMLHttpRequest();
                const url = 'http://localhost:8080/user';
                request.open('DELETE', url);
                request.setRequestHeader('Content-Type', 'application/json');
                //request.setRequestHeader('Access-Control-Allow-Origin', '*');
                request.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT');
                request.setRequestHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                request.setRequestHeader('Access-Control-Allow-Credentials', 'true');
                request.setRequestHeader('Authorization', 'Bearer ' + token )
                await request.send(body);
                const response = request.response;
                return response.json();

            }catch (e){
                setProcess('error');
                throw e;
            }

        },
        [],
    );
    const clearError = useCallback(() => {
        setProcess('loading');
    }, []);
    return {process, setProcess, POST, PUT, GET, DELETE, clearError,GETAuthentication}


}
import {useContext, useEffect, useState} from "react";
import "./RequstedTaskList.scss";
import {UserContext} from "../../app/App";
import useTaskService from "../../../services/useTaskService";

const RequestedTaskList =(props) =>{
    const { user } = useContext(UserContext);
    const {process,setProcess,getUserVolunteerRequests} = useTaskService();
    useEffect(() => {
            if (user!= null){
                console.log(user)
                getUserVolunteerRequests(user.id)
                    .then((res)=>{
                        props.setTaskList(res.data);
                    })
                    .catch(err=>console.log(err))
            }
    }, [user]);
    const renderItems = (arr,user) =>{

        const items = arr.map((item,i)=>{
            const isExecutorFunc = () => {
                const volunteers = item.volunteers;

                volunteers.forEach(i =>{
                    if (user.id === i.id && i.executor === true){
                        return true;
                    }
                })
                return false;
            }
            const isExecutor = isExecutorFunc(item);


            return(
                <>
                    { isExecutor ? <div key={i} className="user__request-allowed">
                        <div className="user__request__line"></div>
                        <div className="user__request__content">
                            <div className="user__request__content__userinfo">
                                <div className="user__request__content__userinfo-header">{item.name}</div>
                                <div className="user__request__content__userinfo-username">{item.author.username}</div>
                            </div>
                            <div className="user__request__content__userinfo-status">Запит підтвердженно</div>
                        </div>
                        <div className="user__request__bottom-line"></div>
                        <div className="user__request__details"><p>email.@com</p></div>
                    </div> :

                        <div key={i} className="user__request">
                            <div className="user__request__line"></div>
                            <div className="user__request__content">
                                <div className="user__request__content__userinfo">
                                    <div className="user__request__content__userinfo-header">{item.name}</div>
                                    <div className="user__request__content__userinfo-username">{item.author.username}</div>
                                </div>
                                <div className="user__request__content__userinfo-status">Запит очікує підтвердження</div>
                            </div>
                        </div>
                    }
                </>
            )
        })
        return(
            <div className="user__request__list">
                <h2>Запити на завдання</h2>
            {items}
            </div>
        )
    }
    return(
        <>

            {user!= null ? renderItems(props.TaskList,user) : null}
        </>
    )

}
export default RequestedTaskList;
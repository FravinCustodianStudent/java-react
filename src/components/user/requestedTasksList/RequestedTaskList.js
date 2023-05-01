import {useState} from "react";
import useUserTaskService from "../../../services/useUserTaskService";
import "./RequstedTaskList.scss";

const RequestedTaskList =(props) =>{
    const [newItemLoading, setnewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const {process,setProcess,getAllTask} = useUserTaskService();

    return(
        <div className="user__request__list">
            <h2>Запити на завдання</h2>
            <div className="user__request">
                <div className="user__request__line"></div>
                <div className="user__request__content">
                    <div className="user__request__content__userinfo">
                        <div className="user__request__content__userinfo-header">TaskName</div>
                        <div className="user__request__content__userinfo-username">name of author</div>
                    </div>
                    <div className="user__request__content__userinfo-status">Запит очікує підтвердження</div>
                </div>
            </div>
            <div className="user__request-allowed">
                <div className="user__request__line"></div>
                <div className="user__request__content">
                    <div className="user__request__content__userinfo">
                        <div className="user__request__content__userinfo-header">TaskName</div>
                        <div className="user__request__content__userinfo-username">name of author</div>
                    </div>
                    <div className="user__request__content__userinfo-status">Запит підтвердженно</div>
                </div>
                <div className="user__request__bottom-line"></div>
                <div className="user__request__details"><p>email.@com</p></div>
            </div>
        </div>

    )

}

export default RequestedTaskList;
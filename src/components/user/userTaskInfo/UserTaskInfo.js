
import "./UserTaskList.scss";
import {Button} from "@mui/material";
const UserTaskInfo = () =>{

    return (
        <div className="task__manage">
            <div className="task__manage__line"></div>
            <div className="task__manage__content">
                <div className="task__manage__header">TaskName</div>
                <div className="task__manage__content__list">
                    <div className="task__manage__content__list__item">
                        <div className="task__manage__content__list__item__username">username</div>
                        <div className="task__manage__content__list__item__button"><Button
                            variant="contained"
                            sx={{
                            width:130,
                            background:"#EBC259"
                        }}>Підтвердити</Button></div>
                    </div>
                </div>
            </div>
            <div className="task__manage__button">
                <Button variant="contained">Закрити завдання</Button>
            </div>

        </div>
    )
}

export default UserTaskInfo;
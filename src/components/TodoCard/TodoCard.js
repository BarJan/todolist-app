import { useState } from "react";
import { Button, Card, FormCheck, Row } from "react-bootstrap";
import "../TodoCard/TodoCard.css"

function TodoCard (props){
    const {ind, updateT, updateCnt, todo} = props;
    const [checkStatus, setCheckStatus] = useState(todo.isComplete);

    function ChangedStatus(){
        todo.isComplete = !checkStatus;
        setCheckStatus(true);
        todo.isComplete=true;//updateT(ind);
        updateCnt();
    }

    return(
        <Row  className={"r-TodoCard"}>
            <Card>
                <FormCheck disabled={todo.isComplete} type="checkbox" checked={todo.isComplete} label={todo.text} onChange={()=> ChangedStatus()}/>
                <Button type="button">X</Button>
            </Card>
        </Row>
        
    );
}

export default TodoCard;
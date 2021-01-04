import { useEffect, useState } from "react";
import { Card, Form, FormCheck } from "react-bootstrap";


function TodoCard (props){
    const {todo} = props;
    const [checkStatus, setCheckStatus] = useState(todo.status);

    useEffect(()=>{
        todo.status = checkStatus;
    },[checkStatus])

    return(
        <Card>
            <FormCheck type="checkbox" label="Check me out" onChange={setCheckStatus(!checkStatus)}/>
            <Card.Body>{todo.text}</Card.Body>
        </Card>
    )
}

export default TodoCard;
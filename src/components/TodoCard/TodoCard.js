import { useState } from "react";
import { Button, Card, FormCheck, Modal, Row } from "react-bootstrap";
import "../TodoCard/TodoCard.css"

function TodoCard (props){
    const {ind, updateCnt, updateTask, removeT, todo} = props;
    const [checkStatus, setCheckStatus] = useState(todo.isComplete);
    const [deleteTask, setDeleteTask] = useState(false);
    
    function ChangedStatus(){
        todo.isComplete = true;
        updateCnt();
        setCheckStatus(true);
    }

    return(
            <Row  className={"r-TodoCard"}>
                <Card>
                    <FormCheck disabled={checkStatus} type="checkbox" checked={checkStatus} label={todo.text} onChange={()=> ChangedStatus()}/>
                    <Button id="delete" type="button" onClick={()=> {checkStatus? removeT(todo.id) : setDeleteTask(true);}}>X</Button>
                </Card>
                {deleteTask ?
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Task</Modal.Title>
                    </Modal.Header>
                
                    <Modal.Body>
                        <p>This task has not completed yet</p>
                        <p>Are you sure you want to delete this task?</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={()=> setDeleteTask(false)}>Cancel</Button>
                        <Button variant="primary" onClick={()=> {removeT(todo.id); setDeleteTask(false);}}>Delete</Button>
                    </Modal.Footer>
                </Modal.Dialog>
                : null}
            </Row>
        
    );
}

export default TodoCard;
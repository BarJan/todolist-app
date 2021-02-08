import { useState } from "react";
import { Button, Card, FormCheck, Modal, Row } from "react-bootstrap";
import "../TodoCard/TodoCard.css"

function TodoCard (props){
    const { updateTask, removeT, todo} = props;
    const [deleteTask, setDeleteTask] = useState(false);
    
    return(
            <Row  className={"r-TodoCard"}>
                <Card>
                    <FormCheck disabled={todo.isComplete} type="checkbox" checked={todo.isComplete} label={todo.text} onChange={()=> updateTask(todo.id)}/>
                    <Button id="delete" type="button" onClick={()=> {todo.isComplete? removeT(todo.id) : setDeleteTask(true);}}>X</Button>
                </Card>
                {deleteTask ?
                <Modal show={deleteTask} onHide={setDeleteTask}>
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
                </Modal>
                : null}
            </Row>
        
    );
}

export default TodoCard;
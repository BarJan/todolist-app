import axios from "axios";
import "./todoPage.css"
import TodoMission from "../models/TodoMission"
import { Button, Card } from "react-bootstrap";
import TodoCard from "../components/TodoCard";

const { useState, useEffect } = require("react");

function TodoPage(){
    
    const [todoList, setTodoList] = useState([]);
    const [todoFilterAll, setTodoFilterAll] = useState(true);
    const [todoFilterComplete, setTodoFilterComplete] = useState(false)
    const [todoFilterActive, setTodoFilterActive] = useState(false)
    
    let listToView = [];
    let activCounter = 0;

    useEffect(() => {
        axios.get("todos.json").then(res => {
            const newList = res.data.map((plainTodo)=> new TodoMission(plainTodo));
            setTodoList(newList);
            activCounter = newList.filter(todo => (todo.isComplete)).size;

        });   
    },);

    todoFilterAll ? (listToView = todoList.map(todo => <TodoCard todo={todo}/>)) : (
        todoFilterComplete? )
    
    listToView = todoList.map(todo => <TodoCard todo={todo}/>);

    useEffect(() => {
        todoFilterAll ? setTodoList(newList) : setTodoList(newList.filter(todo => (todo.isComplete === todoFilterIsComplete)));
        activCounter = newList.filter(todo => (todo.isComplete)).size;
        listToView = todoList.map(todo => <TodoCard todo={todo}/>);

    },[todoFilter]);





    return(
        <div>
            {listToView}
            <Card>
                <Card.Body>{activCounter} items left</Card.Body>
                <Button value={1} onClick={setTodoFilterAll(true)}>All</Button>
                <Button value={2} onClick={setTodoFilterIsComplete(false)}>Active</Button>
                <Button value={3} onClick={setTodoFilterIsComplete(false)}>Completed</Button>
            </Card>
        </div>
        
    )


}


export default TodoPage;
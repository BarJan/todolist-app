import axios from "axios";
import "todoPage.css"

const { useState, useEffect } = require("react");



function todoPage(props){
    
    const [todoList, setTodoList] = useState([]);
    const [todoFilter, setTodoFilter] = useState("");
    let listToView = [];
    let activCounter = 0;
    useEffect(() => {
        const newList = axios.get("todos.json").then(res => {
            res.data.map(plainTodo => new TodoMission(plainTodo));
        });
        setTodoList(newList.filter(todo => (todo.status.includes(todoFilter))));
        activCounter = newList.filter(todo => (todo.status.includes("active"))).size;
    },[todoFilter]);

    listToView = todoList.map(todo => <TodoCard todo={todo}/>);

    return(
        <div>
            {listToView}
            <Card>
                <Card.Body>{activCounter} items left</Card.Body>
                <Button>All</Button>
                <Button>Active</Button>
                <Button>Completed</Button>
            </Card>
        </div>
        
    )


}


export default todoPage;
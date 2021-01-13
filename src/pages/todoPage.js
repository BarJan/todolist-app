import axios from "axios";
import "../pages/TodoPage.css"
import TodoMission from "../models/TodoMission"
import { Button, Card, CardColumns, Container, Jumbotron, Row } from "react-bootstrap";
import TodoCard from "../components/TodoCard/TodoCard";
import InputField from "../components/InputField/InputField";

const { useState } = require("react");

function TodoPage(props){
    const [todoList, setTodoList] = useState([]);
    const [todoFilter, setTodoFilter] = useState("all");
    const [activeCounter, setActiveCounter] = useState(0);
    
    let listToView = [];

    function Filter() {
        if(todoFilter === "active"){
            return(todoList.filter(todo=>!(todo.isComplete)).map((todo,index) => <TodoCard key={index} updateTask={UpdateTodo} removeT={RemoveTask} todo={todo}/>));
        }
        else if(todoFilter === "complete"){
            return(todoList.filter(todo=>(todo.isComplete)).map((todo,index) => <TodoCard key={index} updateTask={UpdateTodo} removeT={RemoveTask} todo={todo}/>));
        }
        return(todoList.map((todo,index) => <TodoCard key={index} updateTask={UpdateTodo} removeT={RemoveTask} todo={todo}/>));
    }

    function UpdateCounter(newTList){
        if(newTList.length === 0)
            setActiveCounter(0);
        else
            setActiveCounter(newTList.filter(todo=>!(todo.isComplete)).length);
    }

    function UpdateTodo(id){
        let newTList = [...todoList];
        const found = newTList.find(todo => todo.id === id);
        found.isComplete = true;
        setTodoList(newTList);
        UpdateCounter(newTList);
    }

    function AddNewTodo(newTodo){
        let newTList = [...todoList];
        newTList.push(newTodo);
        setTodoList(newTList);
        UpdateCounter(newTList);
    }

    function RemoveTask(id){
        let newTList = [...todoList];
        const toDlt = newTList.find(todo => todo.id === id);
        const index = newTList.indexOf(toDlt);
        newTList.splice(index, 1);
        setTodoList(newTList);
        UpdateCounter(newTList);
    }

    listToView = Filter();

    return(
        <div className="tpage">
            <Jumbotron>
                <Container>
                    <h1>reacToDo List</h1>
                </Container>
            </Jumbotron>
            <Container className={"container-tpage"}>
                <InputField addNewTask={AddNewTodo} />
                <div className={"d-cards"}>
                    <Container>
                        {listToView}
                        <Row className="tPage-btns-row">
                            <Card>
                                <h3>{activeCounter} items left</h3>
                                <Row>
                                    <Button value={1} onClick={()=> setTodoFilter("all")}>All</Button>
                                    <Button value={2} onClick={()=> setTodoFilter("active")}>Active</Button>
                                    <Button value={3} onClick={()=> setTodoFilter("complete")}>Completed</Button>    
                                </Row>
                            </Card>
                        </Row>
                    </Container>
                </div>
            </Container>
        </div>
        
    );


}


export default TodoPage;
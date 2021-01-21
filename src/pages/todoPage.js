import axios from "axios";
import "../pages/TodoPage.css"
import TodoMission from "../models/TodoMission"
import { Button, Card, CardColumns, Col, Container, Jumbotron, Row } from "react-bootstrap";
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
                <Row className={"d-card"}>
                        {listToView}
                </Row>
                <Row className="tpage-info-row">
                    <Col md={6}>
                        <Row className="tpage-active-sum">
                            <h3>{activeCounter} items left</h3>
                        </Row>
                    </Col>
                    <Col md={6}>
                        <Row className="tpage-btns-row">
                            <Col md={3}>
                                <Button variant={todoFilter==="all" ? "secondary" : "outline-secondary"} value={1} onClick={()=> setTodoFilter("all")}>All</Button>
                            </Col>
                            <Col md={3}>
                                <Button variant={todoFilter==="active" ? "secondary" : "outline-secondary"} value={2} onClick={()=> setTodoFilter("active")}>Active</Button>
                            </Col>
                            <Col md={3}>
                                <Button variant={todoFilter==="complete" ? "secondary" : "outline-secondary"} value={3} onClick={()=> setTodoFilter("complete")}>Completed</Button>    
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
        
    );


}


export default TodoPage;
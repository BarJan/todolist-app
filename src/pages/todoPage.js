import "../pages/TodoPage.css"
import { Button, Col, Container, Jumbotron, Row } from "react-bootstrap";
import TodoCard from "../components/TodoCard/TodoCard";
import InputField from "../components/InputField/InputField";
import TodoMission from "../models/TodoMission";

const { useState, useEffect } = require("react");

function TodoPage(props){
    const [todoList, setTodoList] = useState([]);
    const [todoFilter, setTodoFilter] = useState("all");
    const [activeCounter, setActiveCounter] = useState(0);
    
    let listToView = [];

    useEffect(() =>{
        const myStorage = localStorage;
        if(myStorage.getItem('todoList') !== null){
          const fromStorage = JSON.parse(myStorage.getItem('todoList')).map((todo) => new TodoMission(todo));
          setTodoList(fromStorage);
        }
      },[]);
    
      function updateLocalStorage(todoListTosave){
        const myStorage = localStorage;
        const dataToStorage = JSON.stringify(todoListTosave);
        myStorage.setItem('todoList', dataToStorage);
      }

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
        updateLocalStorage(newTList);
        UpdateCounter(newTList);
        setTodoList(newTList);
    }

    function AddNewTodo(newTodo){
        let newTList = [...todoList];
        newTList.push(newTodo);
        updateLocalStorage(newTList);
        UpdateCounter(newTList);
        setTodoList(newTList);
    }

    function RemoveTask(id){
        let newTList = [...todoList];
        const toDlt = newTList.find(todo => todo.id === id);
        const index = newTList.indexOf(toDlt);
        newTList.splice(index, 1);
        updateLocalStorage(newTList);
        UpdateCounter(newTList);
        setTodoList(newTList);
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
                <Row className="tpage-info-row">
                    <Col md={6}>
                        <Row className="tpage-active-sum">
                            <h3>{activeCounter} items left</h3>
                        </Row>
                    </Col>
                    <Col md={6}>
                        <Row className="tpage-btns-row">
                            <Col xl={4} lg={8} md={8} sm={8} xs={8}>
                                <Button variant={todoFilter==="all" ? "secondary" : "outline-secondary"} value={1} onClick={()=> setTodoFilter("all")}>All</Button>
                            </Col>
                            <Col xl={4} lg={8} md={8} sm={8} xs={8}>
                                <Button variant={todoFilter==="active" ? "secondary" : "outline-secondary"} value={2} onClick={()=> setTodoFilter("active")}>Active</Button>
                            </Col>
                            <Col xl={4} lg={8} md={8} sm={8} xs={8}>
                                <Button variant={todoFilter==="complete" ? "secondary" : "outline-secondary"} value={3} onClick={()=> setTodoFilter("complete")}>Completed</Button>    
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className={"d-card"}>
                        {listToView}
                </Row>
                
            </Container>
        </div>
        
    );


}


export default TodoPage;
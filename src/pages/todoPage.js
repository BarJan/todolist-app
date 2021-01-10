import axios from "axios";
import "../pages/TodoPage.css"
import TodoMission from "../models/TodoMission"
import { Button, Card, CardColumns, Container, Jumbotron, Row } from "react-bootstrap";
import TodoCard from "../components/TodoCard/TodoCard";
import InputField from "../components/InputField/InputField";

const { useState, useEffect } = require("react");

function TodoPage(props){
    //const {taskList} = props;
    const [todoList, setTodoList] = useState([]);//taskList);
    const [todoFilter, setTodoFilter] = useState("all");
    const [activeCounter, setActiveCounter] = useState(0);
    
    let listToView = [];

    // useEffect(()=>{
    //     UpdateCounter();
    //     listToView = Filter();
    // },[todoList]);

    function Filter() {
        if(todoFilter === "active"){
            return(todoList.filter(todo=>!(todo.isComplete)).map((todo,index) => <TodoCard key={index} ind={index} updateCnt={UpdateCounter} updateTask={UpdateTodo} removeT={RemoveTask} todo={todo}/>));
        }
        else if(todoFilter === "complete"){
            return(todoList.filter(todo=>(todo.isComplete)).map((todo,index) => <TodoCard key={index} ind={index} updateCnt={UpdateCounter} updateTask={UpdateTodo} removeT={RemoveTask} todo={todo}/>));
        }
        return(todoList.map((todo,index) => <TodoCard key={index} ind={index} updateCnt={UpdateCounter} updateTask={UpdateTodo} removeT={RemoveTask} todo={todo}/>));
    }

    function UpdateCounter(){
        setActiveCounter(todoList.filter(todo=>!(todo.isComplete)).length);
    }

    function UpdateTodo(id){
        let newTList = todoList;
        const found = newTList.find(todo => todo.id === id);
        found.isComplete = true;
        setTodoList(newTList);
    }

    function AddNewTodo(newTodo){
        let newTList = todoList;
        newTList.push(newTodo);
        UpdateCounter();
        setTodoList(newTList);
    }

    function RemoveTask(id){
        let newTList = todoList;
        // const index = newTList.indexOf((todo) => {todo.id === id});
        // if (index > -1) {
        //     newTList.splice(index, 1);
        // }
        const toDlt = newTList.find(todo => todo.id===id);
        const index = newTList.indexOf(toDlt);
        newTList.splice(index, 1);
        UpdateCounter();
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
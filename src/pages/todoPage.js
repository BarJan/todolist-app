import axios from "axios";
import "../pages/TodoPage.css"
import TodoMission from "../models/TodoMission"
import { Button, Card, CardColumns, Container, Row } from "react-bootstrap";
import TodoCard from "../components/TodoCard/TodoCard";
import InputField from "../components/InputField/InputField";

const { useState, useEffect } = require("react");

function TodoPage(){
    
    const [todoList, setTodoList] = useState([]);
    const [todoFilter, setTodoFilter] = useState("all");
    const [activeCounter, setActiveCounter] = useState(0);
    
    let listToView = [];

    useEffect(() => {
        axios.get("todos.json").then(res => {
            const newList = res.data.map(plainTodo=> new TodoMission(plainTodo));
            setTodoList(newList);
            setActiveCounter(newList.filter(todo=>!(todo.isComplete)).length);     
        });   
    },[]);

    function Filter() {
        if(todoFilter === "active"){
            return(todoList.filter(todo=>!(todo.isComplete)).map((todo,index) => <TodoCard key={index} ind={index} updateT={UpdateTodo} updateCnt={UpdateCounter} todo={todo}/>));
        }
        else if(todoFilter === "complete"){
            return(todoList.filter(todo=>(todo.isComplete)).map((todo,index) => <TodoCard key={index} ind={index} updateT={UpdateTodo} updateCnt={UpdateCounter} todo={todo}/>));
        }
        return(todoList.map((todo,index) => <TodoCard key={index} ind={index} updateT={UpdateTodo} updateCnt={UpdateCounter} todo={todo}/>));
    }

    function UpdateCounter(){
        setActiveCounter(todoList.filter(todo=>!(todo.isComplete)).length);
    }

    function UpdateTodo(ind){
        todoList[ind].isComplete = true;
    }

    function AddNewTodo(newTodo){
        let newTList = todoList;
        newTList.push(newTodo); 
        setTodoList(newTList);
        UpdateCounter();
    }

    listToView = Filter();


    return(
        <Container className={"container-tpage"}>
            <InputField addNewTask={AddNewTodo} />
            <div className={"d-cards"}>
                {listToView}
                <Row>
                    <CardColumns>
                        <text>{activeCounter} items left</text>
                        <Row>
                            <Button value={1} onClick={()=> setTodoFilter("all")}>All</Button>
                            <Button value={2} onClick={()=> setTodoFilter("active")}>Active</Button>
                            <Button value={3} onClick={()=> setTodoFilter("complete")}>Completed</Button>    
                        </Row>
                    </CardColumns>
                </Row>
            </div>
        </Container>
        
    );


}


export default TodoPage;
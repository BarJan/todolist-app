import { useState } from "react";
import { FormControl, InputGroup, Row } from "react-bootstrap";
import TodoMission from "../../models/TodoMission";

function InputField(props){
    const {addNewTask} = props;
    const [inputValue, setInputValue] = useState("");
    
    function addTask(newTask){
        if(newTask !== '\n'){
            const newT = new TodoMission(newTask, false);
            addNewTask(newT);
        }
        setInputValue("");
    }


    return(
        <Row>
            <label htmlFor="basic-url">Enter a new task to your ToDo-list</label>
            <InputGroup className="mb-3">

                <FormControl id="basic-url" value={inputValue} aria-describedby="basic-addon3" as="textarea" rows={3} onKeyUp ={(e) =>{if (e.keyCode === 13) {
                                                                                                                e.preventDefault();
                                                                                                                addTask(e.target.value)
                                                                                                                }
                                                                                                            }
                                                                                                        } onChange={(e)=>setInputValue(e.target.value)}/>
            </InputGroup>
        </Row>
    );
}

export default InputField;


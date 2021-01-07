import { useEffect, useState } from "react";
import { FormControl, InputGroup, Row } from "react-bootstrap";
import TodoMission from "../../models/TodoMission";





function InputField(props){
    const {addNewTask} = props;
    const [newTask, setNewTask] = useState("");
    const [inputValue, setInputValue] = useState("");
    
    useEffect(()=>{

        if(newTask){
            const newT = new TodoMission(newTask, false);
            addNewTask(newT);
        }
        setInputValue("");
    },[newTask]);


    return(
        <Row>
            <label htmlFor="basic-url">Enter new task for your ToDo list</label>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon3">
                        Write here:
                    </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="basic-url" value={inputValue} aria-describedby="basic-addon3" as="textarea" rows={1} onKeyUp ={(e) =>{if (e.keyCode === 13) {
                                                                                                                e.preventDefault();
                                                                                                                setNewTask(e.target.value)
                                                                                                                }
                                                                                                            }
                                                                                                        } onChange={(e)=>setInputValue(e.target.value)}/>
            </InputGroup>
        </Row>
    );
}

export default InputField;


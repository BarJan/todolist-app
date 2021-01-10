import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import './App.css';
import TodoMission from './models/TodoMission';
import TodoPage from './pages/TodoPage';

function App() {
  const [taskList, setTaskList] = useState([]);
  
  useEffect(()=>{
      axios.get("todos.json").then(res => {
          const newList = res.data.map(plainTodo=> new TodoMission(plainTodo));
          setTaskList(newList);
      });
  },[]);


  return (
    <div className="App">
      <TodoPage taskList={taskList}/>
    </div>
  );
}

export default App;

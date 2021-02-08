import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import './App.css';
import TodoMission from './models/TodoMission';
import TodoPage from './pages/TodoPage';

function App() {
  const [taskList, setTaskList] = useState([]);

  // useEffect(() =>{
  //   const myStorage = localStorage;
  //   if(myStorage.getItem('todoList') !== null){
  //     const fromStorage = JSON.parse(myStorage.getItem('todoList')).map((todo) => new TodoMission(todo));
  //     setTaskList(fromStorage);
  //   }
  // },[])

  // function UpdateStorage(todoList){
  //   const myStorage = localStorage;
  //   const dataToStorage = JSON.stringify(todoList);
  //   myStorage.setItem('todoList', dataToStorage);
  // }


  return (
    <div className="App">
      <TodoPage />
    </div>
  );
}

export default App;

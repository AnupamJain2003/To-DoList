import { useState } from 'react'
import './CSS/ToDo.css'
import { useRef } from 'react';
import { useEffect } from 'react';
import ToDoItems from './ToDoItems';
let count=0;
const ToDo = () => {
  const[todos,setTodos]=useState([]);

  const inputRef=useRef(null);
  const Add=()=>{
    setTodos([...todos,{no:count++,text:inputRef.current.value,display:""}]);
    inputRef.current.value="";
    localStorage.setItem("todos_count",count);
  }
  useEffect(()=>{
    setTodos(JSON.parse(localStorage.getItem("todos")));
    count=localStorage.getItem("todos_count");
  },[])
  useEffect(()=>{
    
    setTimeout(()=>{
      console.log(todos);
    localStorage.setItem("todos",JSON.stringify(todos));
    },100);
  },[todos])
  return (
    <div className='todo'>
    <div className="todo-header">To- Do List</div>
    <div className="todo-add">
      <input type="text" ref={inputRef} placeholder='Add Your Task' className='todo-input'/>
      <div className="todo-btn" onClick={()=>{Add()}} >ADD</div>
    </div>
    <div className="todo-list">
      {
        todos.map((item,index)=>{
          return <ToDoItems no={item.no} setTodos={setTodos} display={item.display} text={item.text} key={index}/>
        })
      }
    </div>
    </div>
  )
}

export default ToDo
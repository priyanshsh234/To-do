import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import Todoitems from './Todoitems'



const Todo = () => {
  const[todoList,settodoList] = useState([]);
  const inputRef = useRef();
  const add = () =>{
   const inputText = inputRef.current.value.trim();
   if(inputText=== ""){
    return null;
   }
   else{
   const newTodo ={
    id:Date.now(),
    text:inputText,
    isComplete:false,
   }
   settodoList((prev)=>[...prev,newTodo])
   inputRef.current.value="";
  }}
  const deleteTodo =(id) =>{
    settodoList((prvTodos)=>{
     return prvTodos.filter((todo)=>todo.id !== id)
    })
  }
  
  const toogle = (id)=>{
    settodoList((prevTodos)=>{
      return prevTodos.map((todo)=>{
        if(todo.id === id){
          return {...todo, isComplete: !todo.isComplete}
        }
        return todo;
      })

    })
  }
  useEffect(()=>{
    console.log(todoList)
  },[todoList])
  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl mt-20'>

   
    <div className='flex items-center t-7 gap-2 '>
     <img src={todo_icon} alt="" className='w-8' />
      <h1 className='text-3xl font-semibold '>To-Do list</h1>
    </div>
    <div className='flex items-center my-7 bg-gray-300 rounded-full'>
        <input ref={inputRef} type="text" placeholder='Add your task' className='bg-transparent border-0 outline-none flex-1 h-14 pl-6pr-2 placehold:text-slate-600 text-center'/>
        <button onClick={add} className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'>ADD +</button>

    </div>
    <div>
      {todoList.map((item,index)=>{
       return <Todoitems key={index} text ={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toogle={toogle}/>
      })}
      
    </div>
    </div>
  )
}

export default Todo
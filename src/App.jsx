import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import './App.css'
import Navbar from "./components/Navabr"

function App() {
  const [todo, setTodo] = useState("");
  // const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true)

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });

  // useEffect(() => {
  //   const savedTodos = localStorage.getItem("todos");
  //   console.log(savedTodos)
  //   console.log(todos)
  //   if (savedTodos) {
  //     setTodos(JSON.parse(savedTodos));
  //   }
  // }, []);
  
  useEffect(() => {
    console.log(todos)
    const savedTodos = localStorage.getItem("todos");
    console.log(savedTodos)
    localStorage.setItem("todos", JSON.stringify(todos));
  },[todos]); // This will trigger the effect whenever 'todos' state changes
  
  
 

  function handleChange(e) {
    setTodo(e.target.value)
  }

 const toggleFinished =()=>{
     setShowFinished(!showFinished)
 }

  function handleAdd() {
    setTodos([...todos, { todo, isCompleted: false, key: Date.now() }])

    console.log(typeof todos)
    setTodo("")
  }

  function handleCheckbox(e) {
    let key2 = e.target.name;
    console.log(todos)
    let index = todos.findIndex(items => {
      return items.key == key2;
    })
    console.log(index)
    let newTodos = [...todos];
    console.log(newTodos)
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    
  }

  function handleEdit(key) {
    let todoss = todos.filter((items) => items.key === key)
    // console.log(todoss[0].todo)
    setTodo(todoss[0].todo)

    //this is below code used to remove the particular object from the todos 
    let newtodo = todos.filter((items) => {
      return items.key !== key
    })
    setTodos(newtodo)
  }

  function handleDelete(key) {
    console.log(key)
    let newTodos = [...todos];
    let a = newTodos.filter(items => {
      return items.key !== key;
    })
    setTodos(a)
 
  }




  return (
    <>
      <Navbar />
      <div className='container mx-auto  m-3 p-3 bg-cyan-100 rounded-md'>
        <div className='sm:w-[50%] w-[99%] mx-auto text-center'>
          <h1 className='font-bold text-[2rem]'>Add a Todo</h1>
          <input type="text" onChange={handleChange} value={todo} className='input sm:w-[70%] w-[70%] h-7 p-2' />
          <button type='submit' onClick={handleAdd} disabled={todo.length<=3} className='px-3 py-1 mx-3 bg-cyan-600 rounded-md hover:bg-cyan-700'> ADD</button>
        </div>
        <div className='todo flex  sm:w-[80%] md:w-[70%] lg:w-[60%] 2xl-[50%]  w-[99%] mx-auto my-4'>
        <input type="checkbox" onChange={toggleFinished} checked={showFinished} className='mx-2 w-5'/><span className='font-bold text-xl'>Show Finished</span>
        </div>
        <h1 className='font-bold text-[2rem] text-center'>Your Todos</h1>
        <div className='todos'>
          {todos.length === 0 && <div className='m-2 text-center font-bold text-lg'>NO TODOS TO DISPLAY</div>}
          {todos.map(items => {
            return (showFinished==true || items.isCompleted==false)&& <div key={items.key} className='todo flex justify-between sm:w-[80%] md:w-[70%] lg:w-[60%] 2xl-[50%]  w-[99%] mx-auto my-4'>
              <input type="checkbox" className='checkbox mx-2' onChange={handleCheckbox} name={items.key} checked={items.isCompleted} id="" />
              <div className={items.isCompleted ? "line-through" : ""}>{items.todo}</div>
              <div className='button flex h-full'>
                <button type='submit' onClick={() => { handleEdit(items.key) }} className='text-sm px-1 mx-1 md:px-3 md:py-1 md:mx-3 bg-cyan-600 rounded-md hover:bg-cyan-700'><FaEdit /></button>
                <button type='submit' onClick={() => { handleDelete(items.key) }} className='text-sm px-1  md:px-3 md:py-1 md:mx-1 bg-cyan-600 rounded-md hover:bg-cyan-700'><MdDeleteSweep /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App

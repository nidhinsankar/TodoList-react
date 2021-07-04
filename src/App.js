import SingleTodo from './components/Todo'
import Form from './components/Form'
import FilterButton from './components/FilterButton'
import { useState } from 'react'
import {nanoid} from 'nanoid'

const FILTER_NAMES = {
  All: ()=>true,
  Active:task => !task.completed,
  Completed:task => task.completed
}
const FILTER_MAP = Object.keys(FILTER_NAMES)
function App(props) {
  const [filter,setFilter] = useState("All")
  const [tasks,setTasks] = useState(props.tasks)
  const headingText = `${tasks.length} Task remaining`
  const FilterTask = FILTER_MAP.map(task=>(<FilterButton
   key={task} 
   task={task}
   isPressed = {task === filter}
   setFilter = {setFilter} 
   />))
  function editTask(id,newName){
    const editedTask = tasks.map(task=>{
      if(id === task.id){
        return {...task,name: newName}
      }
      return task
    })
    setTasks(editedTask)
  }
  function ToggleTaskCompleted(id){
      const updatedTasks = tasks.map(task=>{
        if(id === task.id){
          return {...task,completed: !task.completed}
        }
        return task
      })
    setTasks(updatedTasks)
    console.log(updatedTasks)
  }
  function deleteTask(id){
    const remainingTasks = tasks.filter(task =>id !== task.id);
    setTasks(remainingTasks)
  }
  function addtask(name){
    const newTask = {id:"todo-"+nanoid(),name:name,completed:false} 
    setTasks([...tasks,newTask])
  }
  const taskList = tasks.filter(FILTER_NAMES[filter]).map(task =>
    (<SingleTodo key={task.id} name={task.name} id={task.id} checked={task.completed} ToggleTaskCompleted={ToggleTaskCompleted} deletetask={deleteTask} editTask={editTask} />)
  )
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addtask={addtask} />
      <div className="filters btn-group stack-exception">
        {FilterTask}
      </div>
      <h2 id="list-heading">
        {headingText}
      </h2>
      <ul className="todo-list stack-large stack-exception"
      aria-labelledby="list-heading">
         {taskList}
         
      </ul>
    </div>
  );
}


export default App;

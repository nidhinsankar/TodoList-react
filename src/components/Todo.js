import { useState } from 'react'


export default function Todo(props){
  const [isEditing,setIsEditing] = useState(false)
  const [newName,setNewName] = useState('')
  function handleSubmit(e){
      e.preventDefault()
      props.editTask(props.id,newName)
      setNewName("")
      setIsEditing(false)
  }
  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor={props.id} className="todo-label">
          new name for {props.name}
        </label>
        <input type="text" onChange={e => setNewName(e.target.value)} className="todo-text" id={props.id} />
      </div>
      <div className="btn-group">
        <button className="btn todo-cancel" onClick={()=>setIsEditing(false)} type="button">
          Cancel 
          <span className="visually-hidden">
            renaming {props.name}
          </span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save <span className="visually-hidden">
            new name for {props.name}
          </span>
        </button>
      </div>
    </form>
  )
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input type="checkbox" id={props.id} defaultChecked={props.completed}
        onChange={() => props.ToggleTaskCompleted(props.id)} />
        <label htmlFor={props.id} className="todo-label">
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button type="button" onClick={()=>setIsEditing(true)}  className="btn">
          Edit <span className="visually-hidden">
            {props.name}
          </span>
        </button>
        <button type="button" onClick={()=> props.deletetask(props.id)} className="btn btn__danger">
          Delete <span className="visually-hidden">
            {props.name}
          </span>
        </button>
      </div>
    </div>
  )
    return (
        <li className="todo">
        {isEditing ? editingTemplate :viewTemplate}
      </li>
    )
}
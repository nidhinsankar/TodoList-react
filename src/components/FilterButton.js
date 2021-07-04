

export default function FilterButton(props){
    function Click(){
        props.setFilter(props.task)
        console.log(props.task)
    }
    return (
    <button type="button" className="btn toggle-btn" aria-pressed={props.isPressed}
    onClick={Click}>
        <span className="visually-hidden">Show </span>
        <span>{props.task}</span>
        <span className="visually-hidden"> tasks</span>
    </button>
    )
}
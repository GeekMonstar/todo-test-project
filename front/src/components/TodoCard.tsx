import { Link } from "react-router-dom";
import { TodoType } from "../App";
import "./card.scss";

export default function TodoCard(props: PropsType){

  const {todo, currentTodoId} = props;
  const {id, title, description, checked, projectId} = todo;

  return(
    <div
      className={`todo-card${(currentTodoId && currentTodoId==id) ? " active" : ""}`}>
      <div className="todo-card-container">
        <div className="todo-card-left">
          <input type="checkbox" checked={checked}/>
          <div className="todo-card-data">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </div>
      </div>
      <Link to={`/projects/${projectId}/todos/${id}`}></Link>
    </div>
  )
}

interface PropsType {
  todo: TodoType,
  // active: boolean,
  currentTodoId: number | null
}

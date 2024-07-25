import { SubtodoType } from "../App"

export default function SubtodoCard(props: SubtodoCardPropsType){
  const {subtodo} = props;
  return(
    <div className="subtodo-card">
      <div className="subtodo-card-container">
        <input type="checkbox" name="" />
        <label>{subtodo.name}</label>
      </div>
    </div>
  )
}

type SubtodoCardPropsType = {
    subtodo: SubtodoType
}

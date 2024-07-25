import { useEffect, useState, Dispatch, createContext, useContext} from "react";
import { BrowserRouter, Routes, Route, NavLink, useParams } from "react-router-dom";
import Header from "./components/Header";
import TodoCard from "./components/TodoCard";
import "./App.scss";
import SubtodoCard from "./components/SubtodoCard";

const StateContext = createContext<StateContextType | null>(null)

export default function App(){

  const initialProjectsState: ProjectType[] = [
    {
      id: 1,
      name: "Project 1",
      description: "project 1 description"
    },
    {
      id: 2,
      name: "Project 2",
      description: "project 2 description"
    }
  ]

  const initialTodosState: TodoType[] = [
    {
      id: 1,
      title: "Todo-1",
      description: "Description of todo-1",
      checked: false,
      projectId: 1
    },
    {
      id: 2,
      title: "Todo-2",
      description: "Description of todo-2",
      checked: false,
      projectId: 1
    },
    {
      id: 3,
      title: "Todo-3",
      description: "Description of todo-3",
      checked: false,
      projectId: 2
    }
  ];

  const initialSubtodosState: SubtodoType[] = [
    {
      id: 1,
      name: "subtodo-1",
      checked: false,
      todoId: 1
    },
    {
      id: 2,
      name: "subtodo-2",
      checked: false,
      todoId: 1
    },
    {
      id: 3,
      name: "subtodo-3",
      checked: false,
      todoId: 1
    },
    {
      id: 4,
      name: "subtodo-4",
      checked: false,
      todoId: 2
    },
    {
      id: 5,
      name: "subtodo-4",
      checked: false,
      todoId: 2
    },
    {
      id: 6,
      name: "subtodo-6",
      checked: false,
      todoId: 3
    }
  ];

  const [state] = useState({
    projects: initialProjectsState,
    todos: initialTodosState,
    subtodos: initialSubtodosState
  })

  const [projects] = useState<ProjectType[]>(initialProjectsState);
  const [todos] = useState<TodoType[]>(initialTodosState);
  const [subtodos] = useState<SubtodoType[]>(initialSubtodosState);
  const [currentProjectId, setCurrentProjectId] = useState<number | null>(null)
  const [currentTodoId, setCurrentTodoId] = useState<number | null>(null);
  // const location = useLocation();

  useEffect(()=>{
    // console.log(location)
    const user = prisma.user.findMany();
    console.log("user:", user);
  })

  return(
    <StateContext.Provider value={state}>
      <BrowserRouter>
      <Header/>
      <main className="container">
      <div className="projects">
          <div className="projects-container">
            <Projects projects={projects}/>
          </div>
      </div>
        <div  className="todos">
          <div className="todos-container">
            <Routes>
              <Route path="/projects/:projectId/*" element={<Todos currentTodoId={currentTodoId} setCurrentProjectId={setCurrentProjectId}/>}/>
            </Routes>
          </div>
        </div>
        <div className="todo-show">
          <Routes>
            <Route path="/projects/:projectId/todos/:todoId" element={<TodoDetails setCurrentTodoId={setCurrentTodoId}/>}/>
          </Routes>
        </div>
      </main>
      </BrowserRouter>
    </StateContext.Provider>
  )

}


function Projects(){
  const state = useContext(StateContext)
  const [projects, setProjects] = useState<ProjectType[] | null>(null)

  useEffect(()=>{
    state && setProjects(state.projects)
  }, [state])
  return(
    <>
      {projects?.map(project => <NavLink key={project.id} to={`/projects/${project.id}`}>{project.name}</NavLink>)}
    </>
  )
}

function Todos(props: TodosProps){
  const {currentTodoId, setCurrentProjectId} = props;
  const [currentTodos, setCurrentTodos] = useState<TodoType[]>([]);
  const {projectId} = useParams();
  const params = useParams()
  const state = useContext(StateContext);
  const [todos, setTodos] = useState<TodoType[] | null>(null)

  useEffect(()=>{
    console.log(params);
    console.log(state);
    state && setTodos(state.todos);
    if(projectId) {
      todos && setCurrentTodos(todos.filter(todo => todo.projectId === parseInt(projectId)))
      setCurrentProjectId(parseInt(projectId))
    }
    // if(todoId) setCurrentTodoId(parseInt(todoId));
    }, [todos, projectId, params])
  return (
    <>
      {currentTodos.map((todo) => (
      <TodoCard key={todo.id} todo={todo} currentTodoId={currentTodoId}/>
    ))}
    </>
  )
}

function TodoDetails(props: TodoDetailsProps){
  const {setCurrentTodoId} = props;
  const [todo, setTodo] = useState<TodoType | null>(null);
  const [subtodos, setSubTodos] = useState<SubtodoType[]>([]);
  const {todoId} = useParams();
  const params = useParams()
  const state = useContext(StateContext);

  useEffect(()=>{
    console.log(params);
    console.log(subtodos);

    if(todoId) setCurrentTodoId(parseInt(todoId))
    if(todoId && state){
      setTodo(state.todos.find(todo => todo.id == parseInt(todoId)))
      setSubTodos(subtodos.filter(subtodo => subtodo.todoId === todo?.id))
    }
  }, [state, todo, todoId, subtodos, params, setCurrentTodoId])
  return (
    <div className="todo-details">
        <div className="todo-details-container">
          <h2>{todo && todo.title}</h2>
          <p>{todo && todo.description}</p>
          <div className="todo-details-tasks">
            <h3>Tasks</h3>
            {subtodos.map(subtodo =>(
              <SubtodoCard subtodo={subtodo}/>
            ))}
          </div>
        </div>
      </div>
  )
}

type ProjectType = {
  id: number,
  name: string,
  description: string
}

export type TodoType = {
  id: number,
  title: string,
  description: string,
  checked: boolean,
  projectId: number
}

export type SubtodoType = {
  id: number,
  name: string,
  checked: boolean,
  todoId: number
}

// type ProjectsProps = {
//   projects: ProjectType[]
// }

type TodosProps = {
  currentTodoId: number | null,
  setCurrentProjectId: Dispatch<React.SetStateAction<number | null>>
}

type TodoDetailsProps = {
  setCurrentTodoId: Dispatch<React.SetStateAction<number | null>>
}

type StateContextType = {
  projects: ProjectType[],
  todos: TodoType[],
  subtodos: SubtodoType[]
}

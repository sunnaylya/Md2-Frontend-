import "./App.css";
import { useRequestGetToDoList } from "./hooks/useEffect";

function App() {
  const { toDoList } = useRequestGetToDoList();
  return (
    <>
      <ul className="todo-list">
        {toDoList.map(({ id, title }) => (
          <li className="todo-list__item" key={id}>
            <span className="todo-list__item_number">{id}</span>
            {title}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;

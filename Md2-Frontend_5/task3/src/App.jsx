import { useEffect, useState } from "react";
import { ref, onValue, push, update, remove, set } from "firebase/database";
import styles from "./App.module.css";
import { db } from "../firebase.js";
import { AddSearchBlock } from "./components/add-search-block/add-search-block.jsx";
import { Todo } from "./components/todo/todo.jsx";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchPhrase, setSearchPhrase] = useState("");

  useEffect(() => {
    const todosDbref = ref(db, "todos");
    return onValue(todosDbref, (snapshot) => {
      const loadedTodos = snapshot.val();
      const todosArray = Object.values(loadedTodos);
      setTodos(todosArray);
    });
  }, []);

  const addTodo = () => {
    const todosDbRef = push(ref(db, "todos"));
    const newTodoWithId = {
      id: todosDbRef.key,
      title: inputValue,
    };
    setTodos((prevTodos) => [...prevTodos, newTodoWithId]);
    set(todosDbRef, newTodoWithId);

    setInputValue("");
  };

  const updateTodo = (id, newTitle) => {
    const todoRef = ref(db, `todos/${id}`);

    update(todoRef, {
      title: newTitle,
    });
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    const todoDbRef = ref(db, `todos/${id}`);
    remove(todoDbRef).then(() => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    });
  };

  const onInputChange = ({ target }) => {
    setInputValue(target.value);
  };

  const onSearchPhraseChange = ({ target }) => {
    setSearchPhrase(target.value);
  };
  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchPhrase.toLowerCase())
  );
  const sortTasksAlphabetically = () => {
    const sorted = [...todos].sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();

      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      return 0;
    });

    setTodos(sorted);
  };

  return (
    <div className={styles.container}>
      <AddSearchBlock
        inputValue={inputValue}
        onInputChange={onInputChange}
        onAddTask={() => addTodo()}
        sortTasksAlphabetically={() => sortTasksAlphabetically()}
        searchPhrase={searchPhrase}
        onSearchPhraseChange={onSearchPhraseChange}
      />
      {filteredTodos.map(({ id, title }) => (
        <Todo
          id={id}
          title={title}
          key={id}
          updateTodo={updateTodo}
          deleteTodo={() => deleteTodo(id)}
        />
      ))}
    </div>
  );
};

export default App;

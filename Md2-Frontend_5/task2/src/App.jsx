import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { AddSearchBlock } from "./components/add-search-block/add-search-block.jsx";
import { Todo } from "./components/todo/todo.jsx";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchPhrase, setSearchPhrase] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
      });
  }, []);

  const addTodo = () => {
    return fetch(`http://localhost:3000/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        title: inputValue,
      }),
    })
      .then((response) => response.json())
      .then((newTask) =>
        setTodos((prevTodos) => {
          return [...prevTodos, newTask];
        })
      );
  };

  const updateTodo = (id, newTitle) => {
    return fetch(`http://localhost:3000/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        title: newTitle,
      }),
    })
      .then((response) => response.json())
      .then((updatedTodo) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === updatedTodo.id ? updatedTodo : todo
          )
        );
      });
  };

  const deleteTodo = (id) => {
    return fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    }).then(() => {
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

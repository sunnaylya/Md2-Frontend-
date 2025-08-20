import styles from "./todo.module.css";
import { useState } from "react";

export const Todo = ({ id, title, updateTodo, deleteTodo }) => {
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const onChange = (e) => {
    setEditValue(e.target.value);
  };

  return (
    <div className={styles.todoListContainer}>
      <ul className={styles.todoList}>
        <li className={styles.todoList__item} key={id}>
          {editId === id ? (
            <input type="text" value={editValue} onChange={onChange} />
          ) : (
            <span>{title}</span>
          )}
        </li>
      </ul>
      <button
        className={styles.editButton}
        onClick={() => {
          if (editId === id) {
            updateTodo(id, editValue);
            setEditId(null);
          } else {
            setEditId(id);
            setEditValue(title);
          }
        }}
      >
        ✎
      </button>
      <button className={styles.deleteButton} onClick={deleteTodo}>
        ✕
      </button>
    </div>
  );
};

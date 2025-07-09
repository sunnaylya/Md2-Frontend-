import { useState, useEffect } from "react";

export const useRequestGetToDoList = () => {
  const [toDoList, setToDoList] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => {
        setToDoList(data);
      });
  }, []);
  return { toDoList, setToDoList };
};

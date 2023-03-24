import React, { useState } from "react";
import { db } from "../config/firebase";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";

const Todo = ({ todo, getTodoList }) => {
  const [input, setInput] = useState(todo.title);
  const [inputMode, setInputMode] = useState(false);
  const handleInput = () => {
    setInputMode(true);
  };
  const toggleComplete = async (id, completed) => {
    try {
      const todoDoc = doc(db, "todos", id);
      await updateDoc(todoDoc, { completed: !completed });
      getTodoList();
    } catch (error) {
      console.error(error);
    }
  };
  const deleteTodo = async (id) => {
    try {
      const todoDoc = doc(db, "todos", id);
      await deleteDoc(todoDoc);
      getTodoList();
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdate = async (id) => {
    try {
      const todoDoc = doc(db, "todos", id);
      await updateDoc(todoDoc, { title: input });
      getTodoList();
      setInputMode(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleBlur = () => {
    setInputMode(false);
  };

  return (
    <div className="todo">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id, todo.completed)}
      />
      {inputMode ? (
        <input
          maxLength={20}
          defaultValue={todo.title}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleUpdate(todo.id);
            }
          }}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <div
          className="title"
          onClick={() => handleInput(todo.id)}
          style={{
            textDecoration: todo.completed ? "line-through" : "none",
          }}
        >
          {todo.title}
        </div>
      )}

      <button onClick={() => deleteTodo(todo.id)}>x</button>
    </div>
  );
};
export default Todo;

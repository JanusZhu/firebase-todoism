import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { auth, googleProvider } from "../config/firebase";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { signInWithPopup, signOut } from "firebase/auth";
import Todo from "./Todo";

const TodoList = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const todosCollectionRef = collection(db, "todos");
  const getCurrentUser = () => {
    if (auth.currentUser) {
      setUserName(auth.currentUser.displayName);
      setLoggedIn(true);
    }
    console.log(auth.currentUser);
  };
  const getTodoList = async () => {
    try {
      const data = await getDocs(todosCollectionRef);
      const filteredData = data.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .sort((task1, task2) => task2.timestamp - task1.timestamp);
      console.log(filteredData);
      setTodos(filteredData);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getTodoList();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      await addDoc(todosCollectionRef, {
        title: input,
        completed: false,
        timestamp: new Date(),
      });
      getTodoList();
    } catch (error) {
      console.error(error);
    }
    setInput("");
  };
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      getCurrentUser();
    } catch (error) {
      console.error(error);
    }
  };
  const logOut = async () => {
    try {
      await signOut(auth);
      setLoggedIn(false);
      getCurrentUser();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="welcome">
        <p>Welcome back {loggedIn ? userName : ""}!</p>{" "}
        {loggedIn ? (
          <button onClick={logOut}>LogOut</button>
        ) : (
          <button onClick={signInWithGoogle}>LogIn</button>
        )}
      </div>
      <h1>Todoism</h1>
      <form
        onSubmit={(e) => {
          if (input) {
            addTodo(e);
          }
        }}
      >
        <input
          maxLength={20}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>

      {loading ? (
        <h1>Loading</h1>
      ) : (
        <ul style={{ listStyleType: "none" }}>
          {todos.map((todo) => (
            <li key={todo.id}>
              <Todo todo={todo} getTodoList={getTodoList} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;

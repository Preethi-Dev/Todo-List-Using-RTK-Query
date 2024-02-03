import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { nanoid } from "@reduxjs/toolkit";
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "../api/apiSlice";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");

  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();

  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    //addTodo
    addTodo({
      id: Math.floor(Math.random() * 100 + 1500).toString(),
      title: newTodo,
      completed: false,
    });
    setNewTodo("");
  };

  const newItemSection = (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 self-center">
      <label htmlFor="new-todo" className="w-full text-gray-600">
        Enter a new todo item
      </label>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
          className="new-todo border px-4 py-2 rounded-xl w-96"
        />
      </div>
      <div>
        <button className="border px-4 py-2 rounded-xl bg-orange-200">
          <FontAwesomeIcon icon={faUpload} />
        </button>
      </div>
    </form>
  );

  let content;

  if (isLoading) {
    content = <h1>Loading...</h1>;
  } else if (isSuccess) {
    content = (
      <div className=" ">
        {todos.map((todo) => (
          <article
            key={todo.id}
            className="flex border px-4 py-2 my-4 rounded-md"
          >
            <div className="todo flex gap-4 items-center ">
              <input
                type="checkbox"
                onChange={(e) => {
                  updateTodo({ ...todo, completed: !todo.completed });
                }}
                checked={todo.completed}
                id={todo.id}
              />
              <label htmlFor={todo.id}>{todo.title}</label>
            </div>
            <button
              className="ml-auto"
              onClick={() => {
                deleteTodo({ id: todo.id });
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </article>
        ))}
      </div>
    );
  } else if (isError) {
    content = <p>{error}</p>;
  }
  // Define conditional content

  return (
    <main className="h-screen flex flex-col m-60 ">
      {newItemSection}
      {content}
    </main>
  );
};

export default TodoList;

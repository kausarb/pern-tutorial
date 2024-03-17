import React, { useEffect, useState } from "react";
import EditTodo from "./EditTodo";
import axios from "axios";
import DeleteTodoConfirm from "./DeleteTodoConfirm";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/todos");
      if (response.status === 200) {
        setTodos(response.data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleTodoDeleted = (deletedTodoId) => {
    const updatedTodos = todos.filter((todo) => todo.todo_id !== deletedTodoId);
    setTodos(updatedTodos);
  };

  // const handleTodoEdited = () => {
  //   getTodos();
  // };

  useEffect(() => {
    getTodos();
  }, [todos]);

  return (
    <>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos && todos.length > 0 ? (
            todos.map((item) => (
              <tr key={item.todo_id}>
                <td>{item.description}</td>
                <td>
                  <EditTodo todo={item} />
                </td>
                <td>
                  <DeleteTodoConfirm
                    item={item}
                    handleTodoDeleted={handleTodoDeleted}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="center-text" colSpan={4}>
                No item available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default ListTodos;

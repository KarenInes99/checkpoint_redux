import React, { useState } from "react";

const List = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState("");
  const [filter, setFilter] = useState("all");

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { text: newTodo.trim(), checked: false }]);
      setNewTodo("");
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    if (editIndex === index) {
      setEditIndex(-1);
      setEditValue("");
    }
  };

  const handleToggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].checked = !newTodos[index].checked;
    setTodos(newTodos);
  };

  const handleEditTodo = (index) => {
    setEditIndex(index);
    setEditValue(todos[index].text);
  };

  const handleSaveEdit = () => {
    if (editValue.trim() !== "") {
      const newTodos = [...todos];
      newTodos[editIndex].text = editValue.trim();
      setTodos(newTodos);
      setEditIndex(-1);
      setEditValue("");
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "done") return todo.checked;
    if (filter === "undone") return !todo.checked;
    return true;
  });

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Ajouter</button>
      <div>
        <button onClick={() => setFilter("all")}>Toutes</button>
        <button onClick={() => setFilter("done")}>Faites</button>
        <button onClick={() => setFilter("undone")}>Non faites</button>
      </div>
      <ul>
        {filteredTodos.map((todo, index) => (
          <li key={index}>
            {editIndex === index ? (
              <div>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={handleSaveEdit}>Enregistrer</button>
              </div>
            ) : (
              <div>
                <span
                  style={{
                    marginRight: "10px",
                    textDecoration: todo.checked ? "line-through" : "none",
                  }}
                >
                  {todo.text}
                </span>
                <button onClick={() => handleEditTodo(index)}>Modifier</button>
                <button onClick={() => handleDeleteTodo(index)}>Supprimer</button>
                <input
                  type="checkbox"
                  checked={todo.checked}
                  onChange={() => handleToggleTodo(index)}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;

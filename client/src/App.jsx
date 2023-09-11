import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      //Fetching code here to set our todos
      const response = await fetch("http://localhost:3000/api/v1/todos");
      const data = await response.json();
      setTodos(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-green-500 font-semibold text-2xl mt-4 mb-3">
          To-do list
        </h1>
        <input
          type="text"
          placeholder="Enter todo"
          className="bg-slate-500 text-white font-bold placeholder:text-green-200 border-2 rounded-xl p-2 border-solid border-black"
        />
        <button type="button" className="font-bold ml-1 bg-slate-500 rounded-lg p-2 text-white">Add</button>
        <ul className="mt-2">
          {todos.length == 0 ? <h1>Nothing found yet</h1> : todos.map((todo, i) => (
            <li key={i}>
              <input type="checkbox" />Id-{todo.id} {todo.task}
              <button type="button" className="ml-2">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;

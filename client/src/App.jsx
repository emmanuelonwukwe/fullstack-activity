import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [taskToUpdate, setTaskToUpdate] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Fetching code here to set our todos
        const response = await fetch("http://localhost:3000/api/todos");
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.log("Error occured: " + error);
      }
    };

    fetchData();
  }, []);

  // This function fetches the todos from the backend
  const fetchAndSetTodos = async () => {
    //Fetching code here to set our todos
    const response = await fetch("http://localhost:3000/api/todos");
    const data = await response.json();
    setTodos(data);
  };

  // This function helps to add the todo task to the list of todos
  const handleAddTodoSubmit = async (event) => {
    event.preventDefault();

    if (task == "") {
      throw new Error("Sorry, you can not create empty todo");
    }

    try {
      const response = await fetch("http://localhost:3000/api/todos2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: task,
          is_completed: false,
        }),
      });

      // get response in json
      const data = await response.json();

      // Set the todos after it had been returned
      setTodos((oldTodos) => [...oldTodos, ...data]);
      //console.log(data);
      // setting data
    } catch (error) {
      console.log("Adding to todo error occured: " + error);
    }
  };

  // This function helps to add the todo task to the list of todos
  const handleTodoDelete = async (todoId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/todos/delete/${todoId}`,
        {
          method: "DELETE",
        }
      );

      if (response) {
        // Set fetch and set the remaining todos
        fetchAndSetTodos();
      }
    } catch (error) {
      console.log("Adding to todo error occured: " + error);
    }
  };

  // This opens the modal
  const openModal = () => {
    document.getElementById("popup-modal").classList.remove("hidden");
    document.getElementById("popup-modal").classList.add("block");
  }

  // This closes the modal
  const closeModal = () => {
    document.getElementById("popup-modal").classList.remove("block");
    document.getElementById("popup-modal").classList.add("hidden");
  }

  return (
    <>
      <div>
        <h1 className="text-green-500 font-semibold text-2xl mt-4 mb-3">
          To-do list
        </h1>
        <form onSubmit={handleAddTodoSubmit}>
          <input
            type="text"
            placeholder="Enter todo"
            onChange={(event) => setTask(event.target.value)}
            value={task}
            className="bg-slate-500 text-white font-bold placeholder:text-green-200 border-2 rounded-xl p-2 border-solid border-black"
          />
          <button
            type="submit"
            className="font-bold ml-1 bg-slate-500 rounded-lg p-2 text-white"
          >
            Add
          </button>
        </form>

        <ul className="mt-2">
          {todos.length > 0 ? (
            todos.map((todo, i) => (
              <li key={i} className="m-2 p-2 border border-t-2">
                <input type="checkbox" className="mr-1" />
                <span>
                  Id-{todo.id} {todo.task}
                </span>
                <button
                  onClick={() => {
                    openModal();
                  }}
                  type="button"
                  className="ml-2 font-bold  bg-blue-500 rounded-lg p-2 text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleTodoDelete(todo.id)}
                  type="button"
                  className="ml-2 font-bold  bg-red-500 rounded-lg p-2 text-white"
                >
                  Delete
                </button>
              </li>
            ))
          ) : (
            <h1>Nothing found yet</h1>
          )}
        </ul>
        <div
          id="popup-modal"
         
          className="fixed w-full h-full top-0 z-50 hidden bg-black"
        >
          <div className="relative left-0 top-6 max-w-md md:left-[25%]">
            <div className="bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                onClick={() => {
                  closeModal();
                }}
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="popup-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to edit this product id-{taskToUpdate.id}?
                </h3>
                <form onSubmit={handleAddTodoSubmit}>
          <input
            type="text"
            placeholder="Enter todo"
            onChange={(event) => setTask(event.target.value)}
            value={task}
            className="bg-slate-500 text-white font-bold placeholder:text-green-200 border-2 rounded-xl p-2 border-solid border-black"
          />
          <select name="is_completed" className="ml-2">
            <option value={false}>False</option>
            <option value={true}>True</option>
          </select>
          <button
            type="submit"
            className="block mt-3 ml-8 font-bold bg-slate-500 rounded-lg p-2 text-white"
          >
            Update
          </button>
        </form>
                <button
                onClick={() => {
                  closeModal();
                }}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

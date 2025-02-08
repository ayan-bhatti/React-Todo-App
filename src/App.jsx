import { useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import Modal from "./Modal";

function App() {
  const [todos, setTodos] = useState([]);
  const [editData, setEditData] = useState({});
  const modalref = useRef(null);

  const openModal = () => modalref.current.showModal();

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");

    if (name) {
      const payload = {
        id: uuid(),
        name,
      };
      setTodos((prevTodos) => [...prevTodos, payload]);
    }
    e.target.reset();
  }
  function handleDelete(id) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }
  return (
    <>
      <div>
        <h1 className="text-4xl font-bold text-center my-7 text-red-600">
          " TODO "
        </h1>
      </div>
      <form
        className="flex justify-center items-center space-x-3"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          placeholder="Enter Your ToDo"
          className="input input-bordered input-error w-full max-w-xs my-3"
        />

        <button className="btn btn-outline btn-error gap-5" type="submit">
          Add
        </button>
      </form>

      <ul className="flex flex-col justify-center items-center space-x-3 mx-3.5">
        {todos.map((item) => (
          <li key={item.id} className="my-1">
            {item.name}
            <button
              onClick={() => handleDelete(item.id)}
              className="btn btn-xs btn-error mx-2"
            >
              delete
            </button>

            <button
              className="btn btn-xs btn-warning mx-0.5"
              onClick={() => {
                setEditData(item);
                openModal();
              }}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
      <Modal
        ref={modalref}
        editData={editData}
        todos={todos}
        setTodos={setTodos}
      />
    </>
  );
}

export default App;

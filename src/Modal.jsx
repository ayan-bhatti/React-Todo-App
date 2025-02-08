import { forwardRef } from "react";
const Modal = forwardRef(({ editData, todos, setTodos }, ref) => {
  const closeModal = () => ref.current.close();

  function handleEdit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("edit");

    const payload = {
      id: editData.id,
      name,
    };

    const editedData = todos.map((val) => {
      if (val.id === editData.id) {
        return payload;
      } else {
        return val;
      }
    });
    setTodos(editedData);
    e.target.reset();
    console.log(payload);
  }

  return (
    <dialog ref={ref} className="modal">
      <div className="modal-box min-w-[22vw] shadow-md outline shadow-slate-100">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={closeModal}
        >
          ✕
        </button>

        <h1 className="font-bold text-3xl mb-5 text-red-600 text-center">
          Edit Todos!
        </h1>
        <form
          className="flex gap-4  flex-row items-center justify-center"
          onSubmit={handleEdit}
        >
          <input
            defaultValue={editData.name}
            type="text"
            placeholder="Edit Your Todos"
            name="edit"
            className="input input-bordered input-info w-full max-w-xs"
          />
          <button
            className="btn btn-outline btn-primary btn-wide"
            type="submit"
            onClick={closeModal}
          >
            Add
          </button>
        </form>
      </div>
    </dialog>
  );
});

export default Modal;

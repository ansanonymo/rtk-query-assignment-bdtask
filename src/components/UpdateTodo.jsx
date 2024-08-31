import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useUpdateTodoMutation } from "../service/redux/apiQuries/todoApi";
import toast from "react-hot-toast";

function UpdateTodo({ onClose, todo }) {
  const [task, setTask] = useState(todo?.task ?? "");
  const [isComplete, setIsComplete] = useState(todo?.isComplete ?? false);
  const [updateTodo, { isError, isSuccess, error }] = useUpdateTodoMutation();

  const handleUpdate = () => {
    const data = {
      id: todo?.id,
      body: { task, isComplete },
    };

    updateTodo(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Todo is Updated.");
      onClose();
    }

    if (isError) {
      toast.error("Something went wrong : " + error?.data);
    }
  }, [isError, isSuccess, onClose, error]);

  return (
    <div>
      <div className="flex flex-col my-3">
        <label className="text-[14]">Todo Name</label>
        <input
          value={task}
          name="task"
          onChange={(e) => setTask(e.target.value)}
          type="text"
          placeholder="Todo Name"
          className="border outline-none h-[40px] px-2 text-[14px]"
        />
      </div>

      <div className="flex flex-wrap gap-2 items-center my-3">
        <input
          checked={isComplete}
          name="isComplete"
          onChange={(e) => setIsComplete(e.target.checked)}
          type="checkbox"
          id="is-complete"
        />
        <label
          htmlFor="is-complete"
          className="text-[14] select-none cursor-pointer"
        >
          Completed
        </label>
      </div>

      <div className="flex gap-2 flex-wrap my-2">
        <button
          className="py-2 px-3 text-white flex items-center gap-1 bg-rose-600"
          onClick={onClose}
        >
          <IoMdClose className="text-xl" />
          Cancel
        </button>
        <button
          onClick={handleUpdate}
          className="py-2 px-3 text-white flex items-center gap-1 bg-emerald-600"
        >
          <FaCheck className="text-xl" /> Update
        </button>
      </div>
    </div>
  );
}

export default UpdateTodo;

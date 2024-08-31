import { MdOutlineAddCircleOutline } from "react-icons/md";
import { useAddTodoMutation } from "../service/redux/apiQuries/todoApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function AddTodo() {
  const [task, setTask] = useState("");
  const [addTodo, { isSuccess, isError, data: responseData }] =
    useAddTodoMutation();

  const handleAdd = () => {
    const taskData = {
      task,
      isComplete: false,
    };

    addTodo(taskData);
  };

  useEffect(() => {
    if (isSuccess) {
      setTask("");
      toast.success("To add Successfully. Todo id is : " + responseData?.id);
    }

    if (isError) {
      toast.error("Something went wrong.");
    }
  }, [isSuccess, responseData, isError]);

  return (
    <div className="wi-full">
      <h3 className="text-[22px] font-bold flex items-center gap-2 mt-3 text-[#333333]">
        <MdOutlineAddCircleOutline />
        Add User
      </h3>

      <div className="w-full mt-2">
        <div className="flex flex-col mb-3 gap-1">
          <label className="text-[14] font-bold text-[#444444]">Task</label>
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            name="task"
            type="text"
            placeholder="User name"
            className="border outline-none h-[40px] px-2 text-[14px]"
          />
        </div>
      </div>
      <button className="bg-green-700 text-white py-2 px-6" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

export default AddTodo;

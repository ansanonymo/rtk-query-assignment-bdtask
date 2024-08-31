import { CiBoxList } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import {
  useCompleteTodoMutation,
  useDeleteTodoMutation,
  useGetAllTodoQuery,
} from "../service/redux/apiQuries/todoApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UpdateTodo from "./UpdateTodo";

function TodoList() {
  const [updateTodo, setUpdateTodo] = useState(null);

  const { data: allTodo, isLoading, isError } = useGetAllTodoQuery();
  const [
    deleteTodo,
    { isSuccess: isDeleteSuccess, isError: isDeleteError, data: deleteData },
  ] = useDeleteTodoMutation();

  const [completeTodo, { isError: isCompleteError, error: completeError }] =
    useCompleteTodoMutation();

  const handleDelete = (todo) => {
    if (window.confirm("Do you want to delete : '" + todo?.task + "'")) {
      deleteTodo(todo?.id);
    }
  };

  const handleComplete = (todo) => {
    completeTodo(todo?.id);
  };

  useEffect(() => {
    if (isDeleteSuccess) {
      toast.success("Successfully delete task : " + deleteData?.task);
    }

    if (isDeleteError) {
      toast.error("Something went wrong.");
    }
  }, [isDeleteSuccess, isDeleteError, deleteData]);

  useEffect(() => {
    if (isCompleteError) {
      toast.error("Seomthing went wrong : " + completeError?.data);
    }
  }, [isCompleteError, completeError]);

  return (
    <div className="h-full overflow-y-hidden flex flex-col">
      <h2 className="flex flex-wrap gap-2 text-2xl items-center my-3">
        <CiBoxList /> {updateTodo ? "Edit Todo" : "All Todo"}
      </h2>

      {updateTodo ? (
        <UpdateTodo onClose={() => setUpdateTodo(null)} todo={updateTodo} />
      ) : (
        <div>
          {isError ? (
            <h1 className="text-rose-700 text-center py-2 text-xl">
              Something went wrong.
            </h1>
          ) : null}

          {isLoading ? <Loader /> : null}
          <ul className="flex flex-col gap-2 overflow-y-scroll">
            {allTodo?.map((todo) => {
              return (
                <Li
                  handleDelete={() => handleDelete(todo)}
                  handleComplete={() => handleComplete(todo)}
                  handleEdit={() => setUpdateTodo(todo)}
                  taskName={todo?.task}
                  isComplete={todo?.isComplete}
                  key={todo?.id}
                />
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

function Li({
  taskName = "task name",
  isComplete = false,
  handleDelete,
  handleComplete,
  handleEdit,
}) {
  return (
    <li className="border py-2 px-3 flex flex-wrap items-center justify-between">
      <span className={`${isComplete ? "line-through" : ""} text-[#333333]`}>
        {taskName}
      </span>

      <div className="flex items-center flex-wrap text-xl gap-1">
        {isComplete ? null : (
          <button className="text-green-600" onClick={handleComplete}>
            <FaCheck />
          </button>
        )}

        <button onClick={handleEdit} className="text-sky-600">
          <FaRegEdit />
        </button>

        <button className="text-rose-600" onClick={handleDelete}>
          <RiDeleteBin6Line />
        </button>
      </div>
    </li>
  );
}

function Loader() {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
export default TodoList;

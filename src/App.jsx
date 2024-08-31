/* eslint-disable react/prop-types */
import { IoMdAdd } from "react-icons/io";
import { CiBoxList } from "react-icons/ci";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import { useState } from "react";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import { Toaster } from "react-hot-toast";

function App() {
  const [statusMenu, setStatusMenu] = useState("addUser");

  let content = null;

  if (statusMenu === "addUser") {
    content = <AddUser />;
  } else if (statusMenu === "listUser") {
    content = <UserList />;
  } else if (statusMenu === "todoList") {
    content = <TodoList />;
  } else if (statusMenu === "addTodo") {
    content = <AddTodo />;
  }

  return (
    <>
      <div className="bg-gray-200 w-full h-screen flex justify-center items-center">
        <div className="bg-white w-[550px] h-[600px] rounded-lg p-4 overflow-hidden">
          {/* menu  */}
          <div className="flex items-center gap-2">
            <Button
              statusMenu={statusMenu}
              handleClick={() => setStatusMenu("addUser")}
              menuName={"addUser"}
            >
              <IoMdAdd /> Add
            </Button>

            <Button
              statusMenu={statusMenu}
              handleClick={() => setStatusMenu("listUser")}
              menuName={"listUser"}
            >
              <CiBoxList /> List
            </Button>

            <Button
              statusMenu={statusMenu}
              handleClick={() => setStatusMenu("todoList")}
              menuName={"todoList"}
            >
              <CiBoxList /> Todos
            </Button>

            <Button
              statusMenu={statusMenu}
              handleClick={() => setStatusMenu("addTodo")}
              menuName={"addTodo"}
            >
              <IoMdAdd /> Add Todo
            </Button>
          </div>

          {content}
        </div>
      </div>
      <Toaster position="top-center" />
    </>
  );
}

function Button({ handleClick, menuName, statusMenu, children }) {
  return (
    <button
      onClick={handleClick}
      className={`${
        statusMenu == menuName ? "bg-lime-600" : "bg-slate-600"
      } bg-lime-600 text-white py-2 px-3 flex items-center gap-2`}
    >
      {children}
    </button>
  );
}

export default App;

import { useEffect, useState } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { useUpdateUserMutation } from "../service/redux/apiQuries/UserApi";

const UpdateUser = ({ singleUser, options }) => {
  const { setUpdateUserId, setUpdateStatus } = options;
  const [updateUserById] = useUpdateUserMutation();

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    address: "",
    password: "",
  });

  const stateHandler = (e) => {
    const { name, value } = e.target;

    setUserInfo({ ...userInfo, [name]: value });
  };

  useEffect(() => {
    setUserInfo({
      username: singleUser?.username,
      email: singleUser?.email,
      address: singleUser?.address,
      password: singleUser?.password,
    });
  }, [singleUser]);

  const updateUser = () => {
    updateUserById({ ...userInfo, id: singleUser?.id });
    setUpdateUserId(null);
    setUpdateStatus(false);
  };
  return (
    <div>
      <h3 className="text-[22px] font-bold flex items-center gap-2 mt-2">
        <IoMdPersonAdd />
        Update User
      </h3>

      <div className="w-full mt-2">
        <div className="flex flex-col mb-3">
          <label className="text-[14] font-bold">User name</label>
          <input
            value={userInfo.username}
            name="username"
            onChange={stateHandler}
            type="text"
            placeholder="User name"
            className="border outline-none h-[40px] px-2 text-[14px]"
          />
        </div>

        <div className="flex flex-col mb-3">
          <label className="text-[14] font-bold">Email Address</label>
          <input
            value={userInfo.email}
            name="email"
            onChange={stateHandler}
            type="email"
            placeholder="Email Address"
            className="border outline-none h-[40px] px-2 text-[14px]"
          />
        </div>

        <div className="flex flex-col mb-3">
          <label className="text-[14] font-bold">Address</label>
          <textarea
            value={userInfo.address}
            name="address"
            onChange={stateHandler}
            className="border outline-none px-2"
            placeholder="Address... "
          ></textarea>
        </div>

        <div className="flex flex-col mb-3">
          <label className="text-[14] font-bold">Password</label>
          <input
            value={userInfo.password}
            name="password"
            onChange={stateHandler}
            type="password"
            placeholder="****"
            className="border outline-none h-[40px] px-2 text-[14px]"
          />
        </div>
      </div>
      <button
        onClick={updateUser}
        className="bg-green-700 text-white py-2 px-6"
      >
        Update
      </button>
    </div>
  );
};

export default UpdateUser;

import { useEffect, useState } from "react";
import { CiBoxList } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import {
  useDeleteUserMutation,
  useGetSingleUserQuery,
  useGetUserQuery,
  useLazyGetSingleUserQuery,
} from "../service/redux/apiQuries/UserApi";
import UpdateUser from "./UpdateUser";

const UserList = () => {
  const [updatedUserId, setUpdateUserId] = useState(null);

  const { data } = useGetUserQuery();
  // eslint-disable-next-line no-unused-vars
  const { data: singleUser } = useGetSingleUserQuery(updatedUserId);
  const [getSingleUserLazy] = useLazyGetSingleUserQuery();
  const [updateStatus, setUpdateStatus] = useState(false);

  const [singleUserInfo, setSingleUseInfo] = useState(null);

  const [deleteUserById] = useDeleteUserMutation();

  const deleteUser = (id) => {
    deleteUserById(id);
  };

  const options = {
    setUpdateUserId,
    setUpdateStatus,
  };

  useEffect(() => {
    if (updatedUserId != null) {
      getSingleUserLazy(updatedUserId)
        .unwrap()
        .then((res) => {
          setSingleUseInfo(res);
        })
        .catch((err) => console.log(err));
    }
  }, [updatedUserId, getSingleUserLazy]);

  return (
    <div className="w-full mt-2">
      {updateStatus ? (
        <>
          <UpdateUser singleUser={singleUserInfo} options={options} />
        </>
      ) : (
        <>
          <h3 className="flex items-center gap-2 text-[22px] font-bold">
            {" "}
            <CiBoxList />
            User List
          </h3>

          <div className="w-full mt-2">
            {data?.map((item) => (
              <div
                key={item.id}
                className="h-[50px] mb-2 w-full border px-2 flex items-center justify-between"
              >
                <span className="text-sm  font-bold ">{item?.username}</span>
                <div className="flex gap-3 items-center">
                  <FaRegTrashAlt
                    onClick={() => deleteUser(item?.id)}
                    className="text-red-700 cursor-pointer text-[22px]"
                  />
                  <FaEdit
                    onClick={() => {
                      setUpdateStatus(true);
                      setUpdateUserId(item?.id);
                    }}
                    className="text-blue-600 cursor-pointer text-[22px]"
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserList;

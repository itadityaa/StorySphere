import React from "react";
import {
  useDeleteUserMutation,
  useGetUserQuery,
} from "../../../redux/features/auth/authAPI";
import { MdModeEditOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import UserModal from "./UserModal";

const ManageUser = () => {
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { data, error, isLoading, refetch } = useGetUserQuery();

  const [deleteUser] = useDeleteUserMutation();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await deleteUser(id).unwrap();
      alert("User deleted successfully");
      refetch();
    } catch (error) {
      console.error("Failed to delete the user:");
      console.log(error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      {isLoading && (
        <div className="text-center text-xl text-accentSecondary font-medium">
          Loading...
        </div>
      )}

      <section className="py-2 bg-blueGray-50">
        <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-1 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700 w-full mx-auto">
                    All Users
                  </h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right"></div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      No.
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Email
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Role
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Manage
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Delete
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data?.users &&
                    data?.users.map((user, index) => (
                      <tr key={index}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          {index + 1}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          {user.email}
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <span
                            className={`rounded-full py-1 ${
                              user?.role === "admin"
                                ? "bg-accentSecondary px-2"
                                : "bg-adminC2b px-4"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <button
                            onClick={() => handleEdit(user)}
                            className="hover:text-accentSecondary"
                          >
                            <span className="flex gap-1 items-center">
                              <MdModeEditOutline /> Edit
                            </span>
                          </button>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <button
                            onClick={() => handleDelete(user?._id)}
                            className="hover:bg-accentSecondary hover:text-accentPrimary px-2 py-1 rounded-md shadow-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <footer className="mx-auto px-4">
          <div className="text-accentPrimary w-full md:w-6/12 px-4 mx-auto text-center">
            <a
              href="https://github.com/itadityaa"
              className="text-blueGray-500 hover:text-accentSecondary"
              target="_blank"
            >
              iKaminari
            </a>
          </div>
        </footer>
      </section>

      {isModalOpen && (
        <UserModal
          user={selectedUser}
          onRoleUpdate={refetch}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default ManageUser;

import React from "react";
import { useUpdateUserMutation } from "../../../redux/features/auth/authAPI";

const UserModal = (params) => {
  const user = params?.user;
  const [role, setRole] = React.useState(user?.role);

  const [updateUserRole] = useUpdateUserMutation();

  const handleUpdateRole = async () => {
    try {
      await updateUserRole({ userId: user?._id, role }).unwrap();
      alert("Role Updated");
      params.onRoleUpdate();
      params.onClose();
    } catch (error) {
      console.error("Failed to update user role", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-bgSecondary bg-opacity-50 text-accentPrimary">
      <div className="bg-bgPrimary p-4 rounded shadow-lg w-1/3">
        <h2 className="text-xl text-accentPrimary text-center m-2">
          Edit User Role
        </h2>
        <div className="mb-4 space-y-4">
          <label className="w-full mx-auto">Email:</label>
          <input
            type="email"
            placeholder={user.email}
            value={user.email}
            className="bg-bgSecondary block m-2 shadow-sm sm:text-sm border-adminC2b rounded-md py-2 px-4 
            focus:outline-none text-accentSecondary w-full"
            readOnly
          />
        </div>
        <div className="mb-4 space-y-4">
          <label className="w-full mx-auto">Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-bgSecondary block m-2 shadow-sm sm:text-sm border-adminC2b rounded-md py-2 px-4 
            focus:outline-none text-accentSecondary w-full"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="flex justify-end mx-4 space-x-2">
          <button className="button-utility-class" onClick={params.onClose}>
            Cancel
          </button>
          <button className="button-utility-class" onClick={handleUpdateRole}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;

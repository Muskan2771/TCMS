import React from "react";
import { RxCross2 } from "react-icons/rx";
import { Button, Input } from "../../../components";
import { useRole } from "../../../context/roleContext/RoleContextProvider";

const CreateRole = ({ clickRoleShow }) => {
  const { roles, setRoles, createRole, error } = useRole();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoles((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createRole(roles, clickRoleShow);
  };
  return (
    <form
      className="m-10 bg-slate-50 rounded-2xl p-5"
      onSubmit={handleSubmit} // Use onSubmit instead of onClick
    >
      <div className="font-600 text-2xl flex justify-between">
        <div>Create Role</div>
        <div onClick={clickRoleShow} className="hover:cursor-pointer">
          <RxCross2 className="hover:rotate-12" />
        </div>
      </div>
      <div className="flex flex-col items-center grid-cols-1">
        <div className="w-96">
          <Input
            label="Role"
            name="role"
            type="text"
            value={roles?.role}
            onChange={handleChange}
            error={error?.role}
            required
            placeholder="Role"
          />
        </div>
        <div className="flex gap-5 mt-5">
          <Button className="secondary" onClick={clickRoleShow}>
            Cancel
          </Button>
          <Button
            type="submit" // This button submits the form
            className="px-4 py-2 bg-yellow-500 text-white rounded-3xl"
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreateRole;

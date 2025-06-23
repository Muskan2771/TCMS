import React, { useState } from "react";
import { Button, Container } from "../../../components";
import ManageAccess from "./ManageAccess";
import RolesView from "./RolesView";
import { IoMdAdd } from "react-icons/io";
import { useRole } from "../../../context/roleContext/RoleContextProvider";
import CreateRole from "./CreateRole";

const AccessPrivilegeView = () => {
  const [showRole, setshowRole] = useState(false);
  const { clearFormData } = useRole();

  const clickRoleShow = () => {
    setshowRole(!showRole);
    if (showRole == true) {
      clearFormData();
    }
  };
  return (
    <Container title="Role And Permission">
      <div className="lg:flex justify-end mx-5 lg:gap-5 gap-2 mt-3 ">
        <div className="lg:mt-0 flex justify-center mt-2">
          <Button onClick={clickRoleShow}>
            <div>Add Role</div>
            <div>
              <IoMdAdd />
            </div>
          </Button>
        </div>
      </div>
      {showRole && <CreateRole clickRoleShow={clickRoleShow} />}
      <RolesView />
    </Container>
  );
};

export default AccessPrivilegeView;

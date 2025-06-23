import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Dropdown } from "../../components";
import UsersTable from "./UserTable";
import { SearchInput } from "../../components";
import { IoMdAdd } from "react-icons/io";
import {
  ModalProvider,
  useModal,
} from "../../components/common/modal/ModalContext";
import UserRegistrationModal from "./UserRegistrationModal";
import UserContext from "../../context/userContext/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import RoleContext from "../../context/roleContext/RoleContext";

const ManageUsers = () => {
  const { openModal, closeModal, isModalOpen } = useModal();

  const pathName = useLocation().pathname;

  const { setSearchTerm, getAllUsers, clearFormData } = useContext(UserContext);
  const { getRoles, roles, getDepartment, department } =
    useContext(RoleContext);
  const [roleOptions, setRoleOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);

  const handleOpenModal = () => {
    clearFormData();
    openModal(
      <UserRegistrationModal closeModal={closeModal} />,
      "Register User"
    );
  };

  const nav = useNavigate();
  useEffect(() => {
    if (!isModalOpen) {
      nav("/manageuser");
    }
  }, [isModalOpen]);

  // Function to set role options for the dropdown
  function setDropDown() {
    if (roles && roles.length > 0) {
      setRoleOptions(roles?.map((r) => ({ value: r.role, label: r.role })));
      setDepartmentOptions(
        department?.map((d) => ({
          value: d.departmentName,
          label: d.departmentName,
        }))
      );
    }
  }
  useEffect(() => {
    getRoles(); // Fetch roles on component mount
    // getDepartment(); // Fetch departments on component mount`
    getAllUsers();
    setSearchTerm("");
  }, []);

  useEffect(() => {
    if (pathName === "/invite-user") {
      handleOpenModal();
    }
  }, [pathName]);

  useEffect(() => {
    setDropDown();
  }, [roles, department]);

  return (
    <Container title="Users">
      <div className="lg:flex justify-end mx-5 lg:gap-5 gap-2 mt-3 ">
        <SearchInput onChange={(e) => setSearchTerm(e.target.value)} />
        <div className="lg:mt-0 flex justify-center mt-2">
          <Button onClick={handleOpenModal}>
            <div>Add New User</div>
            <div>
              <IoMdAdd />
            </div>
          </Button>
        </div>
      </div>
      <UsersTable />
    </Container>
  );
};

const App = () => (
  <ModalProvider>
    <ManageUsers title="Register User" />
  </ModalProvider>
);

export default App;

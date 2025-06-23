import React, { useContext, useEffect, useState } from 'react';
import { Button, Dropdown, Input } from '../../components';
import UserContext from '../../context/userContext/UserContext';
import RoleContext from '../../context/roleContext/RoleContext';

const UserRegistrationModal = ({ closeModal, data }) => {
  const {
    user,
    setUser,
    inviteUser,
    error,
    checkEmailExist,
    setError,
    updateUser,
  } = useContext(UserContext);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  const { roleRes, department } = useContext(RoleContext);
  const [roleOptions, setRoleOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);

  // Function to set role options for the dropdown
  function setDropDown() {
    if (roleRes && roleRes.length > 0) {
      setRoleOptions(roleRes?.map((r) => ({ value: r.role, label: r.role })));
      setDepartmentOptions(
        department?.map((d) => ({
          value: d.departmentName,
          label: d.departmentName,
        })),
      );
    }
  }

  useEffect(() => {
    if (user?.userType === false) {
      setUser((prevUser) => ({
        ...prevUser,
        department: null,
        salesRep: null,
      }));
    }
  }, [user?.userType, setUser]);

  useEffect(() => {
    setDropDown();
  }, [roleRes, department]);

  const userOptions = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ];

  const statusOptions = [
    { label: 'Active', value: true },
    { label: 'Inactive', value: false },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue;
    if (name === 'userType') {
      newValue = value === 'yes';
    } else {
      newValue = value;
    }
    setUser((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleEmailBlur = (event) => {
    event.preventDefault();
    checkEmailExist(user.email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.id === 0) {
      inviteUser(user, e, closeModal);
    } else {
      updateUser(user, e, closeModal);
    }
  };

  return (
    <>
      <form className="" onSubmit={handleSubmit}>
        <div className="lg:grid grid-cols-2 gap-5 items-center lg:w-[600px]">
          <div className="">
            <Input
              name="firstName"
              label="First Name"
              placeholder="Enter First Name"
              value={user.firstName}
              onChange={handleInputChange}
              error={error?.firstName}
              required></Input>
          </div>
          <div>
            <Input
              name="lastName"
              label="Last Name"
              placeholder="Enter Last Name"
              onChange={handleInputChange}
              value={user.lastName}
              error={error?.lastName}
              required></Input>
          </div>
          <div>
            {' '}
            <Input
              name="email"
              type="email"
              value={user.email}
              onChange={handleInputChange}
              onBlur={handleEmailBlur}
              label="Email"
              error={error?.email}
              errType={error?.errType}
              placeholder="Enter Email"
              required
              disabled={user.id !== 0}></Input>
          </div>
          <div>
            <Input
              name="contactNo"
              label="Contact Number"
              placeholder="Enter Contact Number"
              onChange={handleInputChange}
              type="number"
              errType="valid"
              value={user.contactNo}
              error={error?.contactNo}
              required></Input>
          </div>

          <div>
            <Dropdown
              label="Role"
              name="role"
              options={roleOptions}
              value={user.role}
              onChange={handleInputChange}
              required
              error={error?.role}
            />
          </div>
          {/* <div>
            <Dropdown
              label="User Type"
              name="userType"
              options={userOptions}
              value={user?.userType ? 'yes' : 'no'}
              onChange={handleInputChange}
              required
              error={error?.userType}
            />
          </div>
          {user?.id !== 0 && user?.id && (
            <div>
              <Dropdown
                label="Status"
                name="active"
                options={statusOptions}
                value={user.active}
                onChange={(e) =>
                  setUser((prev) => ({
                    ...prev,
                    active: e.target.value === 'true',
                  }))
                }
                required
                error={error?.active}
              />
            </div>
          )} */}
          {/* {user?.userType == true && (
            <>
              <div>
                <Dropdown
                  label="Department"
                  name="department"
                  value={user.department}
                  options={departmentOptions}
                  onChange={handleInputChange}
                  required
                  error={error?.department}
                />
              </div>
              <div>
                <Input
                  name="salesRep"
                  label="Sales Rep"
                  placeholder="Enter Sales Rep  "
                  onChange={handleInputChange}
                  type="number"
                  value={user.salesRep}
                  error={error?.salesRep}
                  required></Input>
              </div>
            </>
          )} */}
        </div>
        <div className="flex justify-start gap-2 mt-10 m-2">
          <Button type="button" className="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="px-4 py-2 bg-yellow-500 text-white rounded-3xl">
            {user.id === 0 ? 'Send Invitation' : 'Update User'}
          </Button>
        </div>
      </form>
    </>
  );
};

export default UserRegistrationModal;

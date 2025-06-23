import React, { useContext, useState } from "react";
import { Button, Input } from "../../components";
import UserContext from "../../context/userContext/UserContext";

const ForgotPassword = ({ closeModal }) => {
  const { forgotPassword, error } = useContext(UserContext);
  const [email, setEmail] = useState("");

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <form className="lg:w-96 w-72" onSubmit={(e) => forgotPassword(e, email)}>
      <div className="w-full p-5">
        <Input
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChange={handleInputChange}
          required
          error={error?.email}
        />
      </div>
      <div className="flex justify-end mt-4">
        <button
          type="button"
          className="mr-2 px-4 py-2 bg-gray-300 rounded-3xl"
          onClick={closeModal}
        >
          Cancel
        </button>
        <Button>Reset Password</Button>
      </div>
    </form>
  );
};

export default ForgotPassword;

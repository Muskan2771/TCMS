import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Input } from "../../components";
import UserContext from "../../context/userContext/UserContext";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const { user, resetUserPassword, error, setUser, verifyForgotPasswordToken } =
    useContext(UserContext);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const hasVerifiedToken = useRef(false);

  useEffect(() => {
    if (token && !hasVerifiedToken.current) {
      hasVerifiedToken.current = true;
      verifyForgotPasswordToken(token);
    }
  }, [token]);

  return (
    <div className="flex lg:flex-row flex-col min-h-screen  bg-[#EE2D24]">
      <div className="lg:basis-1/2 relative ">
        <div className="absolute text-white top-0 left-0 right-0 bottom-0 lg:flex hidden justify-center items-center">
          <img src="images/illustration_2.webp" className="h-[250px]" alt="" />
        </div>
      </div>
      <div
        className="lg:basis-1/2 mt-auto mb-auto lg:w-80 w-full absolute lg:static flex justify-center items-center"
        style={{
          backgroundImage: "url(images/illustration_1.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh", // Full height
          width: "100vw", // Full width
          margin: "",
        }}
      >
        <div className="shadow-2xl rounded-3xl lg:my-10 mt-20 sm:mt-auto sm:mb-auto lg:mx-28 px-8 lg:px-12 py-8 lg:py-16 bg-white">
          <div className="text-lg">Welcome</div>
          <div className="font-500 text-3xl pb-10">Reset Password</div>
          <form
            className=""
            onSubmit={(e) => resetUserPassword(user, e, token)}
          >
            <div className="lg:w-80">
              <Input
                label="Password"
                type="password"
                value={user.password}
                onChange={handleChange}
                name="password"
                placeholder="Enter Your Password"
                error={error?.password}
                // errType="valid"
              ></Input>
            </div>
            <div className="lg:w-80">
              <Input
                label="Confirm Password"
                type="password"
                value={user.confirmPassword}
                onChange={handleChange}
                name="confirmPassword"
                placeholder="Confirm Your Password"
                error={error?.confirmPassword}
                errType="valid"
              ></Input>
            </div>
            <div className="text-red-500 text-sm text-center">
              {/* {error?.message} */}
            </div>
            <div className="flex justify-center mt-8">
              <Button className="primary" style={{ width: "90%" }}>
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

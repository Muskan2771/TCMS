import React, { useContext, useEffect } from 'react';
import { Button, Input } from '../../components';
import AuthContext from '../../context/authContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  ModalProvider,
  useModal,
} from '../../components/common/modal/ModalContext';
import ForgotPasswordModal from '../user-setting/ForgotPassword';

const Login = () => {
  const { userCredential, setUserCredential, handleLogin, isLoggedIn, error } =
    useContext(AuthContext);
  const { openModal, closeModal } = useModal();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserCredential({ ...userCredential, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isLoggedIn) navigate('/');
  }, [isLoggedIn, navigate]);

  const handleForgotPassword = () => {
    openModal(
      <ForgotPasswordModal closeModal={closeModal} />,
      'Forgot Password',
      'isCenter',
    );
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-end pr-16"
      style={{
        backgroundImage: 'url(images/login.jpg)',
      }}
    >
      <div className="bg-black/70 backdrop-blur-[3px] shadow-2xl rounded-3xl p-10 lg:p-16 w-full max-w-md text-white">
        <div className="text-2xl">Welcome</div>
        <div className="font-500 text-5xl pb-10">Sign in</div>
        <form onSubmit={handleLogin}>
          <div className="w-full">
            <Input
              type="email"
              label="Email"
              placeholder="Enter Your Email"
              value={userCredential.email}
              onChange={handleChange}
              name="email"
              error={error?.email}
            />
          </div>
          <div className="w-full mt-4">
            <Input
              label="Password"
              type="password"
              value={userCredential.password}
              onChange={handleChange}
              name="password"
              placeholder="Enter Your Password"
              error={error?.password}
            />
          </div>
          <div className="text-right py-2 text-sky-400 cursor-pointer">
            <span onClick={handleForgotPassword}>Forgot Password?</span>
          </div>
          <div className="text-blue-600 text-sm text-center font-semibold">
            {error?.message}
          </div>
          <div className="flex justify-center mt-8">
            <Button className="primary" style={{ width: '90%' }}>
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const LoginApp = () => (
  <ModalProvider>
    <Login />
  </ModalProvider>
);

export default LoginApp;

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ForgotPassword from "./ForgotPassword";
import UserContext from "../../context/userContext/UserContext";

// Mock context value
const mockContextValue = {
  forgotPassword: jest.fn(), // Mock forgotPassword function
  error: null, // Add other necessary initial values
};

test("updates email state on input change", () => {
  render(
    <UserContext.Provider value={mockContextValue}>
      <ForgotPassword closeModal={() => {}} />
    </UserContext.Provider>
  );

  // Alternative approach if getByLabelText fails
  const emailInput = screen.getByPlaceholderText("Enter your email");
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  expect(emailInput.value).toBe("test@example.com");
});

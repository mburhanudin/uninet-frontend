import { render, act, fireEvent, waitFor } from "@testing-library/react";
import useLogin from "./useLogin";

const { login } = useLogin();

jest.mock("../utils/api", () => ({
  callApi: jest.fn(),
}));

describe("login function", () => {
  it("should login successfully and navigate to /blog on successful response", async () => {
    // Mocking sessionStorage
    const sessionStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
    };
    // Mocking navigate function from react-router-dom
    const navigateMock = jest.fn();

    // Set up initial conditions
    Object.defineProperty(window, "sessionStorage", {
      value: sessionStorageMock,
    });
    const originalNavigate = window.location.assign;
    window.location.assign = jest.fn();

    // Mocking API response
    const mockResponse = {
      token: "yourMockedToken",
    };
    require("../utils/api").callApi.mockResolvedValue(mockResponse);

    // Invoke login function
    await act(async () => {
      await login("eve.holt@reqres.in", "cityslicka");
    });

    // Assertions
    expect(sessionStorageMock.setItem).toHaveBeenCalledWith(
      "token",
      "yourMockedToken"
    );
    expect(navigateMock).toHaveBeenCalledWith("/blog");

    // Restore original conditions
    window.location.assign = originalNavigate;
    Object.defineProperty(window, "sessionStorage", { value: sessionStorage });
  });

  it("should show error toast on failed login attempt", async () => {
    // Mocking toast
    const toastMock = {
      success: jest.fn(),
      error: jest.fn(),
    };

    // Mocking API response
    require("../utils/api").callApi.mockResolvedValue(null);

    // Invoke login function
    await act(async () => {
      await login("testexample.com", "incorrectPassword");
    });

    // Assertions
    expect(toastMock.error).toHaveBeenCalledWith("Login failed");
  });
});

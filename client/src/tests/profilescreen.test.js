import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import ProfileScreen from "../screens/ProfileScreen";
import "@testing-library/jest-dom";

const mockStore = configureMockStore([thunk]);

// Mock updateUserProfile action
jest.mock("../actions/userActions", () => ({
  ...jest.requireActual("../actions/userActions"),
  updateUserProfile: (updatedUser) => (dispatch) => {
    dispatch({ type: "USER_UPDATE_PROFILE_SUCCESS" });
  },
}));

describe("ProfileScreen", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      userDetails: {
        loading: false,
        error: null,
        user: {
          name: "John Doe",
          email: "john.doe@example.com",
        },
      },
      userLogin: {
        userInfo: {
          id: "1",
          name: "John Doe",
          email: "john.doe@example.com",
          token: "sample_token",
        },
      },
      userUpdateProfile: {
        success: false,
      },
      orderListMy: {
        loading: false,
        error: null,
        orders: [],
      },
    });
  });

  it("renders the ProfileScreen component", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProfileScreen />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/User Profile/i)).toBeInTheDocument();
    expect(screen.getByText(/My Orders/i)).toBeInTheDocument();
  });
});

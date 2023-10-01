import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import LoginScreen from "../screens/LoginScreen";
import "@testing-library/jest-dom";

const mockStore = configureMockStore([thunk]);

// Mock the login action
jest.mock('../actions/userActions', () => ({
  ...jest.requireActual('../actions/userActions'),
  login: (email, password) => (dispatch) => {
    dispatch({ type: 'USER_LOGIN_SUCCESS' });
  },
}));

describe('LoginScreen', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      userLogin: {
        loading: false,
        error: null,
        userInfo: null,
      },
    });
  });

  it('renders the LoginScreen component', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginScreen />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });

  it('logs in a user', async () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginScreen />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(getByPlaceholderText('Enter email'), { target: { value: 'jane.doe@example.com' } });
    fireEvent.change(getByPlaceholderText('Enter password'), { target: { value: 'example_password' } });

    fireEvent.click(getByText('Sign In'));

    await waitFor(() => {
      expect(store.getActions()).toContainEqual({ type: 'USER_LOGIN_SUCCESS' });
    });
  });
});
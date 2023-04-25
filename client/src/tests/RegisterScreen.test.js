import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ProfileScreen from "../screens/RegisterScreen";
import "@testing-library/jest-dom";

const mockStore = configureMockStore([thunk]);

// Mock the register action
jest.mock('../actions/userActions', () => ({
  ...jest.requireActual('../actions/userActions'),
  register: (name, email, password) => (dispatch) => {
    dispatch({ type: 'USER_REGISTER_SUCCESS' });
  },
}));

describe('RegisterScreen', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      userRegister: {
        loading: false,
        error: null,
        userInfo: null,
      },
    });
  });

  it('renders the RegisterScreen component', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterScreen />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
  });

  it('registers a new user', async () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterScreen />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(getByPlaceholderText('Enter name'), { target: { value: 'Jane Doe' } });
    fireEvent.change(getByPlaceholderText('Enter email'), { target: { value: 'jane.doe@example.com' } });
    fireEvent.change(getByPlaceholderText('Enter password'), { target: { value: 'new_password' } });
    fireEvent.change(getByPlaceholderText('Confirm password'), { target: { value: 'new_password' } });

    fireEvent.click(getByText('Register'));

    await waitFor(() => {
      expect(store.getActions()).toContainEqual({ type: 'USER_REGISTER_SUCCESS' });
    });
  });

  it('shows an error message if passwords do not match', () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterScreen />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(getByPlaceholderText('Enter password'), { target: { value: 'new_password' } });
    fireEvent.change(getByPlaceholderText('Confirm password'), { target: { value: 'different_password' } });

    fireEvent.click(getByText('Register'));

    expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
  });
});
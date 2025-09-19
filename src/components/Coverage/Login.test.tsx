import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import Login from '../../components/Login';
import { addUser } from '../../../src/utils/userSlice';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockStore = configureStore([]);
let store: any;

describe('Login Component', () => {
  beforeEach(() => {
    store = mockStore({
      user: null
    });
    store.dispatch = jest.fn();
  });

  it('renders login form initially', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.queryByLabelText(/First Name/i)).not.toBeInTheDocument();
  });

  it('switches to signup form when toggle clicked', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    // Click the toggle to switch to signup
    fireEvent.click(screen.getByText(/Existing User \? Login here/i));

    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('calls login API and dispatches addUser', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { id: 1, email: 'test@test.com' } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(addUser({ id: 1, email: 'test@test.com' }));
    });
  });

  it('calls signup API and dispatches addUser', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { data: { id: 2, email: 'signup@test.com' } } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    // Switch to signup form
    fireEvent.click(screen.getByText(/Existing User \? Login here/i));

    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'signup@test.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: '123456' } });

    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(addUser({ id: 2, email: 'signup@test.com' }));
    });
  });

  it('displays error message on login failure', async () => {
    mockedAxios.post.mockRejectedValueOnce({ response: { data: 'Invalid credentials' } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'wrong@test.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });
  });
});

import "@testing-library/jest-dom";

// src/components/Coverage/UserCard.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserCard from '../../components/UserCard';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import { removeUserFromFeed } from '../../utils/feedSlice';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock Redux store
const mockStore = configureStore([]);
let store: any;

describe('UserCard Component', () => {
  const mockUser = {
    _id: '123',
    firstName: 'John',
    lastName: 'Doe',
    age: 25,
    gender: 'Male',
    about: 'Hello!',
    photoURL: '',
  };

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
  });

  it('renders user info correctly', () => {
    render(
      <Provider store={store}>
        <UserCard user={mockUser} />
      </Provider>
    );

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/25 Male/i)).toBeInTheDocument();
    expect(screen.getByText(/Hello!/i)).toBeInTheDocument();
    // Image fallback
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.src).toContain('stock/photo-1606107557195-0e29a4b5b4aa.webp');
  });

  it('calls axios and dispatch on clicking "Ignore"', async () => {
    mockedAxios.post.mockResolvedValue({ data: {} });

    render(
      <Provider store={store}>
        <UserCard user={mockUser} />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Ignore/i));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/request/send/ignored/123'),
        {},
        { withCredentials: true }
      );
      expect(store.dispatch).toHaveBeenCalledWith(removeUserFromFeed('123'));
    });
  });

  it('calls axios and dispatch on clicking "Interested"', async () => {
    mockedAxios.post.mockResolvedValue({ data: {} });

    render(
      <Provider store={store}>
        <UserCard user={mockUser} />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Interested/i));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/request/send/interested/123'),
        {},
        { withCredentials: true }
      );
      expect(store.dispatch).toHaveBeenCalledWith(removeUserFromFeed('123'));
    });
  });

  // it('renders nothing if user prop is null', () => {
  //   const { container } = render(
  //     <Provider store={store}>
  //       <UserCard user={null as any} />
  //     </Provider>
  //   );

  //   expect(container.firstChild).toBeNull();
  // });
});

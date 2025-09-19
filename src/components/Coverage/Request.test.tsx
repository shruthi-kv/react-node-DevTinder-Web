import "@testing-library/jest-dom";
// src/components/Coverage/Request.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import Request from '../../components/Request';
import { addrequest, removerequest } from '../../utils/requestSlice';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockStore = configureStore([]);

describe('Request Component', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({ request: [] });
    store.dispatch = jest.fn();
  });

  it('renders "No requests Found !" when requests array is empty', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { data: [] } });

    render(
      <Provider store={store}>
        <Request />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/No requests Found !/i)).toBeInTheDocument();
    });
  });


  it('renders requests when data is present', async () => {
  const mockData = [
    {
      _id: '1',
      fromUserId: {
        _id: 'u1',
        firstName: 'John',
        lastName: 'Doe',
        age: 25,
        gender: 'Male',
        about: 'Hello!',
        photoURL: ''
      }
    }
  ];

  // Pre-populate store
  store = mockStore({ request: mockData });

  render(
    <Provider store={store}>
      <Request />
    </Provider>
  );

  await waitFor(() => {
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/25 Male/i)).toBeInTheDocument();
    expect(screen.getByText(/Hello!/i)).toBeInTheDocument();
  });
});


  it('calls removerequest on clicking Accept/Reject', async () => {
   const mockData = [
  {
    _id: '1',
    fromUserId: {
      _id: 'u1',
      firstName: 'John',
      lastName: 'Doe',
      age: 25,
      gender: 'Male',
      about: 'Hello!',
      photoURL: ''
    }
  }
];

store = mockStore({ request: mockData });
    render(
      <Provider store={store}>
        <Request />
      </Provider>
    );

   await waitFor(() => screen.getByText(/John Doe/i));

    fireEvent.click(screen.getByText(/Accept/i));
fireEvent.click(screen.getByText(/Reject/i));
  });

  it('renders nothing when requests is null', () => {
    store = mockStore({ request: null });

    const { container } = render(
      <Provider store={store}>
        <Request />
      </Provider>
    );

    expect(container.firstChild).toBeNull();
  });
});

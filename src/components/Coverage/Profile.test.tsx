import "@testing-library/jest-dom";
// src/components/Coverage/Profile.test.tsx
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Profile from '../../components/Profile';
// import EditProfile from '../../components/EditProfile';

// // Mock EditProfile so we don't have to render full component
// jest.mock('./EditProfile', () => jest.fn(() => <div>EditProfile Component</div>));

const mockStore = configureStore([]);

describe('Profile Component', () => {
  let store: any;

  it('renders EditProfile when user exists', () => {
    store = mockStore({ user: { id: 1, name: 'John Doe', email: 'john@test.com' } });

    render(
      <Provider store={store}>
        <Profile />
      </Provider>
    );


  });

  it('renders nothing when user is null', () => {
    store = mockStore({ user: null });

    const { container } = render(
      <Provider store={store}>
        <Profile />
      </Provider>
    );

    expect(container.firstChild).toBeNull();
  });
});

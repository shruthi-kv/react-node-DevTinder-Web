import "@testing-library/jest-dom";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import {thunk} from "redux-thunk";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import Body from "../../components/Body";
import { addUser } from "../../utils/userSlice";
// import mockStore from './store';

import configureMockStore from "redux-mock-store";


jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Body Component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({ user: null });
    store.dispatch = jest.fn();
    mockedAxios.get.mockReset();
    mockedNavigate.mockReset();
  });

  it("renders NavBar, Outlet, and Footer", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Body />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/devtinder/i)).toBeInTheDocument(); // Assuming NavBar has "DevTinder" text
  });

  it("fetches user and dispatches addUser on successful API call", async () => {
    const fakeData = { firstName: "John" };
    mockedAxios.get.mockResolvedValueOnce({ data: fakeData });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Body />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(addUser(fakeData));
    });
  });

  it("navigates to login on 401 error", async () => {
    mockedAxios.get.mockRejectedValueOnce({ status: 401 });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Body />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith("/login");
    });
  });
});

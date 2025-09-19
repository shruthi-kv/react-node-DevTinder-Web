import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import axios from "axios";
import NavBar from "../../components/NavBar";
import { removeUser } from "../../utils/userSlice";
import React from "react";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("NavBar Component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      user: { firstName: "John" },
    });
    store.dispatch = jest.fn();
  });

  it("calls logout API and dispatches removeUser on logout click", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { success: true } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <NavBar />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText(/Logout/i));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining("/logout"),
        {},
        { withCredentials: true }
      );
      expect(store.dispatch).toHaveBeenCalledWith(removeUser());
      expect(mockedNavigate).toHaveBeenCalledWith("/login");
    });
  });
});

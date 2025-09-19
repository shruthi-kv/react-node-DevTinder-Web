import "@testing-library/jest-dom";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import {thunk} from "redux-thunk";
import axios from "axios";
import Feed from "../Feed";
import { addFeed } from "../../utils/feedSlice";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock UserCard
jest.mock("../UserCard", () => ({ user }: any) => (
  <div data-testid="user-card">{user.firstName}</div>
));

// Setup mock store
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Feed Component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({ feed: null }); // initial feed state
    store.dispatch = jest.fn();
    mockedAxios.get.mockReset();
  });

  it("dispatches addFeed after successful API call", async () => {
    const fakeFeed = [{ firstName: "John" }];
    mockedAxios.get.mockResolvedValueOnce({ data: fakeFeed });

    render(
      <Provider store={store}>
        <Feed />
      </Provider>
    );

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(addFeed(fakeFeed));
    });
  });

  it("renders 'No New Users found !' if feed is empty", () => {
    store = mockStore({ feed: [] });

    render(
      <Provider store={store}>
        <Feed />
      </Provider>
    );

    expect(screen.getByText("No New Users found !")).toBeInTheDocument();
  });

  it("renders UserCard when feed has users", () => {
    const fakeFeed = [{ firstName: "Alice" }];
    store = mockStore({ feed: fakeFeed });

    render(
      <Provider store={store}>
        <Feed />
      </Provider>
    );

    expect(screen.getByTestId("user-card")).toHaveTextContent("Alice");
  });
});

import "@testing-library/jest-dom";

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import {thunk} from "redux-thunk";
import axios from "axios";
import Connections from "../Connections";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Redux mock store
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Connections Component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({ connection: null });
    store.dispatch = jest.fn();
    mockedAxios.get.mockReset();
  });

  it("renders 'No Connection Found !' when connection array is empty", () => {
    store = mockStore({ connection: [] });

    render(
      <Provider store={store}>
        <Connections />
      </Provider>
    );

    expect(screen.getByText("No Connection Found !")).toBeInTheDocument();
  });

  it("renders connections when API returns data", async () => {
    const fakeConnections = [
      {
        _id: "1",
        firstName: "Alice",
        lastName: "Johnson",
        age: 25,
        gender: "Female",
        about: "Loves hiking",
        photoURL: "alice.jpg",
      },
      {
        _id: "2",
        firstName: "Bob",
        lastName: "Smith",
        age: 30,
        gender: "Male",
        about: "Enjoys chess",
        photoURL: "",
      },
    ];

    store = mockStore({ connection: fakeConnections });

    render(
      <Provider store={store}>
        <Connections />
      </Provider>
    );

    // Wait for map rendering
    await waitFor(() => {
      expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
      expect(screen.getByText("Bob Smith")).toBeInTheDocument();
      expect(screen.getByText("Loves hiking")).toBeInTheDocument();
      expect(screen.getByText("Enjoys chess")).toBeInTheDocument();
    });
  });

  it("dispatches addConnection after API call", async () => {
    const fakeConnections = [
      { _id: "1", firstName: "John", lastName: "Doe", age: 28, gender: "Male", about: "", photoURL: "" }
    ];
    mockedAxios.get.mockResolvedValueOnce({ data: { data: fakeConnections } });

    render(
      <Provider store={store}>
        <Connections />
      </Provider>
    );

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalled();
    });
  });
});

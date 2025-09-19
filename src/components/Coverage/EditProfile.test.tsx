import "@testing-library/jest-dom";
// src/components/Coverage/EditProfile.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditProfile from "../../components/EditProfile";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import {thunk} from "redux-thunk";
import axios from "axios";
import '@testing-library/jest-dom'; // for toBeInTheDocument

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("EditProfile Component", () => {
  let store: any;
  const user = {
    firstName: "Alice",
    lastName: "Smith",
    age: 25,
    gender: "Female",
    about: "Hello!",
    photoUrl: "https://photo.com/alice.jpg",
  };

  beforeEach(() => {
    store = mockStore({
      user: {},
    });
  });

  it("renders with initial values", () => {
    render(
      <Provider store={store}>
        <EditProfile user={user} />
      </Provider>
    );

    expect(screen.getByDisplayValue("Alice")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Smith")).toBeInTheDocument();
    expect(screen.getByDisplayValue("25")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Female")).toBeInTheDocument();
    expect(screen.getByDisplayValue("https://photo.com/alice.jpg")).toBeInTheDocument();
  });

  it("updates input fields when user types", () => {
    render(
      <Provider store={store}>
        <EditProfile user={user} />
      </Provider>
    );

    const firstNameInput = screen.getByDisplayValue("Alice");
    fireEvent.change(firstNameInput, { target: { value: "Bob" } });
    expect(screen.getByDisplayValue("Bob")).toBeInTheDocument();
  });

  it("saves profile and shows toast", async () => {
    mockedAxios.patch.mockResolvedValueOnce({
      data: { data: { ...user, firstName: "AliceUpdated" } },
    });

    render(
      <Provider store={store}>
        <EditProfile user={user} />
      </Provider>
    );

    const saveButton = screen.getByText("Save Profile");
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText("Profile Saved successfully.")).toBeInTheDocument();
    });

    const actions = store.getActions();
    expect(actions[0].type).toBe("user/addUser"); // matches your addUser action
    expect(actions[0].payload.firstName).toBe("AliceUpdated");
  });

  it("shows error message when API fails", async () => {
  mockedAxios.patch.mockRejectedValueOnce({
    response: { data: "API Error" },
  });

  render(
    <Provider store={store}>
      <EditProfile user={user} />
    </Provider>
  );

  fireEvent.click(screen.getByText("Save Profile"));

  await waitFor(() => {
    expect(screen.getByText("API Error")).toBeInTheDocument();
  });
});
});

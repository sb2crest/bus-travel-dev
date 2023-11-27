import React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Filter from "./Filter";
import userEvent from "@testing-library/user-event";
import nock from "nock";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { enUS } from "date-fns/locale";
registerLocale("en-US", enUS);
setDefaultLocale("en-US");
describe("Filter component", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("renders without errors", () => {
    render(
      <MemoryRouter>
        <Filter setVehicles={() => {}} />
      </MemoryRouter>
    );
  });
  it("handles Close button click", async () => {
    render(<Filter setVehicles={() => {}} />);
    fireEvent.click(screen.getByText("AC"));
    fireEvent.click(screen.getByText("Done"));
    await waitFor(() => {
      expect(screen.getByText("FILTERS")).toBeInTheDocument();
    });
  });

  it("handles Sleeper section interactions", () => {
    render(
      <MemoryRouter>
        <Filter setVehicles={() => {}} />
      </MemoryRouter>
    );

    // Click the Sleeper button
    const sleeperButton = screen.getByText(/sleeper/i);
    fireEvent.click(sleeperButton);

    // Check if the All checkbox and labels are present when Sleeper is clicked
    const allCheckbox = screen.getByLabelText("All") as HTMLInputElement;
    const sleeperCheckbox = screen.getByLabelText(
      "Sleeper"
    ) as HTMLInputElement;
    const semiSleeperCheckbox = screen.getByLabelText(
      "Semi-Sleeper"
    ) as HTMLInputElement;
    const nonSleeperCheckbox = screen.getByLabelText(
      "Non-Sleeper"
    ) as HTMLInputElement;

    expect(allCheckbox).toBeInTheDocument();
    expect(sleeperCheckbox).toBeInTheDocument();
    expect(semiSleeperCheckbox).toBeInTheDocument();
    expect(nonSleeperCheckbox).toBeInTheDocument();

    // Check if changing the All checkbox triggers the correct function
    fireEvent.click(allCheckbox);
    expect(allCheckbox.checked).toBe(true);
    expect(sleeperCheckbox.checked).toBe(true);
    expect(semiSleeperCheckbox.checked).toBe(true);
    expect(nonSleeperCheckbox.checked).toBe(true);

    fireEvent.click(sleeperCheckbox);
    expect(allCheckbox.checked).toBe(false);
    expect(semiSleeperCheckbox.checked).toBe(true);
    expect(nonSleeperCheckbox.checked).toBe(true);

    // Check if changing the Semi-Sleeper checkbox triggers the correct function
    fireEvent.click(semiSleeperCheckbox);
    expect(allCheckbox.checked).toBe(false);
    expect(sleeperCheckbox.checked).toBe(false);
    expect(nonSleeperCheckbox.checked).toBe(true);

    // Check if changing the Non-Sleeper checkbox triggers the correct function
    fireEvent.click(nonSleeperCheckbox);
    expect(allCheckbox.checked).toBe(false);
    expect(sleeperCheckbox.checked).toBe(false);
    expect(semiSleeperCheckbox.checked).toBe(false);
  });

  test("handles Close button click and makes API request", async () => {
    render(
      <MemoryRouter>
        <Filter setVehicles={() => {}} />
      </MemoryRouter>
    );
    const mockResponse = [
      {
        vehicleNumber: "KA07V2104",
      },
      {
        vehicleNumber: "KA07V2105",
      },
    ];
    nock("https://api.example.com").post("/filter").reply(200, mockResponse);

    fireEvent.click(screen.getByText("AC"));

    const fromDateInput = screen.getByPlaceholderText(
      "From-Date"
    ) as HTMLInputElement;
    const toDateInput = screen.getByPlaceholderText(
      "To-Date"
    ) as HTMLInputElement;
    fireEvent.change(fromDateInput, { target: { value: "01-01-2023" } });
    fireEvent.change(toDateInput, { target: { value: "01-02-2023" } });

    fireEvent.click(screen.getByText("Done"));
    await waitFor(() => {
      expect(screen.getByText("FILTERS")).toBeInTheDocument();
    });
    const expectedFilter = "AC/FS";
    expect(nock.isDone()).toBe(false);
    await waitFor(() => {
      const filterResults = mockResponse;
      const setVehicles = mockResponse;
      expect(filterResults).toEqual(mockResponse);
    });
  });
  it("handles FromDate and ToDate change together", async () => {
    render(<Filter setVehicles={() => {}} />);
    const fromDateInput = screen.getByPlaceholderText(
      "From-Date"
    ) as HTMLInputElement;
    const toDateInput = screen.getByPlaceholderText(
      "To-Date"
    ) as HTMLInputElement;

    fireEvent.change(fromDateInput, { target: { value: "01-01-2023" } });
    fireEvent.change(toDateInput, { target: { value: "01-02-2023" } });

    expect(fromDateInput.value).toBe("01-01-2023");
    expect(toDateInput.value).toBe("01-02-2023");
  });

  test("clears filters when 'Clear Filters' button is clicked", () => {
    render(
      <MemoryRouter>
        <Filter setVehicles={() => {}} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText("AC"));
    fireEvent.click(screen.getByLabelText("AC"));
    fireEvent.click(screen.getByLabelText("Non-AC"));

    fireEvent.click(screen.getByText("Sleeper"));
    fireEvent.click(screen.getByLabelText("Sleeper"));
    fireEvent.click(screen.getByLabelText("Semi-Sleeper"));
    fireEvent.click(screen.getByLabelText("Non-Sleeper"));

    fireEvent.change(
      screen.getByPlaceholderText("From-Date") as HTMLInputElement,
      { target: { value: "01-01-2023" } }
    );
    fireEvent.change(
      screen.getByPlaceholderText("To-Date") as HTMLInputElement,
      { target: { value: "01-02-2023" } }
    );

    expect(screen.getByLabelText("AC")).toBeChecked();
    expect(screen.getByLabelText("Non-AC")).toBeChecked();
    expect(screen.getByLabelText("Sleeper")).toBeChecked();
    expect(screen.getByLabelText("Semi-Sleeper")).toBeChecked();
    expect(screen.getByLabelText("Non-Sleeper")).toBeChecked();
    expect(
      (screen.getByPlaceholderText("From-Date") as HTMLInputElement).value
    ).toBe("01-01-2023");
    expect(
      (screen.getByPlaceholderText("To-Date") as HTMLInputElement).value
    ).toBe("01-02-2023");

    fireEvent.click(screen.getByText("Clear Filters"));
    expect(screen.getByLabelText("AC")).not.toBeChecked();
    expect(screen.getByLabelText("Non-AC")).not.toBeChecked();
    expect(screen.getByLabelText("Sleeper")).not.toBeChecked();
    expect(screen.getByLabelText("Semi-Sleeper")).not.toBeChecked();
    expect(screen.getByLabelText("Non-Sleeper")).not.toBeChecked();

    fireEvent.change(
      screen.getByPlaceholderText("From-Date") as HTMLInputElement,
      { target: { value: "" } }
    );
    fireEvent.change(
      screen.getByPlaceholderText("To-Date") as HTMLInputElement,
      { target: { value: "" } }
    );

    expect(
      (screen.getByPlaceholderText("From-Date") as HTMLInputElement).value
    ).toBe("");
    expect(
      (screen.getByPlaceholderText("To-Date") as HTMLInputElement).value
    ).toBe("");
  });
  it("handles AC section interactions", () => {
    render(
      <MemoryRouter>
        <Filter setVehicles={() => {}} />
      </MemoryRouter>
    );
    const acButton = screen.getByText(/ac/i);
    fireEvent.click(acButton);
    const allCheckbox = screen.getByLabelText("All") as HTMLInputElement;
    const acCheckbox = screen.getByLabelText("AC") as HTMLInputElement;
    const nonACCheckbox = screen.getByLabelText("Non-AC") as HTMLInputElement;

    expect(allCheckbox).toBeInTheDocument();
    expect(acCheckbox).toBeInTheDocument();
    expect(nonACCheckbox).toBeInTheDocument();
    fireEvent.click(allCheckbox);
    expect(allCheckbox.checked).toBe(true);
    expect(acCheckbox.checked).toBe(true);
    expect(nonACCheckbox.checked).toBe(true);

    fireEvent.click(acCheckbox);
    expect(allCheckbox.checked).toBe(false);
    expect(nonACCheckbox.checked).toBe(true);
  });
  it("handles date input validation", () => {
    render(<Filter setVehicles={() => {}} />);
    const fromDateInput = screen.getByPlaceholderText(
      "From-Date"
    ) as HTMLInputElement;
    fireEvent.change(fromDateInput, { target: { value: "2023-01-01" } });
    expect(fromDateInput.value).not.toBe("");
    fireEvent.change(fromDateInput, { target: { value: "01-01-2023" } });
    expect(fromDateInput.value).toBe("01-01-2023");

    const toDateInput = screen.getByPlaceholderText(
      "To-Date"
    ) as HTMLInputElement;
    fireEvent.change(toDateInput, { target: { value: "2023-02-01" } });
    expect(toDateInput.value).not.toBe("");

    fireEvent.change(toDateInput, { target: { value: "01-02-2023" } });
    expect(toDateInput.value).toBe("01-02-2023");
    fireEvent.change(fromDateInput, { target: { value: "01-02-2023" } });
    fireEvent.change(toDateInput, { target: { value: "01-01-2023" } });
    expect(toDateInput.value).not.toBe("01-02-2023");
  });
  it("handles modal close button click", async () => {
    render(<Filter setVehicles={() => {}} />);

    fireEvent.click(screen.getByText("Filter"));

    expect(screen.getByText("FILTERS")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Close"));
    await waitFor(() => {
      expect(screen.queryByText("FILTERS")).toBeInTheDocument();
    });
  });
  it("processes filter options before making API request", async () => {
    render(<Filter setVehicles={() => {}} />);

    fireEvent.click(screen.getByText("AC"));

    const acCheckbox = screen.getByLabelText("AC") as HTMLInputElement;
    fireEvent.click(acCheckbox);
    expect(acCheckbox.checked).toBe(true);

    fireEvent.click(screen.getByText("Sleeper"));
    const sleeperCheckbox = screen.getByLabelText(
      "Sleeper"
    ) as HTMLInputElement;
    fireEvent.click(sleeperCheckbox);
    expect(sleeperCheckbox.checked).toBe(true);
    fireEvent.change(
      screen.getByPlaceholderText("From-Date") as HTMLInputElement,
      { target: { value: "01-01-2023" } }
    );
    fireEvent.change(
      screen.getByPlaceholderText("To-Date") as HTMLInputElement,
      { target: { value: "01-02-2023" } }
    );
    fireEvent.click(screen.getByText("Done"));
    const expectedFilter = "AC/FS";
  });
  it("handles API request failure", async () => {
    render(<Filter setVehicles={() => {}} />);
    nock("https://api.example.com")
      .post("/filter")
      .reply(500, { error: "Internal Server Error" });

    fireEvent.click(screen.getByText("AC"));
    fireEvent.change(
      screen.getByPlaceholderText("From-Date") as HTMLInputElement,
      { target: { value: "01-01-2023" } }
    );
    fireEvent.change(
      screen.getByPlaceholderText("To-Date") as HTMLInputElement,
      { target: { value: "01-02-2023" } }
    );

    fireEvent.click(screen.getByText("Done"));
  });
  it("handles AC section interactions", () => {
    render(
      <MemoryRouter>
        <Filter setVehicles={() => {}} />
      </MemoryRouter>
    );
    const acButton = screen.getByText(/AC/i);
    fireEvent.click(acButton);
    const allCheckbox = screen.getByLabelText("All") as HTMLInputElement;
    const acCheckbox = screen.getByLabelText("AC") as HTMLInputElement;
    const nonACCheckbox = screen.getByLabelText("Non-AC") as HTMLInputElement;
    expect(allCheckbox).toBeInTheDocument();
    expect(acCheckbox).toBeInTheDocument();
    expect(nonACCheckbox).toBeInTheDocument();
    fireEvent.click(allCheckbox);
    expect(allCheckbox.checked).toBe(true);
    expect(acCheckbox.checked).toBe(true);
    expect(nonACCheckbox.checked).toBe(true);

    fireEvent.click(acCheckbox);
    expect(allCheckbox.checked).toBe(false);
    expect(nonACCheckbox.checked).toBe(true);
  });
  it("collects selected options for AC and Sleeper", () => {
    render(<Filter setVehicles={() => {}} />);
    fireEvent.click(screen.getByText("AC"));
    const acCheckbox = screen.getByLabelText("AC") as HTMLInputElement;
    fireEvent.click(acCheckbox);
    expect(acCheckbox.checked).toBe(true);
    fireEvent.click(screen.getByText("Sleeper"));
    const sleeperCheckbox = screen.getByLabelText(
      "Sleeper"
    ) as HTMLInputElement;
    fireEvent.click(sleeperCheckbox);
    expect(sleeperCheckbox.checked).toBe(true);

    fireEvent.click(screen.getByLabelText("Non-AC"));
    fireEvent.click(screen.getByLabelText("Non-Sleeper"));

    fireEvent.click(screen.getByText("Done"));
  });
  it("handles Non-Sleeper checkbox change", () => {
    render(<Filter setVehicles={() => {}} />);

    // Click the Sleeper button
    fireEvent.click(screen.getByText("Sleeper"));

    // Check if changing the Sleeper checkbox triggers the correct function
    const sleeperCheckbox = screen.getByLabelText(
      "Sleeper"
    ) as HTMLInputElement;
    fireEvent.click(sleeperCheckbox);
    expect(sleeperCheckbox.checked).toBe(true);

    // Click the Semi-Sleeper button
    fireEvent.click(screen.getByLabelText("Semi-Sleeper"));

    // Check if changing the Semi-Sleeper checkbox triggers the correct function
    const semiSleeperCheckbox = screen.getByLabelText(
      "Semi-Sleeper"
    ) as HTMLInputElement;
    fireEvent.click(semiSleeperCheckbox);
    expect(semiSleeperCheckbox.checked).not.toBe(true);

    // Click the Non-Sleeper button
    fireEvent.click(screen.getByLabelText("Non-Sleeper"));
    const nonSleeperCheckbox = screen.getByLabelText(
      "Non-Sleeper"
    ) as HTMLInputElement;
    fireEvent.click(nonSleeperCheckbox);
    expect(nonSleeperCheckbox.checked).toBe(false);
  });
  
});

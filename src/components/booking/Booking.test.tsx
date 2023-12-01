import { render, screen, act, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import nock from "nock";
import Booking from "./Booking";

describe("Booking component", () => {
  test("renders without errors", () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );
  });

  test('calls listVehicle function when component is loaded', async () => {
    const mockData = [
      {
        "vehicleNumber": "KA01HJ1234",
        "seatCapacity": 12,
        "s3ImageUrl": [],
        "isVehicleAC": true,
        "isVehicleSleeper": true,
        "image": null,
        "driverName": "Suresh ",
        "driverNumber": "123455666",
        "alternateNumber": "7982726663",
        "emergencyNumber": "2762762576"
      },
      {
        "vehicleNumber": "KA01HJ1235",
        "seatCapacity": 20,
        "s3ImageUrl": [],
        "isVehicleAC": true,
        "isVehicleSleeper": true,
        "image": null,
        "driverName": "Suresh",
        "driverNumber": "123455666",
        "alternateNumber": "7982726663",
        "emergencyNumber": "2762762576"
      }];

    nock('http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/listVehicles')
      .reply(200, mockData);

    await act(async () => {
      render(<Booking />);
    });

    await waitFor(() => {
      expect(screen.getByText('KA01HJ1234')).toBeInTheDocument();
    });
  });

  test('renders filter button', () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );
    const filterComponent = screen.getByTestId("filter-component");
    expect(filterComponent).toBeInTheDocument();
  });
});
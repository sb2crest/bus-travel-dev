import React from "react";
import { render, screen, act, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Booking from "./Booking";
import nock from "nock";
import Filter from "./Filter/Filter";

describe("Booking component", () => {
  test("renders without errors", () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );
  });

  test('fetches and displays vehicle data', async () => {
    const mockData = [
      {
        "vehicleNumber": "KA01HJ1234",
        "seatCapacity": 12,
        "isVehicleAC": true,
        "isVehicleSleeper": true,
      },
      {
        "vehicleNumber": "KA01HJ1235",
        "seatCapacity": 20,
        "isVehicleAC": false,
        "isVehicleSleeper": false,
      }
    ]
    nock('http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/listVehicles')
      .reply(200, mockData);

    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    await waitFor(() => {
      mockData.forEach((vehicle) => {
        const vehicleNumberElement = screen.getByText(vehicle.vehicleNumber);
        const seatCapacityElement = screen.getByText(`Seat Capacity: ${vehicle.seatCapacity}`);
        const isVehicleACElement = screen.getByText(`AC: ${vehicle.isVehicleAC ? 'Yes' : 'No'}`);
        const isVehicleSleeperElement = screen.getByText(`Sleeper: ${vehicle.isVehicleSleeper ? 'Yes' : 'No'}`);
        expect(vehicleNumberElement).toBeInTheDocument();
        expect(seatCapacityElement).toBeInTheDocument();
        expect(isVehicleACElement).toBeInTheDocument();
        expect(isVehicleSleeperElement).toBeInTheDocument();
      });
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

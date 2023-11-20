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
        "isVehicleAC": true,
        "isVehicleSleeper": true,
      },
      {
        "vehicleNumber": "KA01HJ1236",
        "seatCapacity": 25,
        "isVehicleAC": true,
        "isVehicleSleeper": true,
      },
      {
        "vehicleNumber": "KA07V2818",
        "seatCapacity": 40,
        "isVehicleAC": true,
        "isVehicleSleeper": true,
      },
      {
        "vehicleNumber": "KA07V2810",
        "seatCapacity": 40,
        "isVehicleAC": true,
        "isVehicleSleeper": true,
      },
      {
        "vehicleNumber": "KA07V2811",
        "seatCapacity": 30,
        "isVehicleAC": true,
        "isVehicleSleeper": null,
      },
      {
        "vehicleNumber": "KA07V2815",
        "seatCapacity": 40,
        "isVehicleAC": true,
        "isVehicleSleeper": true,
      },
      {
        "vehicleNumber": "KA07V2915",
        "seatCapacity": 40,
        "isVehicleAC": true,
        "isVehicleSleeper": true,
      },
      {
        "vehicleNumber": "KA07V2918",
        "seatCapacity": 40,
        "isVehicleAC": true,
        "isVehicleSleeper": true,
      },
      {
        "vehicleNumber": "KA07V2999",
        "seatCapacity": 40,
        "isVehicleAC": false,
        "isVehicleSleeper": true,
      },
      {
        "vehicleNumber": "KA07V2100",
        "seatCapacity": 40,
        "isVehicleAC": false,
        "isVehicleSleeper": true,
      },
      {
        "vehicleNumber": "KA07V2102",
        "seatCapacity": 40,
        "isVehicleAC": false,
        "isVehicleSleeper": true,
      },
      {
        "vehicleNumber": "KA07V2103",
        "seatCapacity": 40,
        "isVehicleAC": false,
        "isVehicleSleeper": true,
      },
      {
        "vehicleNumber": "KA07V2104",
        "seatCapacity": 40,
        "isVehicleAC": false,
        "isVehicleSleeper": true,
      },
      {
        "vehicleNumber": "KA07V2105",
        "seatCapacity": 40,
        "isVehicleAC": false,
        "isVehicleSleeper": true,
      },
      {
        "vehicleNumber": "KA07V2911",
        "seatCapacity": 30,
        "isVehicleAC": true,
        "isVehicleSleeper": null,
      },
      {
        "vehicleNumber": "KA07V2106",
        "seatCapacity": 30,
        "isVehicleAC": true,
        "isVehicleSleeper": null,
      },
      {
        "vehicleNumber": "KA09EQ1234",
        "seatCapacity": 40,
        "isVehicleAC": true,
        "isVehicleSleeper": null,
      },
      {
        "vehicleNumber": "KA07V2108",
        "seatCapacity": 40,
        "isVehicleAC": false,
        "isVehicleSleeper": true,
      },
      {
        "vehicleNumber": "KA07V2109",
        "seatCapacity": 40,
        "isVehicleAC": false,
        "isVehicleSleeper": true,
      },
      {
        "vehicleNumber": "KA07V2111",
        "seatCapacity": 40,
        "isVehicleAC": false,
        "isVehicleSleeper": true,
      },
      {
        "vehicleNumber": "KA07V2112",
        "seatCapacity": 40,
        "isVehicleAC": false,
        "isVehicleSleeper": true,
      },
      {
        "vehicleNumber": "KA07V2113",
        "seatCapacity": 40,
        "isVehicleAC": true,
        "isVehicleSleeper": null,
      },
      {
        "vehicleNumber": "KA07V2114",
        "seatCapacity": 40,
        "isVehicleAC": false,
        "isVehicleSleeper": true,
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
        // const seatCapacityElement = screen.getByText(`Seat Capacity: ${vehicle.seatCapacity}`);
        // const isVehicleACElement = screen.getByText(`AC: ${vehicle.isVehicleAC ? 'Yes' : 'No'}`);
        // const isVehicleSleeperElement = screen.getByText(`Sleeper: ${vehicle.isVehicleSleeper ? 'Yes' : 'No'}`);
        expect(vehicleNumberElement).toBeInTheDocument();
        // expect(seatCapacityElement).toBeInTheDocument();
        // expect(isVehicleACElement).toBeInTheDocument();
        // expect(isVehicleSleeperElement).toBeInTheDocument();
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

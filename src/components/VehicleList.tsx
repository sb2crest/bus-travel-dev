import React, { useState, useEffect, ChangeEvent } from "react";
import dataService from "../services/data.service";
import { Link } from "react-router-dom";
import IVehicleData from "../types/vehicle.type";

type VehiclesListProps = {};

const VehiclesList: React.FC<VehiclesListProps> = () => {
  const [vehicles, setVehicles] = useState<Array<IVehicleData>>([]);
  const [currentVehicle, setCurrentVehicle] = useState<IVehicleData | null>(
    null
  );
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchTitle, setSearchTitle] = useState<string>("");

  useEffect(() => {
    retrieveVehicles();
  }, []);

  const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(e.target.value);
  };

  const retrieveVehicles = () => {
    dataService.listVehicles()
      .then((response: any) => {
        setVehicles(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveVehicles();
    setCurrentVehicle(null);
    setCurrentIndex(-1);
  };

  const setActiveVehicle = (vehicle: IVehicleData, index: number) => {
    setCurrentVehicle(vehicle);
    setCurrentIndex(index);
  };

  const removeAllVehicle = () => {
    dataService.deleteAll()
      .then((response: any) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const searchByTitle = () => {
    setCurrentVehicle(null);
    setCurrentIndex(-1);

    dataService.findByTitle(searchTitle)
      .then((response: any) => {
        setVehicles(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={searchByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Vehicles List</h4>

        <ul className="list-group">
          {vehicles.map((vehicle: IVehicleData, index: number) => (
            <li
              className={
                "list-group-item " + (index === currentIndex ? "active" : "")
              }
              onClick={() => setActiveVehicle(vehicle, index)}
              key={index}
            >
              {vehicle.vehicleNumber}
            </li>
          ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllVehicle}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentVehicle ? (
          <div>
            <h4>Vehicle</h4>
            <div>
              <label>
                <strong>Vehicle Number:</strong>
              </label>{" "}
              {currentVehicle.vehicleNumber}
            </div>
            <div>
              <label>
                <strong>Seat Capacity:</strong>
              </label>{" "}
              {currentVehicle.seatCapacity}
            </div>
            <div>
              <label>
                <strong>AC:</strong>
              </label>{" "}
              {currentVehicle.isVehicleAC}
            </div>
            <div>
              <label>
                <strong>Sleeper:</strong>
              </label>{" "}
              {currentVehicle.isVehicleSleeper}
            </div>

            <Link
              to={"/vehicles/" + currentVehicle.vid}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Vehicle...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehiclesList;

import React, { useEffect, useState, ChangeEvent } from "react";
import { RouteComponentProps, useHistory, useParams } from 'react-router-dom';
import DataService from "../../services/data.service";
import IVehicleData from "../../types/vehicle.type";
interface RouterProps {
  id: string;
}

type Props = RouteComponentProps<RouterProps>;

const Vehicle: React.FC<Props> = (props) => {
  const { id } = useParams<RouterProps>();
  const history = useHistory();

  const [currentVehicle, setCurrentVehicle] = useState<IVehicleData | null>(null);
  const [message, setMessage] = useState<string>("");
  const [isVehicleAC, setIsVehicleAC] = useState<boolean>(false);
  const [isVehicleSleeper, setIsVehicleSleeper] = useState<boolean>(false);
  const [seatCapacity, setSeatCapacity] = useState<number>(0);

  useEffect(() => {
    getVehicle(id);
  }, [id]);

  const getVehicle = (id: string) => {
    // DataService.get(id)
    //   .then((response: any) => {
    //     setCurrentVehicle(response.data);
    //     console.log(response.data);
    //   })
    //   .catch((e: Error) => {
    //     console.log(e);
    //   });
  }

  const updatePublished = (status: boolean) => {
    if (currentVehicle) {
      const updatedVehicle: IVehicleData = {
        ...currentVehicle,
        isVehicleAC,
        isVehicleSleeper,
        seatCapacity,
        published: status,
      };

      DataService.updateVehicle(updatedVehicle, updatedVehicle.vid || "")
        .then((response: any) => {
          setCurrentVehicle(updatedVehicle);
          setMessage("The status was updated successfully!");
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  }

  // const convertVehicleToBus = (vehicleData: IVehicleData): IVehicleData => {
  //   return {
  //     title: vehicleData.vehicleNumber,
  //     description: vehicleData.image,
  //   };
  // }

  const updateVehicle = () => {
    if (currentVehicle) {
      //const busData: IBusData = convertVehicleToBus(currentVehicle);

      // DataService.update(busData, currentVehicle.vid || "")
      //   .then((response: any) => {
      //     console.log(response.data);
      //     setMessage("The Vehicle was updated successfully!");
      //   })
      //   .catch((e: Error) => {
      //     console.log(e);
      //   });
    }
  }

  const deleteVehicle = () => {
    if (currentVehicle) {
      DataService.deleteVehicle(currentVehicle.vid || "")
        .then((response: any) => {
          console.log(response.data);
          history.push("/vehicles");
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  }

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    if (currentVehicle) {
      setCurrentVehicle({
        ...currentVehicle,
        vehicleNumber: title,
      });
    }
  }

  const onChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    const description = e.target.value;
    if (currentVehicle) {
      setCurrentVehicle({
        ...currentVehicle,
        image: description,
      });
    }
  }

  return (
    <div>
      {currentVehicle ? (
        <div className="edit-form">
          <h4>Vehicle</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={currentVehicle.vehicleNumber}
                onChange={onChangeTitle}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={currentVehicle.image}
                onChange={onChangeDescription}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentVehicle.isVehicleAC}
            </div>
          </form>

          {currentVehicle.isVehicleSleeper ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button
            className="badge badge-danger mr-2"
            onClick={deleteVehicle}
          >
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateVehicle}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Vehicle...</p>
        </div>
      )}
    </div>
  );
}

export default Vehicle;

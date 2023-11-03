import React, { useState, ChangeEvent } from "react";
import dataService from "../services/data.service";
import IVehicleData from "../types/vehicle.type";

type Props = {};

const AddVehicleDel: React.FC<Props> = () => {
    // const [vehicleData, setVehicleData] = useState<IVehicleData>({
    //     vid: null,
    //     vehicleNumber: "",
    //     isVehicleAC: false,
    //     isVehicleSleeper: false,
    //     image: "",
    //     s3ImageUrl: "",
    //     seatCapacity: 0,
    // });
    const [vehicleAdded, setVehicleAdded] = useState<boolean>(false);

    // const {
    //     vehicleNumber,
    //     seatCapacity,
    //     isVehicleAC,
    //     isVehicleSleeper,
    //     image,
    // } = vehicleData;

    // const onChangeVehicleNumber = (e: ChangeEvent<HTMLInputElement>) => {
    //     setVehicleData({
    //         ...vehicleData,
    //         vehicleNumber: e.target.value,
    //     });
    // };

    // const onChangeSeatCapacity = (e: ChangeEvent<HTMLInputElement>) => {
    //     setVehicleData({
    //         ...vehicleData,
    //         seatCapacity: +e.target.value,
    //     });
    // };

    // const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    //     setVehicleData({
    //         ...vehicleData,
    //         image: e.target.value,
    //     });
    // };

    // const onChangeIsVehicleAC = (e: ChangeEvent<HTMLInputElement>) => {
    //     setVehicleData({
    //         ...vehicleData,
    //         isVehicleAC: e.target.checked,
    //     });
    // };

    // const onChangeIsVehicleSleeper = (e: ChangeEvent<HTMLInputElement>) => {
    //     setVehicleData({
    //         ...vehicleData,
    //         isVehicleSleeper: e.target.checked,
    //     });
    // };

    const saveVehicle = () => {
        // dataService.addVehicle(vehicleData)
        //     .then((response: any) => {
        //         setVehicleData({
        //             vid: response.data.vid,
        //             image: response.data.image,
        //             s3ImageUrl: response.data.s3ImageUrl,
        //             isVehicleAC: response.data.isVehicleAC,
        //             isVehicleSleeper: response.data.isVehicleSleeper,
        //             seatCapacity: response.data.seatCapacity,
        //             vehicleNumber: response.data.vehicleNumber,
        //         });
        //         setVehicleAdded(true);
        //         console.log(response.data);
        //     })
        //     .catch((e: Error) => {
        //         console.log(e);
        //     });
    };

    const newVehicle = () => {
        // setVehicleData({
        //     vid: null,
        //     image: "",
        //     isVehicleAC: false,
        //     isVehicleSleeper: false,
        //     s3ImageUrl: "",
        //     seatCapacity: 0,
        //     vehicleNumber: "",
        // });
        setVehicleAdded(false);
    };

    return (
        <div>
            <div className="submit-form">
                {vehicleAdded ? (
                    <div>
                        <h4>Vehicle Added successfully!</h4>
                        <button className="btn btn-success" onClick={newVehicle}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        {/* <div className="form-group">
                            <label htmlFor="vehicleNumber">Vehicle Number</label>
                            <input
                                type="text"
                                className="form-control"
                                id="vehicleNumber"
                                required
                                value={vehicleNumber}
                                onChange={onChangeVehicleNumber}
                                name="vehicleNumber"
                            />
                        </div> */}

                        {/* <div className="form-group">
                            <label htmlFor="seatCapacity">Seat Capacity</label>
                            <input
                                type="text"
                                className="form-control"
                                id="seatCapacity"
                                required
                                value={seatCapacity}
                                onChange={onChangeSeatCapacity}
                                name="seatCapacity"
                            />
                        </div> */}

                        {/* <div className="form-group">
                            <label htmlFor="image">Image</label>
                            <input
                                type="file"
                                className="form-control"
                                id="image"
                                required
                                value={image}
                                onChange={onChangeImage}
                                name="image"
                            />
                        </div> */}

                        {/* <div className="form-group">
                            <label htmlFor="isVehicleAC">AC</label>
                            <input
                                type="checkbox"
                                className="form-control"
                                id="isVehicleAC"
                                required
                                checked={isVehicleAC}
                                onChange={onChangeIsVehicleAC}
                                name="isVehicleAC"
                            />
                        </div> */}

                        {/* <div className="form-group">
                            <label htmlFor="isVehicleSleeper">Sleeper</label>
                            <input
                                type="checkbox"
                                className="form-control"
                                id="isVehicleSleeper"
                                required
                                checked={isVehicleSleeper}
                                onChange={onChangeIsVehicleSleeper}
                                name="isVehicleSleeper"
                            />
                        </div> */}

                        <button onClick={saveVehicle} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
export default AddVehicleDel

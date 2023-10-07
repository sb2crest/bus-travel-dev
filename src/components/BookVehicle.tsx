import React, { useState, ChangeEvent } from "react";
import IVehicleData from "../types/vehicle.type";
import DataService from "../services/data.service";

interface Props { }

interface State {
    vehicleData: IVehicleData;
    vehicleAdded: boolean;
    phoneNumber: string;
    otp: string;
    sentOtp: string | null;
    otpVerified: boolean;
}

const initialVehicleData: IVehicleData = {
    vid: null,
    seatCapacity: 0,
    vehicleNumber: "",
    image: "",
    s3ImageUrl: "",
    isVehicleAC: false,
    isVehicleSleeper: false,
    sentOtp: null,
    published: false
};

const BookVehicle: React.FC<Props> = () => {
    const [state, setState] = useState<State>({
        vehicleData: initialVehicleData,
        vehicleAdded: false,
        phoneNumber: "",
        otp: "",
        otpVerified: false,
        sentOtp: null,
    });

    const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, phoneNumber: event.target.value });
    };

    const handleOTPChange = (event: ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, otp: event.target.value });
    };

    const handleSendOTP = () => {
        // DataService.handleSendOTP()
        //     .then((response) => {
        //         if (response.data) {
        //             setState({ ...state, sentOtp: response.data.sentOtp });
        //             console.log("OTP Sent!");
        //         } else {
        //             console.log("Failed to send OTP.");
        //         }
        //     })
        //     .catch((error) => {
        //         console.error("Error sending OTP:", error);
        //         console.log("An error occurred while sending OTP.");
        //     });
    };

    const handleVerifyOTP = () => {
        // DataService.handleVerifyOTP()
        //     .then((response) => {
        //         if (response.data) {
        //             setState({ ...state, otpVerified: true });
        //             console.log("OTP Verified!");
        //         } else {
        //             console.log("OTP Verification Failed!");
        //         }
        //     })
        //     .catch((error) => {
        //         console.error("Error validating OTP:", error);
        //     });
    };

    return (
        <form className="container mt-4">
            <h1 className="mb-4">Book Bus</h1>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your phone number"
                    value={state.phoneNumber}
                    onChange={handlePhoneNumberChange}
                />
            </div>
            <div className="mb-3">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSendOTP}
                >
                    Send OTP
                </button>
            </div>
            {state.sentOtp && <p className="mb-3">Sent OTP: {state.sentOtp}</p>}
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter OTP"
                    value={state.otp}
                    onChange={handleOTPChange}
                />
            </div>
            <div className="mb-3">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleVerifyOTP}
                >
                    Verify OTP
                </button>
            </div>
            {state.otpVerified && (
                <p className="mb-3 text-success">OTP Verified!</p>
            )}
        </form>
    );
};

export default BookVehicle;

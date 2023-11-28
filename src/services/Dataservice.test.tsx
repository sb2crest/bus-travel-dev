import DataService from "./data.service";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import IBookNowRequest from "../types/BookNow/request.type";

describe("DataService", () => {
  const mock = new MockAdapter(axios);
  const mockData = [
    {
      vehicleNumber: "KA01HJ1234",
      seatCapacity: 12,
      s3ImageUrl: [],
      isVehicleAC: true,
      isVehicleSleeper: true,
      image: null,
      driverName: "Suresh ",
      driverNumber: "123455666",
      alternateNumber: "7982726663",
      emergencyNumber: "2762762576",
    },
  ];
  afterEach(() => {
    mock.reset();
  });
  it("should handle network error for getInTouch method", async () => {
    const data = {
      email: "Nikhil@gmail.com",
      name: "nikhil",
      message: "wertyuiodfghjkdfgh",
    };
    const response = DataService.getInTouch(data);
    const baseURL =
      "http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com/";
    mock.onPost(`${baseURL}getInTouch`).networkError();
    await expect(response).rejects.toThrow("Network Error");
  });

  it("should handle network error for createPayment method", async () => {
    const data = {
      bookingId: "NTf4dc",
      mobile: "7899434655",
      amount: 100.0,
    };
    const response = DataService.createPayment(data);
    const baseURL =
      "http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com/";
    mock.onPost(`${baseURL}createPayment`).networkError();
    await expect(response).rejects.toThrow("Network Error");
  });
  it("should handle network error for deleteVehicle method", async () => {
    const id = 123;
    const response = DataService.deleteVehicle(id);
    const baseURL =
      "http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com/";
    mock.onDelete(`${baseURL}deleteVehicle/${id}`).networkError();
    await expect(response).rejects.toThrow("Network Error");
  });

  it("should handle network error for listVehicles method", async () => {
    const response = DataService.listVehicles();
    const baseURL =
      "http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com/";
    mock.onGet(`${baseURL}listVehicles`).networkError();
    await expect(response).rejects.toThrow("Network Error");
  });
  it("should handle network error for verifyPayment method", async () => {
    const data = {
      razorPayPaymentId: "pay_Mx4b14FljOhtGN",
      razorPayOrderId: "order_Mx4aen2vXoAlWG",
      razorPaySignature:
        "b7f43d7cc430e332588f3e669acf504293475286c8f430f06eb642b6d528bf5b",
    };
    const response = DataService.verifyPayment(data);
    const baseURL =
      "http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com/";
    mock.onPost(`${baseURL}verifyPayment`).networkError();
    await expect(response).rejects.toThrow("Network Error");
  });

  it("should handle network error for sendOTP method", async () => {
    const mobile = "1234567890";
    const response = DataService.sendOTP(mobile);
    const baseURL =
      "http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com/";
    mock.onPost(`${baseURL}sendOTP?mobile=${mobile}`).networkError();
    await expect(response).rejects.toThrow("Network Error");
  });

  it("should handle network error for verifyOTP method", async () => {
    const data = { message: "Successfully validated", statusCode: 200 };
    const response = DataService.verifyOTP(data);
    const baseURL =
      "http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com/";
    mock.onPost(`${baseURL}validateOTP`).networkError();
    await expect(response).rejects.toThrow("Network Error");
  });

  it("should handle network error for bookingInfo method", async () => {
    const mobile = "9876543210";
    const response = DataService.bookingInfo(mobile);
    const baseURL =
      "http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com/";
    mock.onGet(`${baseURL}getBookingInfo?mobile=${mobile}`).networkError();
    await expect(response).rejects.toThrow("Network Error");
  });

  it("should handle network error for filter method", async () => {
    const data = {
      filter: "AC/SS,NS",
      fromDate: "01-01-2025",
      toDate: "01-01-2025",
    };
    const response = DataService.filter(data);
    const baseURL =
      "http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com/";
    mock.onPost(`${baseURL}getVehicleAvailability`).networkError();
    await expect(response).rejects.toThrow("Network Error");
  });
  it("should handle network error for bookNow method", async () => {
    const data: IBookNowRequest = {
      vehicleNumber: "KA01HJ1234",
      fromDate: "2023-12-01",
      toDate: "2023-12-05",
      user: {
        firstName: "John",
        middleName: "",
        lastName: "Doe",
        mobile: "1234567890",
        email: "john.doe@example.com",
      },
      slot: {
        vehicleNumber: "KA01HJ1234",
        fromDate: "2023-12-01",
        toDate: "2023-12-05",
      },
    };
    const response = DataService.bookNow(data);
    const baseURL =
      "http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com/";
    mock.onPost(`${baseURL}booking`).networkError();
    await expect(response).rejects.toThrow("Network Error");
  });
  it("should handle network error for getVehicle method", async () => {
    const vehicleId = "123";
    const response = DataService.getVehicle(vehicleId);
    const baseURL = "http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com/";
    mock.onGet(`${baseURL}getVehicle/${vehicleId}`).networkError();
    await expect(response).rejects.toThrow("Network Error");
  });

//   it("should handle network error for updateVehicle method", async () => {
//     const vehicleId = "123";
//     const data = { /* your data here */ };
//     const response = DataService.updateVehicle(data, vehicleId);
//     const baseURL = "http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com/";
//     mock.onPut(`${baseURL}updateVehicle/${vehicleId}`).networkError();
//     await expect(response).rejects.toThrow("Network Error");
//   });

  it("should handle network error for deleteAll method", async () => {
    const response = DataService.deleteAll();
    const baseURL = "http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com/";
    mock.onDelete(`${baseURL}deleteAll`).networkError();
    await expect(response).rejects.toThrow("Network Error");
  });
});

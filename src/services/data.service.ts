import http from "../http-common";
import IOTPData from "../types/otp.type";
import IVehicleData from "../types/vehicle.type";
import ListVehicle from "../types/list.type";
import IPaymentRequest from "../types/payment/payment.request.type";
import IGetInTouch from "../types/getInTouch.type";
import IVerifyPayment from "../types/payment/VerifyPayment.type";
import IFilterRequest from "../types/filter/request.type";
import IBookNowRequest from "../types/BookNow/request.type";
import IBookingInfoRequest from "../types/BookingInfo/request.type";
class DataService {

  // Book now
  bookNow(data: IBookNowRequest) {
    return http.post<IBookNowRequest>('booking', data);
  }

  // listVehicles
  listVehicles() {
    return http.get<Array<ListVehicle>>('listVehicles');
  }

  // getInTouch
  getInTouch(data: IGetInTouch) {
    return http.post<IGetInTouch>("getInTouch", data);
  }
  // create Payment
  createPayment(data: IPaymentRequest) {
    return http.post<IPaymentRequest>('createPayment', data);
  }

  // verify Payment
  verifyPayment(data: IVerifyPayment) {
    return http.post<IVerifyPayment>('verifyPayment', data);
  }

  // Send OTP
  sendOTP(mobile: string) {
    return http.post<IVehicleData>('sendOTP?mobile=' + mobile);
  }

  // Verify OTP
  verifyOTP(data: any) {
    return http.post<IVehicleData>("validateOTP", data);
  }

  // bookingInfo
  bookingInfo(mobile: string) {
    return http.get<IBookingInfoRequest>("getBookingInfo?mobile=" + mobile);
  }

  // filter 
  filter(data: IFilterRequest) {
    return http.post<IFilterRequest>("getVehicleAvailability", data);
  }

  // deleteVehicle
  deleteVehicle(id: any) {
    return http.delete<any>(`deleteVehicle/${id}`);
  }

  // deleteAll
  deleteAll() {
    return http.delete<any>('deleteAll');
  }

  // getVehicle
  getVehicle(id: string) {
    return http.get<IVehicleData>(`getVehicle/${id}`);
  }

  // updateVehicle
  updateVehicle(data: IVehicleData, id: any) {
    return http.put<any>(`updateVehicle/${id}`, data);
  }
}

export default new DataService();
import http from "../http-common";
import IOTPData from "../types/otp.type";
import IVehicleData from "../types/vehicle.type";
import ListVehicle from "../types/list.type";
import IBookingInfoRequest from "../types/bookinginfo/request.type";
import IBookNowRequest from "../types/booknow/request.type";
import IPaymentRequest from "../types/payment/payment.request.type";
import IGetInTouch from "../types/getInTouch.type";
class DataService {

  //Book now
  bookNow(data:IBookNowRequest){
    return http.post<IBookNowRequest>('booking',data);
  }

  //listVehicles
  listVehicles() {
    return http.get<Array<ListVehicle>>('listVehicles');
  }

  // addVehicle
  addVehicle(data: IVehicleData) {
    return http.post<IVehicleData>("addVehicle", data);
  }
 // getInTouch
 getInTouch(data: IGetInTouch) {
  return http.post<IGetInTouch>("getInTouch", data);
}
  //create Payment
  createPayment(data :IPaymentRequest){
    return http.post<IPaymentRequest>('createPayment',data);
  }

  //Send OTP
  sendOTP(mobile: string) {
    return http.post<IVehicleData>('sendOTP?mobile=' + mobile);
  }

  // Verify OTP
  verifyOTP(data: any) {
    return http.post<IVehicleData>("validateOTP", data);
  }

  // Resend OTP // it is not required
  // handleResendClick(mobile: string){
  //   return http.post<IVehicleData>('sendOTP?mobile=' + mobile);
  // }

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

  // bookingInfo
  bookingInfo(bookingID: string) {
    return http.get<IBookingInfoRequest>("getBookingInfoByBookingId?bookingId=" +bookingID);
  }
}

export default new DataService();
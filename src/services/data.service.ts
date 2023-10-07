import http from "../http-common";
import IOTPData from "../types/otp.type";
import IVehicleData from "../types/vehicle.type";

class DataService {
  //listVehicles
  listVehicles() {
    return http.get<Array<IVehicleData>>("listVehicles");
  }

  // addVehicle
  addVehicle(data: IVehicleData) {
    return http.post<IVehicleData>("addVehicle", data);
  }

  //Send OTP
  sendOTP(mobile: string) {
    return http.post<IVehicleData>('sendOTP?mobile=' + mobile);
  }

  // Verify OTP
  verifyOTP( data:any) {
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

  // getVehicle
  getVehicle(id: string) {
    return http.get<IVehicleData>(`getVehicle/${id}`);
  }

  //updateVehicle
  updateVehicle(data: IVehicleData, id: any) {
    return http.put<any>(`updateVehicle/${id}`, data);
  }

  //generateOTP
  generateOTP(mobile: string) {
    return http.post<IOTPData>("sendOTP", mobile);
  }

  //validateOTP
  validateOTP(data: IOTPData) {
    return http.post<IOTPData>("validateOTP", data);
  }
}

export default new DataService();
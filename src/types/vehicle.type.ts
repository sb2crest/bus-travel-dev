export default interface IVehicleData {
  vid?: any | null,
  seatCapacity: number,
  vehicleNumber: string,
  image: string,
  s3ImageUrl: string,
  isVehicleAC: boolean,
  isVehicleSleeper: boolean,
  sentOtp: string | null
  published: boolean
}
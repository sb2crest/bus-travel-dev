export  default interface ListVehicle {
  totalAmount: number;
  advanceAmt: number;
  remainingAmt: number;
  vehicleNumber: string;
  seatCapacity: number;
  s3ImageUrl: string[];
  vehicleAC: string;
  sleeper: string;
  image: string | null;
  driverName: string | null;
  driverNumber: string | null;
  alternateNumber: string | null;
  emergencyNumber: string | null;
}
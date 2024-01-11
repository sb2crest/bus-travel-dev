export default interface IFilterResponse {
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
    totalAmount: number;
    advanceAmt: number;
    remainingAmt: number;
    amtPerKM: number | null; 
    source: string;
    destination: string;
}
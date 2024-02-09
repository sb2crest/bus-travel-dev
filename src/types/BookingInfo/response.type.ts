export default interface IBookingInfoResponse {
  bookingId: string;
  bookingDate: string;
  bookingStatus: string;
  vehicle: {
    vehicleNumber: string;
    seatCapacity: number;
    s3ImageUrl: string | null;
    vehicleAC: string;
    sleeper: string;
    image: string | null;
    driverName: string | null;
    driverNumber: string | null;
    alternateNumber: string | null;
    emergencyNumber: string | null;
    totalAmount: number | null;
    advanceAmt: number | null;
    remainingAmt: number | null;
    amtPerKM: number | null;
    source: string | null;
    destination: string | null;
  };
  user: {
    firstName: string;
    middleName: string | null;
    lastName: string;
    mobile: string;
    email: string;
  };
  slots: {
    vehicleNumber: string | null;
    fromDate: string;
    toDate: string;
  };
  remainingAmt: number;
  totalAmt: number;
  advancedPaid: number;
}

export interface IBookingList {
  bookedList: IBookingInfoResponse[];
  completedList: IBookingInfoResponse[];
  enquiryList: IBookingInfoResponse[];
  declineList: IBookingInfoResponse[];
}

export default interface IBookNowRequest {
    vehicleNumber: string,
    fromDate: string | null;
  toDate: string | null;
    user: {
        firstName: string,
        middleName: string,
        lastName: string,
        mobile: string,
        email: string
    },
    slot: {
        vehicleNumber: string,
        fromDate: string | null;
        toDate: string | null;
    }
}
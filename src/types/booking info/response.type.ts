export default interface IBookingInfoResponse {
    bookingID: string,
    driverName: string,
    driverNumber: string,
    alternateNumber: string,
    vehicleNumber: string,
    fromDate: Date,
    toDate: Date,
    bookingDate: Date
}
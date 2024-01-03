
export default interface ICalendarResponse{
    slots: {
        vehicleNumber: string;
        dates: Array<{
            date: string;
            isBooked: boolean;
        }>;
    };
}
export default interface IFilterRequest {
  fromDate: string | null;
  toDate: string | null;
  filter: string;
  distanceRequest: {
    source: string;
    destination: string;
    sourceLatitude: number;
    sourceLongitude: number;
    destinationLatitude: number;
    destinationLongitude: number;
    multipleDestination: boolean;
  };
}

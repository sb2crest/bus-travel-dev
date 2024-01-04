export default interface IEventTypeRequest {
  source: string;
  destination: string | null;
  sourceLatitude: number;
  sourceLongitude: number;
  destinationLatitude: number;
  destinationLongitude: number;
  multipleDestination: boolean;
}

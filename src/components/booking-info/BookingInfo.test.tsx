// import { render, screen, act, waitFor, fireEvent } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import { MemoryRouter } from "react-router-dom";
// import nock from 'nock';
// import BookingInfo from "./BookingInfo";
// import userEvent from "@testing-library/user-event";

// describe('Booking Info', () => {
//   test("renders with initial state", () => {
//     render(
//       <MemoryRouter>
//         <BookingInfo />
//       </MemoryRouter>
//     );
//   });

//   it('checks if returned data from OTP API rendered into component', async () => {
//     nock('http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com')
//       .defaultReplyHeaders({
//         'access-control-allow-origin': '*',
//       })
//       .post('/sendOTP?mobile=9999999999')
//       .reply(200, { "message": "OTP sent successfully.", "statusCode": 200 });

//     render(<BookingInfo />);

//     await waitFor(() => {
//       const verifyOTP = screen.getByRole('button');
//       expect(
//         verifyOTP
//       ).toBeInTheDocument();
//     });
//   });

//   test('triggers verifyOTP function when verify OTP button is clicked', async () => {
//     nock('http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com')
//       .defaultReplyHeaders({
//         'access-control-allow-origin': '*',
//       })
//       .post('/validateOTP')
//       .reply(200, { "message": "Successfully validated", "statusCode": 200 });

//     render(<BookingInfo />);

//     await waitFor(() => {
//       const showDetails = screen.getByRole('button');
//       expect(
//         showDetails
//       ).toBeInTheDocument();
//     });
//   });

//   test('triggers bookingInfo function when show details button is clicked', async () => {
//     nock('http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com')
//       .defaultReplyHeaders({
//         'access-control-allow-origin': '*',
//       })
//       .post('/getBookingInfo?mobile=7019941358')
//       .reply(200, { "message": "Successfully validated", "statusCode": 200 });

//     render(<BookingInfo />);

//     await waitFor(() => {
//       expect(screen.getByText('Booking Details')).toBeInTheDocument();
//     });
//   });

//   test('enters a valid phone number', () => {
//     render(<BookingInfo />);

//     const phoneNumberInput = screen.getByPlaceholderText('Phone Number') as HTMLInputElement;
//     fireEvent.change(phoneNumberInput, { target: { value: '7019941358' } });

//     expect(phoneNumberInput.value).toBe('7019941358');

//     const errorElement = screen.queryByText('Phone number must be exactly 10 digits');
//     expect(errorElement).not.toBeInTheDocument();

//     expect(screen.queryByText('Phone number is required')).not.toBeInTheDocument();
//   });

//   test('renders a snackbar when otp is sent', async () => {
//     nock('http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com')
//       .defaultReplyHeaders({
//         'access-control-allow-origin': '*',
//       })
//       .post('/sendOTP?mobile=9999999999')
//       .reply(200, { "message": "OTP sent successfully.", "statusCode": 200 });

//     render(<BookingInfo />);

//     await waitFor(() => {
//       const snackbarElement = screen.queryByTestId('snackbar');
//       expect(
//         snackbarElement
//       ).toBeInTheDocument();
//     });
//   });

//   test('renders Send OTP button initially', () => {
//     render(<BookingInfo />);

//     const sendOTPButton = screen.getByText('Send OTP');
//     expect(sendOTPButton).toBeInTheDocument();
//   });

//   test('renders Show Details button and calls bookingInfo on click', async () => {
//     render(<BookingInfo />);

//     const showDetails = screen.getByRole('button');

//     fireEvent.click(showDetails);

//     await waitFor(() => {
//       expect(screen.getByText('Booking Details')).toBeInTheDocument();
//     });
//   });

//   test('triggers resend function resend button is clicked', async () => {
//     nock('http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com')
//       .defaultReplyHeaders({
//         'access-control-allow-origin': '*',
//       })
//       .post('/sendOTP?mobile=9999999999')
//       .reply(200, { "message": "OTP sent successfully.", "statusCode": 200 });

//     render(<BookingInfo />)

//     await waitFor(() => {
//       const snackbarElement = screen.queryByTestId('snackbar');
//       expect(
//         snackbarElement
//       ).toBeInTheDocument();
//     });
//   });
// });
// // Ref - https://refine.dev/blog/mocking-api-calls-in-react/#nock-installation-and-configuration
// // Ref - https://github.com/nock/nock

import {
  render,
  fireEvent,
  waitFor,
  screen,
  prettyDOM,
} from "@testing-library/react";
import nock from "nock";
import BookingInfo from "./BookingInfo";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
const API_BASE_URL =
  "http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com";

const mockSendOTPResponse = {
  message: "OTP sent successfully.",
  statusCode: 200,
  otp:"123456"
};
const mockVerifyOTPResponse = {
  data: true,
};

const mockBookingInfoResponse = {
  bookingDetails: { 
    upcoming: [
      {
        driverName: "Suresh",
        driverNumber: "628387163",
        alternateNumber: "12345677889",
        vehicleNumber: "KA12V1235",
        fromDate: "24-11-2023",
        toDate: "24-11-2023",
        bookingDate: "Friday, November 24 2023",
        amount: 500000.0,
        bookingId: "NB276d25503",
        bookingStatus: "Booked",
        vehicleAC: "Non-AC",
        sleeper: "Semi-Sleeper",
        seatCapacity: 40,
        userName: "nikhil ss",
        mobile: "9535858675",
      },
    ],
    history: [],
  },
};

beforeAll(() => {
  nock(API_BASE_URL)
    .post("/sendOTP?mobile=6360120872")
    .reply(200, { mockSendOTPResponse })
    .defaultReplyHeaders({
      "access-control-allow-origin": "*",
      "origin": "http://localhost:8100", 
    });
  nock(API_BASE_URL).post("/verifyOTP").reply(200, mockVerifyOTPResponse);

  nock(API_BASE_URL)
    .get("/bookingInfo")
    .query(true)
    .reply(200, mockBookingInfoResponse);
});
afterAll(() => {
  nock.cleanAll();
});
describe("BookingInfo Component", () => {
  it("displays error message for invalid phone number input", async () => {
    render(<BookingInfo />);
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "invalid" },
    });
    fireEvent.click(screen.getByText("Send OTP"));
    await waitFor(() => {
      expect(screen.getByText("Phone number is required")).toBeInTheDocument();
    });
  });

  it("sends OTP successfully and displays success message with Snackbar", async () => {
    render(<BookingInfo />);
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "6360120872" }, 
    });
    fireEvent.click(screen.getByText("Send OTP"));
    await waitFor(() => {
      const successMessageElement = screen.getByTestId("snackbar");
      console.log("Actual Contents:", successMessageElement.textContent);
      expect(successMessageElement).toBeInTheDocument();
    });
  });
  it("verifies OTP successfully and displays success message with Snackbar", async () => {
  render(<BookingInfo />);
  
  // Mock the API call for sending OTP
  nock(API_BASE_URL)
    .post("/sendOTP?mobile=6360120872")
    .reply(200, mockSendOTPResponse);

  // Enter a valid phone number and click on "Send OTP" button
  fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
    target: { value: "6360120872" },
  });
  fireEvent.click(screen.getByText("Send OTP"));

  // Wait for the OTP input field to be visible
  await waitFor(() => {
    expect(screen.getByPlaceholderText("OTP")).toBeInTheDocument();
  });

  // Enter the mocked OTP and trigger the verify OTP function
  fireEvent.change(screen.getByPlaceholderText("OTP"), {
    target: { value: mockSendOTPResponse.otp },
  });
  fireEvent.click(screen.getByText("Verify OTP"));

  // Wait for the success message Snackbar to appear
  await waitFor(() => {
    const successMessageElement = screen.getByTestId("snackbar");
    expect(successMessageElement).toBeInTheDocument();
  });
});

});

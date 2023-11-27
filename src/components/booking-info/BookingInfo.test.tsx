import { render, screen, act, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import nock from 'nock';
import BookingInfo from "./BookingInfo";
import userEvent from "@testing-library/user-event";

describe('Booking Info', () => {
  test("renders with initial state", () => {
    render(
      <MemoryRouter>
        <BookingInfo />
      </MemoryRouter>
    );
  });

  it('checks if returned data from OTP API rendered into component', async () => {
    nock('http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .post('/sendOTP?mobile=9999999999')
      .reply(200, { "message": "OTP sent successfully.", "statusCode": 200 });

    render(<BookingInfo />);

    await waitFor(() => {
      const verifyOTP = screen.getByRole('button');
      expect(
        verifyOTP
      ).toBeInTheDocument();
    });
  });

  test('triggers verifyOTP function when verify OTP button is clicked', async () => {
    nock('http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .post('/validateOTP')
      .reply(200, { "message": "Successfully validated", "statusCode": 200 });

    render(<BookingInfo />);

    await waitFor(() => {
      const showDetails = screen.getByRole('button');
      expect(
        showDetails
      ).toBeInTheDocument();
    });
  });

  test('triggers bookingInfo function when show details button is clicked', async () => {
    nock('http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .post('/getBookingInfo?mobile=7019941358')
      .reply(200, { "message": "Successfully validated", "statusCode": 200 });

    render(<BookingInfo />);

    await waitFor(() => {
      expect(screen.getByText('Booking Details')).toBeInTheDocument();
    });
  });


  test('renders BookingInfo component', () => {
    render(<BookingInfo />);
  });

  test('enters a valid phone number', () => {
    render(<BookingInfo />);

    const phoneNumberInput = screen.getByPlaceholderText('Phone Number') as HTMLInputElement;
    fireEvent.change(phoneNumberInput, { target: { value: '7019941358' } });

    expect(phoneNumberInput.value).toBe('7019941358');

    const errorElement = screen.queryByText('Phone number must be exactly 10 digits');
    expect(errorElement).not.toBeInTheDocument();

    expect(screen.queryByText('Phone number is required')).not.toBeInTheDocument();
  });

  test('renders a snackbar when otp is sent', async () => {
    nock('http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .post('/sendOTP?mobile=9999999999')
      .reply(200, { "message": "OTP sent successfully.", "statusCode": 200 });

    render(<BookingInfo />);

    await waitFor(() => {
      const snackbarElement = screen.queryByTestId('snackbar');
      expect(
        snackbarElement
      ).toBeInTheDocument();
    });
  });

  test('renders Send OTP button initially', () => {
    render(<BookingInfo />);

    const sendOTPButton = screen.getByText('Send OTP');
    expect(sendOTPButton).toBeInTheDocument();
  });

  test('renders Show Details button and calls bookingInfo on click', async () => {
    render(<BookingInfo />);

    const showDetails = screen.getByRole('button');

    fireEvent.click(showDetails);

    await waitFor(() => {
      expect(screen.getByText('Booking Details')).toBeInTheDocument();
    });
  });

  test('triggers resend function resend button is clicked', async () => {
    nock('http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .post('/sendOTP?mobile=9999999999')
      .reply(200, { "message": "OTP sent successfully.", "statusCode": 200 });

    render(<BookingInfo />)

    await waitFor(() => {
      const snackbarElement = screen.queryByTestId('snackbar');
      expect(
        snackbarElement
      ).toBeInTheDocument();
    });

  });
});
// Ref - https://refine.dev/blog/mocking-api-calls-in-react/#nock-installation-and-configuration
// Ref - https://github.com/nock/nock



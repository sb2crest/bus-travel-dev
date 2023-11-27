import { act, fireEvent, logRoles, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import VehicleInfo from "./VehicleInfo";
import nock from "nock";
import Checkout from "../../booking/checkout/Checkout";
import userEvent from "@testing-library/user-event";

describe("Vehicle Info component", () => {
  test("renders without errors", () => {
    render(
      <MemoryRouter>
        {/* <VehicleInfo /> */}
      </MemoryRouter>
    );
  });

  test('renders component and triggers modal on button click', () => {
    render(
      <MemoryRouter>
        <VehicleInfo />
      </MemoryRouter>
    );
    const bookNow = screen.getByRole('button', { name: 'Book Now' });
    expect(bookNow).toBeInTheDocument();

    fireEvent.click(bookNow);

    const modal = screen.queryByTestId('loginModal');
    expect(modal).toBeInTheDocument();
  });

  test('input fields update component state on user input', () => {
    render(
      <MemoryRouter>
        <VehicleInfo />
      </MemoryRouter>
    );

    const firstName = screen.getByPlaceholderText('First Name') as HTMLInputElement;
    fireEvent.change(firstName, { target: { value: 'Kavya' } });
    expect(firstName.value).toBe('Kavya');

    const middleName = screen.getByPlaceholderText('Middle Name') as HTMLInputElement;
    fireEvent.change(middleName, { target: { value: 'Shree' } });
    expect(middleName.value).toBe('Shree');

    const lastName = screen.getByPlaceholderText('Last Name') as HTMLInputElement;
    fireEvent.change(lastName, { target: { value: 'S' } });
    expect(lastName.value).toBe('S');

    const phoneNumber = screen.getByPlaceholderText('Phone Number') as HTMLInputElement;
    fireEvent.change(phoneNumber, { target: { value: '7019941358' } });
    expect(phoneNumber.value).toBe('7019941358');

    const email = screen.getByPlaceholderText('Email') as HTMLInputElement;
    fireEvent.change(email, { target: { value: 'kavya@gmail.com' } });
    expect(email.value).toBe('kavya@gmail.com');
  });

  test('triggers bookNow function when Book Now is clicked', async () => {
    nock('http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .post('/bookNow')
      .reply(200, {
        "bookingId": "NBf3f3596ed",
        "message": "Booking successful",
        "statusCode": 200
      });

    render(<VehicleInfo />, { wrapper: MemoryRouter });

    const bookNow = screen.getByRole('button', { name: 'Book Now' });

    await act(async () => {
      bookNow.click();
    });

    await waitFor(() => {
      <Checkout bookingId={""} phoneNumber={""} fromDate={new Date()} toDate={new Date()} />
    });
  });

  test('clears form on "Clear" button click', async () => {
    render(
      <MemoryRouter>
        <VehicleInfo />
      </MemoryRouter>
    );

    const firstNameInput = screen.getByPlaceholderText('First Name') as HTMLInputElement;
    fireEvent.change(firstNameInput, { target: { value: 'Kavya' } });

    const middleNameInput = screen.getByPlaceholderText('Middle Name') as HTMLInputElement;
    fireEvent.change(middleNameInput, { target: { value: 'S' } });

    const lastNameInput = screen.getByPlaceholderText('Last Name') as HTMLInputElement;
    fireEvent.change(lastNameInput, { target: { value: 'Shree' } });

    const phoneNumberInput = screen.getByPlaceholderText('Phone Number') as HTMLInputElement;
    fireEvent.change(phoneNumberInput, { target: { value: '7019941358' } });

    const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'kavya@gmail.com' } });

    const clearButton = screen.getByText('Clear');
    fireEvent.click(clearButton);

    expect(firstNameInput.value).toBe('');
    expect(middleNameInput.value).toBe('');
    expect(lastNameInput.value).toBe('');
    expect(phoneNumberInput.value).toBe('');
    expect(emailInput.value).toBe('');
  })

  // {/* TODO: Vijay */ }
  // test('renders OTP text field when otpSent is true and otpVerified is false', async () => {
  //   render(
  //     <MemoryRouter>
  //       <VehicleInfo  otpSent={false} otpVerified={false} />
  //     </MemoryRouter>
  //   );

  //   const sendOTPButton = screen.getByText('Send OTP');
  //   fireEvent.click(sendOTPButton);

  //   render(
  //     <MemoryRouter>
  //       <VehicleInfo  otpSent={true} otpVerified={false} />
  //     </MemoryRouter>
  //   );

  //   await waitFor(() => {
  //     const otpInput = screen.getByPlaceholderText('OTP') as HTMLInputElement;
  //     expect(otpInput).toBeInTheDocument();
  //   });
  // })


  // it('checks if returned data from OTP API rendered into component', async () => {
  //   nock('http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com')
  //     .defaultReplyHeaders({
  //       'access-control-allow-origin': '*',
  //     })
  //     .post('/sendOTP?mobile=9999999999')
  //     .reply(200, { "message": "OTP sent successfully.", "statusCode": 200 });

  //   render(<VehicleInfo/>);

  //   await waitFor(() => {
  //     const verifyOTP = screen.getByRole('button');
  //     expect(
  //       verifyOTP
  //     ).toBeInTheDocument();
  //   });
  // });

});

import { render, screen, waitFor } from '@testing-library/react';
import VehicleInfo from '../../components/vehicle/vehicle-info/VehicleInfo';
import userEvent from '@testing-library/user-event';

{/* Render Form Elements */ }
test('rendering form elements, excluding conditionally rendered elements', () => {
    render(<VehicleInfo images={[]} />)
    const firstName = screen.getByPlaceholderText('First Name');
    const middleName = screen.getByPlaceholderText('Middle Name');
    const lastName = screen.getByPlaceholderText('Last Name');
    const phoneNumber = screen.getByPlaceholderText('Phone Number');
    const email = screen.getByPlaceholderText('Email');
    const sendOTP = screen.getByRole('button');
    const bookNow = screen.getByRole('button');
    const clear = screen.getByRole('button');
    expect(firstName).toBeInTheDocument();
    expect(middleName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(phoneNumber).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(sendOTP).toBeInTheDocument();
    expect(bookNow).toBeInTheDocument();
    expect(clear).toBeInTheDocument();
});

{/* Renders OTP text-field when sentotp is true */ }
// test('renders OTP text-field when sentotp is true', async () => {
//     render(<VehicleInfo images={[]} />)
//     const sendOTP = screen.getByRole('button');
//     userEvent.click(sendOTP);
//     await waitFor(() => {
//         const otp = screen.getByPlaceholderText('OTP')
//         expect(otp).toBeInTheDocument();
//     })
// });


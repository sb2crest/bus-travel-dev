import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import VehicleInfo from '../VehicleInfo';
import userEvent from '@testing-library/user-event';
import { verify } from 'crypto';

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
interface RenderOTPFieldProps {
    otpSent?: boolean;
    otpVerified?: boolean;
}

// function renderOTPField({otpSent,otpVerified}:RenderOTPFieldProps) {
//     render(<VehicleInfo images={[]} />)
//     return {
//         sendOtp: screen.getByText('Send OTP'),
//         otp: {
//             get otpInput() {
//                 return screen.getByPlaceholderText('OTP');
//             }
//             // get verify() {
//             //     return screen.queryByText('Verify');
//             // }
//         }
//     }
// }
// it("renders OTP input field otpSent is true ", ({}) => {
//     const { sendOtp, otp } = renderOTPField({ otpSent: true, otpVerified: false });
//     fireEvent.click(sendOtp);
//     expect(otp).toBeInTheDocument();
// })


// describe("Testing the behavior of form in VehicleInfo", () => {
//     it("renders OTP input and verify button when otpSent is true and otpVerified is false", async () => {
//         const { otp, verifyOtp } = renderOTPField({ otpSent: true, otpVerified: false });
//         await waitFor(() => {
//             expect(otp).toBeInTheDocument();
//             expect(verifyOtp).toBeInTheDocument();
//         });
//     })
//     it('renders Send OTP button when otpSent is false', () => {
//         const { sendOtp } = renderOTPField({ otpSent: false });
//         expect(sendOtp).toBeInTheDocument();
//     });
// })


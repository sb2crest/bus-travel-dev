import { render, screen, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import nock from 'nock';
import BookingInfo from "./BookingInfo";

describe('Booking Info', () => {
    it('checks if the "Send OTP" button triggers the API call and shows success message', async () => {
        nock('http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com')
            .defaultReplyHeaders({
                'access-control-allow-origin': '*',
            })
            .post('/sendOTP?mobile=9999999999')
            .reply(200, { "message": "OTP sent successfully.", "statusCode": 200 });

        render(<BookingInfo />, { wrapper: MemoryRouter });

        const sendOTPButton = screen.getByText('Send OTP');

        await act(async () => {
            sendOTPButton.click();
        });

        // Add assertions to check if the success message is displayed
        await waitFor(() => {
            const successMessage = screen.getByText('OTP Sent successfully!');
            expect(successMessage).toBeInTheDocument();
        });
    });

    it('checks if the "Verify OTP" button triggers the API call and shows success message', async () => {
        nock('http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com')
            .defaultReplyHeaders({
                'access-control-allow-origin': '*',
            })
            .post('/verifyOTP')
            .reply(200, { "message": "OTP verified successfully.", "statusCode": 200 });

        render(<BookingInfo />, { wrapper: MemoryRouter });

        // Simulate sending OTP first
        const sendOTPButton = screen.getByText('Send OTP');
        await act(async () => {
            sendOTPButton.click();
        });

        // Simulate entering OTP and verifying
        const verifyOTPButton = screen.getByText('Verify OTP');
        await act(async () => {
            verifyOTPButton.click();
        });

        // Add assertions to check if the success message is displayed
        await waitFor(() => {
            const successMessage = screen.getByText('Verification Successful');
            expect(successMessage).toBeInTheDocument();
        });
    });

    it('checks if the "Resend" button triggers the API call and shows success message', async () => {
        nock('http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com')
            .defaultReplyHeaders({
                'access-control-allow-origin': '*',
            })
            .post('/sendOTP?mobile=9999999999')
            .reply(200, { "message": "OTP resent successfully.", "statusCode": 200 });

        render(<BookingInfo />, { wrapper: MemoryRouter });

        // Simulate sending OTP first
        const sendOTPButton = screen.getByText('Send OTP');
        await act(async () => {
            sendOTPButton.click();
        });

        // Simulate clicking the "Resend" button
        const resendButton = screen.getByText('Resend');
        await act(async () => {
            resendButton.click();
        });

        // Add assertions to check if the success message is displayed
        await waitFor(() => {
            const successMessage = screen.getByText('OTP Resent!');
            expect(successMessage).toBeInTheDocument();
        });
    });
});

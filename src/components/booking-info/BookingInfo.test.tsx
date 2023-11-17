import { render, screen, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Video from "../../assets/images/final.mp4";

import jest from 'jest-mock';


import nock from 'nock';
import BookingInfo from "./BookingInfo";

// describe('expectedData', () => {
//     it('checks if returned data from API rendered into component', async () => {
//         render(<BookingInfo />);

//         await waitFor(() => {
//             expect(screen.getByText("/value from the api")).toBeInTheDocument();
//         });
//     });
// });

describe('Booking Info', () => {
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
            // console.log('1111', verifyOTP);
            expect(
                verifyOTP
            ).toBeInTheDocument();
        });
    });
});

// Ref - https://refine.dev/blog/mocking-api-calls-in-react/#nock-installation-and-configuration
// Ref - https://github.com/nock/nock

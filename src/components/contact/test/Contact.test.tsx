import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Map from '../Map';
import Contact from '../Contact';
import Form from '../Form';
import nock from 'nock';
import dataService from '../../../services/data.service';

{/*Map */ }
test("renders Google Map iframe", () => {
    render(<Map />)
    const googleMapIframe = screen.getByTitle('Google Map');
    expect(googleMapIframe).toBeInTheDocument();
})

{/* Contact */ }
test("renders contact cards", () => {
    render(<Contact />)
    const emailSection = screen.getByText(/Email/i);
    expect(emailSection).toBeInTheDocument();
    const emailAddress = screen.getByText(/info@seabed2crest.com/i);
    expect(emailAddress).toBeInTheDocument();
    const phoneSection = screen.getByText(/Phone/i);
    expect(phoneSection).toBeInTheDocument();
    const phoneNumber1 = screen.getByText(/7349368311/i);
    const phoneNumber2 = screen.getByText(/7979699428/i);
    expect(phoneNumber1).toBeInTheDocument();
    expect(phoneNumber2).toBeInTheDocument();
    const addressSection = screen.getByText(/Address/i);
    expect(addressSection).toBeInTheDocument();
    const address = screen.getByText(/102, 1st floor, AjjeGowdru Nilaya, 7th A Cross Rd, Yelahanka Satellite Town, Yelahanka, Bengaluru, Karnataka 560064/i);
    expect(address).toBeInTheDocument();
})

{/* Form */ }


describe("Testing Form Component", () => {
    it("renders form elements", () => {
        render(<Form />)
        const name = screen.getByLabelText(/Enter your name/i);
        expect(name).toBeInTheDocument();
        const email = screen.getByLabelText(/Enter your email/i);
        expect(email).toBeInTheDocument();
        const message = screen.getByLabelText(/Enter your message/i);
        expect(message).toBeInTheDocument();
        const getInTouchButton = screen.getByRole('button', { name: /Get In Touch/i });
        expect(getInTouchButton).toBeInTheDocument();
    });

    // it('calls getInTouch() function when getInTouch button is clicked', async () => {
    //     // Mocking the API request
    //     nock('http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com')
    //         .defaultReplyHeaders({
    //             'access-control-allow-origin': '*',
    //         })
    //         .post('/getInTouch')
    //         .reply(200, { "message": "Email sent successfully." });

    //     // Setting up a mock implementation for getInTouch
    //     const getInTouchMock = jest.fn().mockResolvedValue({
    //         status: 200,
    //         statusText: 'OK',
    //         headers: {},
    //         config: {},
    //         data: {
    //             name: 'Kavya',
    //             email: 'kavya@example.com',
    //             message: 'Test message',
    //         },
    //     });

    //     dataService.getInTouch = getInTouchMock;

    //     render(<Form />);

    //     fireEvent.change(screen.getByLabelText('Enter your name'), { target: { value: 'Kavya' } });
    //     fireEvent.change(screen.getByLabelText('Enter your email'), { target: { value: 'kavya@example.com' } });
    //     fireEvent.change(screen.getByLabelText('Enter your message'), { target: { value: 'Test message' } });

    //     fireEvent.click(screen.getByRole('button', { name: 'Get In Touch' }));

    //     await waitFor(() => {
    //         expect(getInTouchMock).toHaveBeenCalledTimes(1);
    //         expect(getInTouchMock).toHaveBeenCalledWith({
    //             name: 'Kavya',
    //             email: 'kavya@example.com',
    //             message: 'Test message',
    //         });
    //     });
    // });
})
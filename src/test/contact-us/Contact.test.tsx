import { render, screen } from '@testing-library/react';
import Map from '../../components/contact/Map';
import Contact from '../../components/contact/Contact';
import Form from '../../components/contact/Form';

{/*Map */ }
test("renders Google Map iframe", () => {
    render(<Map />)
    const googleMapIframe = screen.getByTitle('Google Map');
    expect(googleMapIframe).toBeInTheDocument();
})

{/* Contact */ }
test("renders contact cards", () => {
    render(<Contact />)
    const header = screen.getByRole('heading', { name: /Contact Details/i });
    expect(header).toBeInTheDocument();
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
        const writeHere = screen.getByText(/write here/i);
        expect(writeHere).toBeInTheDocument();
        const heading = screen.getByRole('heading', { name: /Get In Touch/i });
        expect(heading).toBeInTheDocument();
        const name = screen.getByLabelText(/Enter your name/i);
        expect(name).toBeInTheDocument();
        const email = screen.getByLabelText(/Enter your email/i);
        expect(email).toBeInTheDocument();
        const message = screen.getByLabelText(/Enter your message/i);
        expect(message).toBeInTheDocument();
        const getInTouchButton = screen.getByRole('button', { name: /Get In Touch/i });
        expect(getInTouchButton).toBeInTheDocument();
    })

})
import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Checkout from "./Checkout";
import nock from "nock";

describe("Checkout component", () => {
  test("renders without errors", () => {
    render(
      <MemoryRouter>
        <Checkout bookingId="cx1212" phoneNumber="9999999999" fromDate={new Date()} toDate={new Date()} />
      </MemoryRouter>
    );
  });

  test('displays fare details when "Show Fare Details" is clicked and hides when "Hide Fare Details" is clicked', () => {
    render(
      <MemoryRouter>
        <Checkout bookingId="cx1212" phoneNumber="9999999999" fromDate={new Date()} toDate={new Date()} />
      </MemoryRouter>
    );

    const showDetailsButton = screen.getByText('Show Fare Details')
    fireEvent.click(showDetailsButton);

    const hideDetailsButton = screen.getByText('Hide Fare Details');
    expect(hideDetailsButton).toBeInTheDocument();

    fireEvent.click(hideDetailsButton);

    expect(screen.getByText('Show Fare Details')).toBeInTheDocument();
  });

  test('calls displayRazorpay when "Proceed to Payment" is clicked', async () => {
    nock('http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .post('/createPayment')
      .reply(200, {
        "status": "success",
        "message": "Payment created successfully",
        "razorPayOrderId": "order_N3sUunwYHPCCSX",
        "paymentDate": "23-11-2023 03:42:14"
      });

    render(
      <MemoryRouter>
        <Checkout bookingId="cx1212" phoneNumber="9999999999" fromDate={new Date()} toDate={new Date()} />
      </MemoryRouter>
    );

    const proceedToPayment = screen.getByRole('button', { name: 'Proceed to Payment' });

    await act(async () => {
      proceedToPayment.click();
    });

    await waitFor(() => {
      // expect(screen.getByTitle('Pay Now')).toBeInTheDocument();
      const paynow = screen.getByText('Pay Now');
      expect(paynow).toBeInTheDocument();
      // const payNow = screen.getByRole('heading', { level: 3 });
      // expect(payNow).toBeInTheDocument();
      // expect(payNow).toHaveTextContent('Preferred Payment Methods');
    });
  });

  test('navigates to the home page when "Close" button is clicked', () => {
    render(
      <MemoryRouter>
        <Checkout bookingId="cx1212" phoneNumber="9999999999" fromDate={new Date()} toDate={new Date()} />
      </MemoryRouter>
    );

    const closeButton = screen.getByRole('button', { name: 'Close' });

    act(() => {
      closeButton.click();
    });

    expect(window.location.pathname).toBe('/');
  });


  test('loads script when Checkout component is mounted', async () => {
    const scriptSrc = 'https://checkout.razorpay.com/v1/checkout.js';
    nock(scriptSrc)
      .get('/v1/checkout.js')
      .reply(200, '');

    render(
      <MemoryRouter>
        <Checkout bookingId="cx1212" phoneNumber="9999999999" fromDate={new Date()} toDate={new Date()} />
      </MemoryRouter>
    );

    // await new Promise(setImmediate);

    // expect(nock.isDone()).toBe(true);
  });
});

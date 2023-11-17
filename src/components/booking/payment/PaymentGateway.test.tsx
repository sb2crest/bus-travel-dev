// Import necessary modules and types
import { expect } from 'chai';
import sinon, { SinonStub, SinonSandbox } from 'sinon';
import fetch, { Response } from 'node-fetch';
import displayRazorpay from './PaymentGateway';
import nock from 'nock';

// Describe block for the displayRazorpay function
describe('displayRazorpay Function', () => {
  let sandbox: SinonSandbox;
  let fetchStub: SinonStub;

  // Before each test, create a sandbox and stub the fetch function
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    fetchStub = sandbox.stub(window, 'fetch');
  });

  // After each test, restore the sandbox
  afterEach(() => {
    sandbox.restore();
  });

  // Test case for handling a successful payment
  it('handles a successful payment', async () => {
    const baseUrl = 'http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com';

    // Mock the API request using nock
    nock(baseUrl)
      .post('/createPayment', {
        bookingId: 'NBd4e557c72',
        mobile: '6360120872',
        amount: 5000,
      })
      .reply(200, {
        currency: 'INR',
        razorPayOrderId: 'order_N1QwjkayNj7nC5',
      });

    // Simulate a successful fetch response
    fetchStub.returns(Promise.resolve(new Response(JSON.stringify({
        razorPayPaymentId: ' response.razorpay_payment_id',
        razorPayOrderId: 'response.razorpay_order_id',
        razorPaySignature: 'response.razorpay_signature',
    }))));

    // Execute the displayRazorpay function
    await displayRazorpay('NBd4e557c72', '6360120872', 5000);

    // Assert that the necessary alerts are called and the fetchStub is called with the correct arguments
    expect(fetchStub.calledWith(
      `${baseUrl}/createPayment`,
      sinon.match({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingId: 'NBd4e557c72',
          mobile: '6360120872',
          amount: 5000,
        }),
      })
    )).to.be.true;
  });

  // Test case for handling a failed payment
  it('handles a failed payment', async () => {
    const baseUrl = 'http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com';

    // Mock the API request using nock
    nock(baseUrl)
      .post('/createPayment', {
        bookingId: 'NBd4e557c72',
        mobile: '6360120872',
        amount: 5000,
      })
      .reply(200, {
        currency: 'INR',
        razorPayOrderId: 'order_N1QwjkayNj7nC5',
      });

    // Simulate a failed fetch response
    fetchStub.returns(Promise.resolve(new Response(null, { status: 500 })));

    // Execute the displayRazorpay function
    await displayRazorpay('NBd4e557c72', '6360120872', 5000);

    // Assert that the necessary alerts are called and the fetchStub is called with the correct arguments
    expect(fetchStub.calledWith(
      `${baseUrl}/createPayment`,
      sinon.match({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingId: 'NBd4e557c72',
          mobile: '6360120872',
          amount: 5000,
        }),
      })
    )).to.be.true;
  });

});

import { expect } from 'chai';
import sinon, { SinonStub, SinonSandbox } from 'sinon';
import fetch, { Response } from 'node-fetch';
import displayRazorpay from './PaymentGateway';
import nock from 'nock';

describe('displayRazorpay Function', () => {
  let sandbox: SinonSandbox;
  let fetchStub: SinonStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    fetchStub = sandbox.stub(window, 'fetch');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('handles a successful payment', async () => {
    const baseUrl = 'http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com';

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

    fetchStub.returns(Promise.resolve(new Response(JSON.stringify({
        razorPayPaymentId: ' response.razorpay_payment_id',
        razorPayOrderId: 'response.razorpay_order_id',
        razorPaySignature: 'response.razorpay_signature',
    }))));

    await displayRazorpay('NBd4e557c72', '6360120872', 5000);

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

  it('handles a failed payment', async () => {
    const baseUrl = 'http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com';

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

    fetchStub.returns(Promise.resolve(new Response(null, { status: 500 })));

    await displayRazorpay('NBd4e557c72', '6360120872', 5000);

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

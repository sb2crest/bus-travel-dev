// Import necessary modules and libraries
import displayRazorpay from './PaymentGateway'; // Assuming createPayment is exported from './PaymentGateway'
import fetchMock from 'jest-fetch-mock';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import {jest} from '@jest/globals'

global.jest = jest;
describe('displayRazorpay', () => {
  it('should create a valid request body with provided props', async () => {
    // Arrange
    const bookingId = 'NB3ae57bb76';
    const mobile = '6360120872';
    const amount = 5000;

    // Act
    const requestBody = await displayRazorpay(bookingId, mobile, amount);

    // Assert
    expect(requestBody).toEqual({
      bookingId: bookingId,
      mobile: mobile,
      amount: amount,
    });
  });

  describe('createPayment', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
    });

    it('should make a POST request to the correct endpoint with the provided data', async () => {
      // Arrange
      const bookingId = 'NB3ae57bb76';
      const mobile = '6360120872';
      const amount = 5000;
      const baseUrl = "http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com/";
      const requestBody = await displayRazorpay(bookingId, mobile, amount);
      const expectedEndpoint = `${baseUrl}createPayment`;

      // Act
      await createPayment(requestBody);

      // Assert
      expect(fetchMock).toHaveBeenCalledWith(expectedEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
    });

    it('should return the JSON response from the server', async () => {
      // Arrange
      const mockResponse = { statusCode: 200 }; // Adjust the type accordingly
      fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

      // Act
      const result = await createPayment({ /* your request body here */ });

      // Assert
      expect(result).toEqual(mockResponse);
    });

    // Add more test cases as needed
  });
});

// Replace this function with the actual implementation
export async function createPayment(requestBody: any) {
  const response = await fetch('http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com/createPayment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
  return await response.json();
}

describe('Payment Component', () => {
  const baseUrl = "http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com/";

  const options = {
    key: "rzp_test_nHgaZ8pP0SqyOm",
    currency: "rupees",
    amount: 5000,
    name: "Pay Now",
    description: "Wallet Transaction",
    image: "http://localhost:8100/src/assets/images/Logo.png",
  };

  test('Renders the payment component correctly', async () => {
    // Wait for the payment button to be present
    const payButton = await screen.findByText('Pay Now');
    expect(payButton).toBeInTheDocument();
  });

  test('Handles payment response correctly', async () => {
    // Mock the fetch function to return a successful response
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValueOnce({ statusCode: 200 }),
    } as unknown as Response);

    // Wait for the payment button to be present
    const payButton = await screen.findByText('Pay Now');
    expect(payButton).toBeInTheDocument();

    // Trigger the payment handler function
    fireEvent.click(payButton);

    // Wait for the alerts and console.log to be called
    await waitFor(() => {
      expect(screen.getByText(/PAYMENT ID/)).toBeInTheDocument();
      expect(screen.getByText(/ORDER ID/)).toBeInTheDocument();
      expect(screen.getByText(/Signature/)).toBeInTheDocument();
      expect(console.log).toHaveBeenCalled();
    });

    // Wait for the fetch to be called
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining(`${baseUrl}verifySignature`),
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: expect.any(String),
        })
      );
    });
  });
});

describe('Payment Component', () => {
  const baseUrl = "http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com/";
  const options = {
    key: "rzp_test_nHgaZ8pP0SqyOm",
    currency: "rupees",
    amount: 5000,
    name: "Pay Now",
    description: "Wallet Transaction",
    image: "http://localhost:8100/src/assets/images/Logo.png",
  };

  test('Handles payment response correctly - Successful payment', async () => {
    // Mock the fetch function to return a successful response
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValueOnce({ statusCode: 200 }),
    } as unknown as Response);

    // Wait for the payment button to be present
    const payButton = await screen.findByText('Pay Now');
    expect(payButton).toBeInTheDocument();

    // Trigger the payment handler function
    fireEvent.click(payButton);

    // Wait for the alerts and console.log to be called
    await waitFor(() => {
      expect(screen.getByText(/PAYMENT ID/)).toBeInTheDocument();
      expect(screen.getByText(/ORDER ID/)).toBeInTheDocument();
      expect(screen.getByText(/Signature/)).toBeInTheDocument();
      expect(console.log).toHaveBeenCalled();
    });

    // Wait for the fetch to be called
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining(`${baseUrl}verifySignature`),
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: expect.any(String),
        })
      );
    });
  });

  test('Handles payment response correctly - Failed payment', async () => {
    // Mock the fetch function to return a failed response
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 500, // Set an appropriate error status code
    } as Response);

    // Wait for the payment button to be present
    const payButton = await screen.findByText('Pay Now');
    expect(payButton).toBeInTheDocument();

    // Trigger the payment handler function
    fireEvent.click(payButton);

    // Wait for the error alert to be called
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Payment failed. Please try again.');
    });
  });
});

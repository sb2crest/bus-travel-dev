import { render, screen, act, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Form from "./Form";
import nock from "nock";

describe("Booking component", () => {
  test("renders without errors", () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );
  });

  test("checks if getInTouch button triggers getInTouch function on click ", async () => {
    nock('http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .post('/getInTouch')
      .reply(200, { "message": "Email sent successfully." });

    render(<Form />, { wrapper: MemoryRouter });

    const getInTouch = screen.getByRole('button', { name: 'Get In Touch' });

    await act(async () => {
      getInTouch.click();
    });

    await waitFor(() => {
      const successMessage = screen.getByText('Thank You!');
      expect(successMessage).toBeInTheDocument();
    });
  })

  test("renders input fields correctly", () => {
    render(<Form />, { wrapper: MemoryRouter });

    const nameInput = screen.getByLabelText('Enter your name');
    const emailInput = screen.getByLabelText('Enter your email');
    const messageInput = screen.getByLabelText('Enter your message');

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(messageInput).toBeInTheDocument();
  });

  test("input fields are initially empty", () => {
    render(<Form />, { wrapper: MemoryRouter });

    const nameInput = screen.getByLabelText('Enter your name');
    const emailInput = screen.getByLabelText('Enter your email');
    const messageInput = screen.getByLabelText('Enter your message');

    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
    expect(messageInput).toHaveValue('');
  });

  test("captures user input correctly", () => {
    render(<Form />, { wrapper: MemoryRouter });

    const nameInput = screen.getByLabelText('Enter your name');
    const emailInput = screen.getByLabelText('Enter your email');
    const messageInput = screen.getByLabelText('Enter your message');

    act(() => {
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(messageInput, { target: { value: 'Test message' } });
    });

    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(messageInput).toHaveValue('Test message');
  });
});



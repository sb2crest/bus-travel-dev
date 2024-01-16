import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';
import { MemoryRouter } from 'react-router-dom';
import jest from 'jest-mock';

describe('Footer component', () => {
    it('renders without crashing', () => {
        render(
          <MemoryRouter>
            <Footer />
          </MemoryRouter>
        );
        expect(screen.getByText(/Founded on a passion for travel/i)).toBeInTheDocument();
      });

  it('renders the correct contact information', () => {
    render(
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      );
    expect(screen.getByText(/Corporates Office/i)).toBeInTheDocument();
    expect(screen.getByText(/102, 1st floor, AjjeGowdru Nilaya, 7th A Cross Rd, Yelahanka/i)).toBeInTheDocument();
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/info@seabed2crest.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByText(/\+91 7349368311/i)).toBeInTheDocument();
    expect(screen.getByText(/\+91 7979699428/i)).toBeInTheDocument();
  });

//   it('renders the correct social media links', () => {
//     render(
//         <MemoryRouter>
//           <Footer />
//         </MemoryRouter>
//       );
//     expect(screen.getByTestId('facebook-link')).toHaveAttribute('href', 'your_facebook_link');
//     expect(screen.getByTestId('instagram-link')).toHaveAttribute('href', 'your_instagram_link');
//     expect(screen.getByTestId('linkedin-link')).toHaveAttribute('href', 'your_linkedin_link');
//     expect(screen.getByTestId('twitter-link')).toHaveAttribute('href', 'your_twitter_link');
//   });

it('scrolls to top when a link is clicked', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const spy = jest.spyOn(window, 'scrollTo');
    fireEvent.click(screen.getByText(/About Us/i));
    expect(spy).toHaveBeenCalledWith({ top: 550, behavior: 'smooth' });
    spy.mockRestore();
  });
});

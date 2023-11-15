import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Nav';

describe('Navbar component', () => {
  test('renders correctly', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    // Ensure the logo is rendered
    expect(screen.getByAltText('Logo')).toBeInTheDocument();

    // Ensure menu items are rendered
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Booking')).toBeInTheDocument();
    expect(screen.getByText('Booking Info')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    // Add similar checks for other menu items
    // Ensure "Contact Us" link is rendered
    const contactUsLinks = screen.getAllByText('Contact Us');
    expect(contactUsLinks.length).toBeGreaterThan(0);

    // Ensure the button is rendered
    const contactUsButtons = screen.getAllByText('Contact Us');
    expect(contactUsButtons.length).toBeGreaterThan(0);
  });

  test('renders hidecontact when button is clicked', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
    // Check if the hidecontact element is initially present
    const hideContactElement = screen.queryByTestId('hidecontact');
    const isHideContactInitiallyVisible = hideContactElement !== null;
    fireEvent.click(screen.getByTestId('menu-icon'));
    expect(screen.getByTestId('hidecontact')).toBeInTheDocument();
    expect(isHideContactInitiallyVisible).toBe(true); 
  });
  
  test('handles click event properly', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
  
    // Initial state: menu-list should have the "close" class
    const menuList = screen.getByTestId('menu-list');
    expect(menuList).toHaveClass('close');
  
    // Click on the menu-icon
    const menuIcon = screen.getByTestId('menu-icon');
    fireEvent.click(menuIcon);
  
    // After click: menu-list should not have the "close" class
    expect(menuList).not.toHaveClass('close');
  });
});

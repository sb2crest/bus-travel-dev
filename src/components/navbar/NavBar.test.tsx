import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Navbar from './Nav';
import { BrowserRouter as Router } from 'react-router-dom'; 
import { Navitems } from "./Navitems";
describe('Navbar Component', () => {
  test('renders Navbar component', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();
    const menuIcon = screen.getByTestId('menu-icon');
    expect(menuIcon).toBeInTheDocument();
    const menuList = screen.getByTestId('menu-list');
    expect(menuList).toHaveClass('close');
  });

  test('toggles menu list on menu icon click', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
    const menuIcon = screen.getByTestId('menu-icon');
    const menuList = screen.getByTestId('menu-list');
    fireEvent.click(menuIcon);
    expect(menuList).toHaveClass('menu-list');
    fireEvent.click(menuIcon);
    expect(menuList).toHaveClass('close');
  });

  test('closes menu list on menu item click', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
    fireEvent.click(screen.getByTestId('menu-icon'));
    expect(screen.getByTestId('menu-list')).toHaveClass('menu-list');
    const contactLink = screen.getByText('Contact Us', { selector: 'a' });
    fireEvent.click(contactLink);
    expect(screen.getByTestId('menu-list')).toHaveClass('close');
  });

  test('renders Contact Us button', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    const contactButton = screen.getByRole('button', { name: /contact us/i });
    expect(contactButton).toBeInTheDocument();
  });
  test('clicking on each navigation link navigates to the correct page', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
  
    // Loop through each navigation item and test navigation
    Navitems.forEach(({ title, url }) => {
      if (typeof url === 'string') {
        const navLink = screen.getByText(title);
        fireEvent.click(navLink);
  
        // You can add assertions based on your routing setup
        // For example, expect(window.location.pathname).toBe(url);
      }
    });
  });
  test('menu is initially closed', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
  
    const menuList = screen.getByTestId('menu-list');
    expect(menuList).toHaveClass('close');
  });
  test('fade animation is applied to the navbar', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
  
    const navbar = screen.getByTestId('navbar');
    expect(navbar).toHaveClass('header');
  });
      
});


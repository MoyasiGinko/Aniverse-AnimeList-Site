import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from '../components/NavBar';

describe('NavBar component', () => {
  it('should toggle the overlay when the menu button is clicked', () => {
    render(
      <Router>
        <NavBar />
      </Router>,
    );

    const menuButton = screen.getByRole('button', { name: /menu/i });
    const navBar = screen.getByRole('navigation');

    fireEvent.click(menuButton);

    expect(navBar).toHaveClass('open');

    fireEvent.click(menuButton);

    expect(navBar).not.toHaveClass('open');
  });

  it('should navigate to the home page when the home link is clicked', () => {
    render(
      <Router>
        <NavBar />
      </Router>,
    );

    const homeLink = screen.getByRole('link', { name: /home/i });

    fireEvent.click(homeLink);

    // Add assertions for the expected behavior, e.g., expect(window.location.pathname).toBe('/');
  });

  // Add more test cases for other navigation links as needed
});

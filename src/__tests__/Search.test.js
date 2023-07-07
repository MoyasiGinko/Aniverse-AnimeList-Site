import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AnimeSearchPage from '../components/SearchPage';

describe('AnimeSearchPage component', () => {
  it('should show search results when the search button is clicked', async () => {
    render(
      <MemoryRouter>
        <AnimeSearchPage />
      </MemoryRouter>,
    );

    const searchInput = screen.getByPlaceholderText(/search for anime/i);
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.change(searchInput, { target: { value: 'Naruto' } });
    fireEvent.click(searchButton);

    // Wait for API request and search results to update
    await screen.findByText((content, element) => {
      const normalizedText = content.toLowerCase();
      const elementText = element.textContent.toLowerCase();
      return elementText.includes('naruto') && normalizedText === 'naruto';
    });

    const searchResults = screen.getByRole('list');
    expect(searchResults).toBeInTheDocument();
  });

  // Add more test cases as needed
});

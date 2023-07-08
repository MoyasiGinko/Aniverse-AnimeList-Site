import React from 'react';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
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

    fireEvent.change(searchInput, { target: { value: 'noblesse' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      const searchResults = screen.getByRole('list');
      expect(searchResults).toBeInTheDocument();
    });
  });

  // Add more test cases as needed
});

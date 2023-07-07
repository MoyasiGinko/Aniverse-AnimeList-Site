import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import GenrePage from '../components/GenrePage';

// Mock Redux store
const mockStore = configureStore([]);

describe('GenrePage component', () => {
  it('renders the genre name correctly', () => {
    // Define sample genre data
    const genreData = [
      { mal_id: 1, name: 'Action' },
      { mal_id: 2, name: 'Comedy' },
    ];

    // Define sample anime data
    const animeData = [
      { mal_id: 1, title: 'Anime 1', genres: [{ mal_id: 1, name: 'Action' }] },
      { mal_id: 2, title: 'Anime 2', genres: [{ mal_id: 2, name: 'Comedy' }] },
    ];

    // Create a mock Redux store with the desired state
    const store = mockStore({
      genrespage: {
        genreData,
        animeData,
        isLoading: false,
      },
    });

    // Render the component with the mock store and router context
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/genre/1']}>
          <Routes>
            <Route path="/genre/:genreId" element={<GenrePage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    // Custom text matcher function that ignores whitespace and line breaks
    const genreNameMatcher = (content, element) => {
      const normalizedContent = content.replace(/\s/g, '');
      const normalizedElementText = element.textContent.replace(/\s/g, '');
      return normalizedContent === normalizedElementText;
    };

    // Assert that the genre name is rendered correctly
    const genreName = screen.getByText((content, element) =>
      genreNameMatcher(`${genreData[0].name}Anime`, element)
    );
    expect(genreName).toBeInTheDocument();
  });
});

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchGenrePageData = createAsyncThunk(
  'genrespage/fetchGenrePageData',
  async () => {
    try {
      let animeData = JSON.parse(localStorage.getItem('animeData')) || [];
      let page = Math.floor(animeData.length / 100) + 1; // Calculate the next page to fetch

      const fetchAnimeData = async () => {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime?page=${page}`
        );
        const data = await response.json();

        if (data.data && data.data.length > 0) {
          animeData = [...animeData, ...data.data];
          page++;
          await fetchAnimeData(); // Fetch the next page
        }
      };

      await fetchAnimeData();

      localStorage.setItem('animeData', JSON.stringify(animeData));

      const genreResponse = await fetch(
        'https://api.jikan.moe/v4/genres/anime'
      );
      const genreData = await genreResponse.json();

      return { genreData: genreData.data, animeData };
    } catch (error) {
      console.log('Error fetching genre and anime data:', error);
      throw error;
    }
  }
);

export const fetchGenreDataFromLocalStorage = createAsyncThunk(
  'genrespage/fetchGenreDataFromLocalStorage',
  async () => {
    try {
      const animeData = JSON.parse(localStorage.getItem('animeData')) || [];

      const genreResponse = await fetch(
        'https://api.jikan.moe/v4/genres/anime'
      );
      const genreData = await genreResponse.json();

      return { genreData: genreData.data, animeData };
    } catch (error) {
      console.log('Error fetching genre data from local storage:', error);
      throw error;
    }
  }
);

const genrepageSlice = createSlice({
  name: 'genrepage',
  initialState: {
    genreData: [],
    animeData: [],
    isLoading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGenrePageData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchGenrePageData.fulfilled, (state, action) => {
      state.genreData = action.payload.genreData;
      state.animeData = action.payload.animeData;
      state.isLoading = false;
    });
    builder.addCase(fetchGenrePageData.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(
      fetchGenreDataFromLocalStorage.fulfilled,
      (state, action) => {
        state.genreData = action.payload.genreData;
        state.animeData = action.payload.animeData;
        state.isLoading = false;
      }
    );
  },
});

export default genrepageSlice.reducer;

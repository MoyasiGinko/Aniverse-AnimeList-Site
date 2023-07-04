import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchGenrePageData = createAsyncThunk(
  'genrespage/fetchGenrePageData',
  async () => {
    try {
      const [genreResponse, animeResponse] = await Promise.all([
        fetch('https://api.jikan.moe/v4/genres/anime'),
        fetch('https://api.jikan.moe/v4/anime'),
      ]);

      const [genreData, animeData] = await Promise.all([
        genreResponse.json(),
        animeResponse.json(),
      ]);

      return { genreData: genreData.data, animeData: animeData.data };
    } catch (error) {
      console.log('Error fetching genre and anime data:', error);
      throw error;
    }
  },
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
  },
});

export default genrepageSlice.reducer;

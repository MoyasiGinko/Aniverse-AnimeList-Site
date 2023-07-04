import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchGenreData = createAsyncThunk(
  'genre/fetchGenreData',
  async () => {
    try {
      const response = await fetch('https://api.jikan.moe/v4/genres/anime');
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.log('Error fetching genre data:', error);
      throw error;
    }
  },
);

const genreSlice = createSlice({
  name: 'genre',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGenreData.fulfilled, (state, action) => action.payload);
  },
});

export default genreSlice.reducer;

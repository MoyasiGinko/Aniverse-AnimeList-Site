import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAnimes = createAsyncThunk('animes/fetchAnimes', async () => {
  const response = await fetch('https://api.jikan.moe/v4/top/anime');
  const data = await response.json();
  return data;
});

export const reserveAnime = createAsyncThunk(
  'animes/reserveAnime',
  async (animeId) => {
    localStorage.setItem(`reserved_${animeId}`, 'true');
    return animeId;
  },
);

export const cancelReservation = createAsyncThunk(
  'animes/cancelReservation',
  async (animeId) => {
    localStorage.removeItem(`reserved_${animeId}`);
    return animeId;
  },
);

const initialState = {
  animes: [],
  status: 'idle',
  error: null,
};

const animesSlice = createSlice({
  name: 'animes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAnimes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.animes = action.payload.data.map((item) => ({
          id: item.mal_id,
          name: item.title,
          photo: item.images.jpg.image_url,
          description: item.synopsis,
          reserved: localStorage.getItem(`reserved_${item.mal_id}`) === 'true',
        }));
      })
      .addCase(fetchAnimes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(reserveAnime.fulfilled, (state, action) => {
        const animeId = action.payload;
        state.animes = state.animes.map((anime) => (anime.id === animeId
          ? { ...anime, reserved: true } : anime));
      })
      .addCase(cancelReservation.fulfilled, (state, action) => {
        const animeId = action.payload;
        state.animes = state.animes.map((anime) => (anime.id === animeId
          ? { ...anime, reserved: false } : anime));
      });
  },
});

export default animesSlice.reducer;

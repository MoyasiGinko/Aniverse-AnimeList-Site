import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAnimes = createAsyncThunk('animes/fetchAnimes', async () => {
  try {
    const animeData = [];

    /* eslint-disable */
    for (let page = 1; page <= 5; page++) {
      const response = await fetch(
        `https://api.jikan.moe/v4/top/anime?page=${page}`
      );
      const data = await response.json();
      animeData.push(...data.data);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    /* eslint-enable */
    return animeData;
  } catch (error) {
    throw new Error('Failed to fetch animes');
  }
});

export const reserveAnime = createAsyncThunk(
  'animes/reserveAnime',
  async (animeId) => {
    try {
      localStorage.setItem(`reserved_${animeId}`, 'true');
      return animeId;
    } catch (error) {
      throw new Error('Failed to reserve anime');
    }
  },
);

export const cancelReservation = createAsyncThunk(
  'animes/cancelReservation',
  async (animeId) => {
    try {
      localStorage.removeItem(`reserved_${animeId}`);
      return animeId;
    } catch (error) {
      throw new Error('Failed to cancel reservation');
    }
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
        state.error = null; // Reset the error when fetching starts
      })
      .addCase(fetchAnimes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.animes = action.payload.map((item) => ({
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

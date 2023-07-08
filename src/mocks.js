// mocks.js
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('https://api.jikan.moe/v4/anime', (req, res, ctx) => {
    const searchQuery = req.url.searchParams.get('q');
    const mockedResponse = {
      data: [
        {
          mal_id: 1,
          title: 'Anime 1',
          images: { jpg: { image_url: 'image1.jpg' } },
        },
        {
          mal_id: 2,
          title: 'Anime 2',
          images: { jpg: { image_url: 'image2.jpg' } },
        },
      ],
    };

    // Mock the response based on the search query
    if (searchQuery === 'noblesse') {
      return res(ctx.json(mockedResponse));
    }

    // Default response for other search queries
    return res(ctx.json({ data: [] }));
  }),
);

export default server;

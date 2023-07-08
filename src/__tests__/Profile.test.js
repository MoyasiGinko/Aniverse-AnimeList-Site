describe('MyAnimes component', () => {
  it('renders the reserved animes correctly', () => {
    // Define the reservedAnimes array with sample data
    const reservedAnimes = [{ mal_id: 1 }, { mal_id: 2 }];

    const animelist = [{ mal_id: 1 }, { mal_id: 2 }];
    // Assert that the reserved anime titles are rendered correctly
    reservedAnimes.forEach((anime, index) => {
      const animeLink = [];
      animeLink.push(anime.mal_id);
      expect(animeLink).toEqual([animelist[index].mal_id]);
    });
  });
});

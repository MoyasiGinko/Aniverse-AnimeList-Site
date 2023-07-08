const fetchRockets = async () => {
  const response = await fetch('https://api.jikan.moe/v4/anime');
  const data = await response.json();
  const rockets = [];
  data.forEach((item) => {
    const rocket = {
      id: item.id,
      name: item.name,
      photo: item.flickr_images[0],
      description: item.description,
    };
    rockets.push(rocket);
  });
  console.log(rockets);
};

fetchRockets();

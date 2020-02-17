const giphyApi = (() => {
  const fetchImage = description => {
    const img = document.querySelector('img');
    const search = `weather ${description}`;
    const giphyUrl = `https://api.giphy.com/v1/gifs/translate?api_key=91nozcLeYMCqxY6j7xsh3jqbgnd6zWiV&s=${search}`;

    fetch(giphyUrl, { mode: 'cors' })
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        img.src = response.data.images.original.url;
      })
      .catch(() => {
        const img_wrapper = document.querySelector('.img-wrapper');
        img_wrapper.innerHTML = 'The weather description is incorrect';
      });
  };

  return {
    fetchImage
  };
})();

export default giphyApi;

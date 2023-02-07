function createMarcup(data) {
  const markup = data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
        <li class = "big-card">
        <a href="${largeImageURL}" class="card pagination__next">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          <div class="card__info">
            <div class="card__item">
              <b>❤️‍🔥</b>
              <p>${likes}</p>
            </div>
            <div class="card__item">
              <b>👀</b>
              <p>${views}</p>
            </div>
            <div class="card__item">
              <b class="coments">💭</b>
              <p>${comments}</p>
            </div>
            <div class="card__item">
              <b class ="dow">📥</b>
              <p>${downloads}</p>
            </div>
          </div>
        </a>
        
        </li>
`;
      }
    )
    .join('');

  return markup;
}

export default { createMarcup };

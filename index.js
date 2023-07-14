const TEXT_NOT_FOUND_FILMS = 'Films not found';
const TEXT_NOT_FOUND_FILMS_CLASSNAME = 'movie__output';

const inputNode = document.getElementById('movie__input');
const searchBtnNode = document.getElementById('movie__btn');
const searchListNode = document.getElementById('movie__list');
const outputNode = document.getElementById('movie__output');
const cardDetailsNode = document.getElementById('card-details');
const hideListNode = document.getElementById('hide-list');

const key = '5134d6de';

searchBtnNode.addEventListener('click', getMovieFromUser);

function getMovieFromUser() {
  let movieName = (inputNode.value).trim();
  if (!movieName) {
    clearSpaceInput(inputNode);
    outputNode.classList.add(TEXT_NOT_FOUND_FILMS_CLASSNAME);
    return outputNode.innerText = TEXT_NOT_FOUND_FILMS;
  } else {
    loadMovies(movieName);
    outputNode.innerText = '';
    clearSpaceInput(inputNode);
  };
};

function loadMovies(movieName) {
  fetch(`https://www.omdbapi.com/?s=${movieName}&apikey=${key}`)
    .then(response => response.json())
    .then((data) => {
      if (data.Response == 'True') {
        renderMoviesList(data);
      } else {
        outputNode.classList.add(TEXT_NOT_FOUND_FILMS_CLASSNAME);
        return outputNode.innerText = TEXT_NOT_FOUND_FILMS;
      }
    })
};

function renderMoviesList(data) {
  searchListNode.innerHTML = '';
  data.Search.forEach((movie) => {

    let movieItem = document.createElement('li');
    movieItem.classList.add('movie-item');
    movieItem.setAttribute('id', `${movie.imdbID} `);

    if (movie.Poster !== 'N/A') {
      moviePoster = movie.Poster;
    } else {
      moviePoster = '/resources/movie-not-found.webp'
    }

    movieItem.innerHTML = `
    
    <img
    class="movie-item_img"
    src="${moviePoster}"
    alt="Превью фильма"
  />
   
    <div class="movie-item_wrapper">
      <h2 class="movie-item_title">${movie.Title}</h2>
      <p class="movie-item_year">${movie.Year}</p>
      <p class="movie-item_category">${movie.Type}</p>
    </div>
   
  `;

    searchListNode.appendChild(movieItem);
  });
  loadMoviesCard();
}


function loadMoviesCard() {
  const searchMovieItem = searchListNode.querySelectorAll('li');

  searchMovieItem.forEach(movie => {
    movie.addEventListener('click', function () {
      fetch(`https://www.omdbapi.com/?i=${movie.getAttribute('id')}&apikey=${key}`)
        .then(response => response.json())
        .then((dataCard) => {
          renderMovieCard(dataCard);
          hideListNode.classList.add('hide-list')
          cardDetailsNode.classList.remove('card-details')
        });

    });
  });
};

function renderMovieCard(dataCard) {
  let movieDetails = document.createElement('div');
  movieDetails.classList.add('movie-card');
  console.log(cardDetailsNode);

  if (dataCard.Poster !== 'N/A') {
    dataCardPoster = dataCard.Poster;
  } else {
    dataCardPoster = '/resources/movie-not-found.webp'
  };

  movieDetails.innerHTML = `
  
  <a class="card_link" onclick="hideCard()">← Back to search</a>
  <div class="movie-card_wrapper">
    <div class="movie-card_list">
      <img
        src="${dataCardPoster}"
        alt=""
        class="movie-card__img"
      />
      <div class="movie-card__description">
        <h1 class="movie-card_title">${dataCard.Title}</h1>
        <ul class="movie-card_categorys">
          <li class="movie-card_category">
            Year:<span class="color">${dataCard.Year}</span>
          </li>
          <li class="movie-card_category">
            Rated:<span class="color">${dataCard.Rated}</span>
          </li>
          <li class="movie-card_category">
            Released:<span class="color">${dataCard.Released}</span>
          </li>
          <li class="movie-card_category">
            Runtime:<span class="color">${dataCard.Runtime}</span>
          </li>
          <li class="movie-card_category">
            Genre:<span class="color">${dataCard.Genre}</span>
          </li>
          <li class="movie-card_category">
            Director:<span class="color">${dataCard.Director}</span>
          </li>
          <li class="movie-card_category">
            Writer:<span class="color">${dataCard.Writer}</span>
          </li>
          <li class="movie-card_category">
            Actors:<span class="color">${dataCard.Actors}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <p class="movie-description">
  ${dataCard.Plot}
  </p>
        `;
  cardDetailsNode.appendChild(movieDetails);
};

function hideCard() {
  cardDetailsNode.classList.add('card-details');
  hideListNode.classList.remove('hide-list')
  cardDetailsNode.innerHTML = '';
};

function clearSpaceInput(element) {
  element.value = '';
};




// function loadMoviesCard() {
//     const searchMovieItem = searchListNode.querySelectorAll('li');

//     searchMovieItem.forEach(movie => {
//         movie.addEventListener('click', async function () {
//             const result = await fetch(`https://www.omdbapi.com/?i=${movie.getAttribute('id')}&apikey=${key}`)
//             const movieCard = await result.json();
//             console.log(movieCard.Title)
//         })
//     })
// }

















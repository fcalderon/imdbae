import React from 'react';

export const Movies = (props) => {
  return (<div>
    <h1>Movies</h1>
    {renderMovies(props.movies)}
  </div>);
};

function renderMovies(movies) {
  const renderedMovies = [];

  for (let i = 0; i < movies.length; i++) {
    renderedMovies.push(renderMovie(movies[i]));
  }

  return <ul>
    {renderedMovies}
  </ul>
}

function renderMovie(movie) {
  return <li key={movie.id}>{movie.title}</li>
}
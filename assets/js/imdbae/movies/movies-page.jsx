import React from 'react';
import {MovieListItem} from "./movie-list-item";


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

  return <div>
    {renderedMovies}
  </div>
}

function renderMovie(movie) {
  return <MovieListItem key={movie.id} movie={movie}></MovieListItem>
}
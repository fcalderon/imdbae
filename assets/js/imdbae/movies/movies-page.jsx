import React from 'react';
import {MovieListItem} from "./movie-list-item";


export const Movies = (props) => {
  return (<div>
    <h1>Movies</h1>
    <div className={'row'}>
      <div className={'col'}>
        <div className={'form-group'}>
          <input className={'form-control'} placeholder={'Search for a movie...'}
                 onChange={($ev) => props.handleOnSearchQueryChanged($ev.target.value)}/>
        </div>
      </div>
    </div>
    {renderMovies(props.movies, props)}
  </div>);
};

function renderMovies(movies, props) {
  const renderedMovies = [];

  for (let i = 0; i < movies.length; i++) {
    renderedMovies.push(renderMovie(movies[i], props));
  }

  return <div>
    {renderedMovies}
  </div>
}

function renderMovie(movie, props) {
  return <MovieListItem key={movie.id}
                        hideLike={props.hideLike}
                        movie={movie} handleLikeClicked={() => {
    props.handleLikeClicked(movie)
  }}
                        isLiked={isLiked(movie, props)}/>
}

function isLiked(movie, props) {
  return props.likedMovies.some((userMovie) => {
    return userMovie.movie_id === movie.id;
  })
}
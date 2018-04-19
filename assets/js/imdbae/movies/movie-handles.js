import {UserMovieService} from "./service/user-movies.service";

function handleLikeClicked(userId, movie, state, component) {
  // TODO add user feedback
  UserMovieService.create({user_id: userId, title: movie.title, movie_id: movie.id})
    .then(createdUsermovie => {
      console.log('Usermovie created', createdUsermovie);
      component.setState(Object.assign({}, state, {likedMovies: [createdUsermovie.data].concat(state.likedMovies)}))
    })
    .catch(err => {
      console.error('Error creating movie', err);
    });
}

function handleUnLikeMovieClicked(movieId, state, component) {
  // TODO add user feedback
  UserMovieService.deleteMovie(movieId)
    .then(() => {
      console.log('Usermovie deleted', movieId);
      component.setState(Object.assign({}, state, {likedMovies: removeMovieById(state.likedMovies, movieId)}))
    })
    .catch(err => {
      console.error('Error creating movie', err);
    });
}

function removeMovieById(usermovies, movieId) {
  return usermovies.filter((movie) => movie.id !== movieId)
}

export const MovieHandles = {
  handleLikeClicked,
  handleUnLikeMovieClicked
};
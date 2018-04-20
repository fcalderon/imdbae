import {UserMovieService} from "./service/user-movies.service";

export const UserMoviesActionTypes = {
  GetAll: '[UserMovies] get all (start)',
  GetAllDone: '[UserMovies] get all (done)',
  GetAllError: '[UserMovies] get all (error)',
  // GetOne:      '[UserMovies] get one (start)',
  // GetOneDone:  '[UserMovies] get one (done)',
  // GetOneError: '[UserMovies] get one (error)',
  Remove: '[UserMovies] remove (start)',
  RemoveDone: '[UserMovies] remove (done)',
  RemoveError: '[UserMovies] remove (error)',
  Add: '[UserMovies] add (start)',
  AddDone: '[UserMovies] add (done)',
  AddError: '[UserMovies] add (error)',
  Reset: '[UserMovies] reset',
};

export const UserMoviesActionCreator = {
  addMovie: (userId, movie) => {
    return {
      type: UserMoviesActionTypes.Add,
      payload: {
        user_id: userId,
        title: movie.title,
        movie_id: movie.id,
        poster_url: `http://image.tmdb.org/t/p/w185/${movie.poster_path}`
      }
    }
  },
  getAll: userId => {
    return {type: UserMoviesActionTypes.GetAll, payload: userId}
  },
  reset: () => {
    return {type: UserMoviesActionTypes.Reset}
  }
};

export const userMoviesDataService = () => next => action => {
  next(action);
  switch (action.type) {
    case UserMoviesActionTypes.GetAll:
      UserMovieService.getAll(action.payload)
        .then(data => next({type: UserMoviesActionTypes.GetAllDone, payload: data}))
        .catch(error => next({type: UserMoviesActionTypes.GetAllError, payload: error}));
      break;
    case UserMoviesActionTypes.Remove:
      UserMovieService.deleteMovie(action.payload.id)
        .then(() => next({type: UserMoviesActionTypes.RemoveDone, payload: action.payload}))
        .catch(error => next({type: UserMoviesActionTypes.RemoveError, payload: error}));
      break;
    case UserMoviesActionTypes.Add:
      UserMovieService.create(action.payload)
        .then(data => next({type: UserMoviesActionTypes.AddDone, payload: data}))
        .catch(error => next({type: UserMoviesActionTypes.AddError, payload: error}));
  }
};

const DEFAULT_USER_MOVIES_STATE = {
  userMovies: {
    data: [],
    error: undefined,
    loading: false
  }
};

export function userMoviesReducer(state = DEFAULT_USER_MOVIES_STATE, action) {
  switch (action.type) {
    case UserMoviesActionTypes.GetAll:
      return {...state, userMovies: {...state.userMovies, loading: true}};
    case UserMoviesActionTypes.GetAllDone:
      return {...state, userMovies: {...action.payload, loading: false}};
    case UserMoviesActionTypes.AddDone:
      return Object.assign({}, state,
        {userMovies: {data: [action.payload.data].concat(state.userMovies.data)}});
    case UserMoviesActionTypes.RemoveDone:
      return Object.assign({}, state,
        {userMovies: {data: state.userMovies.data.filter(userMovie => userMovie.id !== action.payload.id)}});
    case UserMoviesActionTypes.GetAllError:
    case UserMoviesActionTypes.RemoveError:
    case UserMoviesActionTypes.AddError:
      return {...state, userMovies: {...state.userMovies, error: action.payload, loading: false}};
    case UserMoviesActionTypes.Reset:
      return {...DEFAULT_USER_MOVIES_STATE};
    default:
      return state;
  }
}
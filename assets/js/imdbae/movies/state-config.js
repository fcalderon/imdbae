import {tmdbApi} from "./service/tmdb-api.service";

export const MovieActionTypes = {
  GetAll: '[Movies] get all (start)',
  GetAllDone: '[Movies] get all (done)',
  GetAllError: '[Movies] get all (error)',
  GetOne: '[Movies] get one (start)',
  GetOneDone: '[Movies] get one (done)',
  GetOneError: '[Movies] get one (error)',
  UpdateQuery: '[Movies] Update query',
};

export const MoviesActionCreator = {
  updateQuery: (query) => {
    return {type: MovieActionTypes.UpdateQuery, payload: query}
  },
  getAll: (query) => {
    return {type: MovieActionTypes.GetAll, payload: query}
  }
};

export const moviesDataService = () => next => action => {
  next(action);
  switch (action.type) {
    case MovieActionTypes.GetAll:
      const getAllSuccess = data => {
        return next({
          type: MovieActionTypes.GetAllDone,
          payload: data
        });
      };
      const getAllError = error => {
        return next({
          type: MovieActionTypes.GetAllError,
          payload: error
        });
      };

      if (action.payload && action.payload.length >= 0) {
        tmdbApi.search(action.payload).then(getAllSuccess).catch(getAllError)
      } else {
        tmdbApi.discover().then(getAllSuccess).catch(getAllError)
      }
      break;
    case MovieActionTypes.GetOne:
      const getOneSuccess = data => {
        return next({
          type: MovieActionTypes.GetOneDone,
          payload: data
        });
      };
      const getOneError = error => {
        return next({
          type: MovieActionTypes.GetOneError,
          payload: error
        });
      };

      tmdbApi.getOne(action.payload).then(getOneSuccess).catch(getOneError);
      break;
  }
};

const DEFAULT_MOVIES_STATE = {
  movies: {
    results: [],
    error: undefined
  },
  selected: {
    results: undefined,
    error: undefined
  },
  query: undefined,
  error: undefined
};

export function moviesReducer(state = DEFAULT_MOVIES_STATE, action) {
  switch (action.type) {
    case MovieActionTypes.GetAllDone:
      return Object.assign({}, state, {movies: action.payload});
    case MovieActionTypes.GetOneDone:
      return Object.assign({}, state, {selected: {result: action.payload}});
    case MovieActionTypes.UpdateQuery:
      return Object.assign({}, state, {query: action.payload});
    case MovieActionTypes.GetAllError:
      return Object.assign({}, state, {movies: {error: action.payload}});
    case MovieActionTypes.GetOneError:
      return Object.assign({}, state, {selected: {error: action.payload}});
    default:
      return state;
  }
}

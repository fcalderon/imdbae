import {applyMiddleware, combineReducers, createStore} from 'redux';
import deepFreeze from 'deep-freeze';
import {composeWithDevTools,} from 'redux-devtools-extension';
import {moviesDataService, moviesReducer} from "./imdbae/movies/state-config";
import {userMoviesDataService, userMoviesReducer} from "./imdbae/movies/user-movies-state-config";
import {AuthDataService, authReducer} from "./imdbae/auth/state-config";
import throttle from "lodash/throttle";


const imdbaeReducers = {
  movies: moviesReducer,
  userMovies: userMoviesReducer,
  auth: authReducer
};

function root_reducer(state0, action) {
  console.log('reducer', action);
  // {tasks, users, form} is ES6 shorthand for
  // {tasks: tasks, users: users, form: form}
  let reducer = combineReducers(imdbaeReducers);
  let state1 = reducer(state0, action);
  console.log('state1', state1);
  return deepFreeze(state1);
}

const middleware = [moviesDataService, userMoviesDataService, AuthDataService];

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};


let store = createStore(root_reducer, persistedState, composeWithDevTools(applyMiddleware(...middleware)));

store.subscribe(throttle(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
}, 1000));

export default store;
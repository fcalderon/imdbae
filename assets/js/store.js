import {applyMiddleware, combineReducers, createStore} from 'redux';
import deepFreeze from 'deep-freeze';
import {composeWithDevTools,} from 'redux-devtools-extension';
import {moviesDataService, moviesReducer} from "./imdbae/movies/state-config";
import {userMoviesDataService, userMoviesReducer} from "./imdbae/movies/user-movies-state-config";
import {AuthDataService, authReducer} from "./imdbae/auth/state-config";
import throttle from "lodash/throttle";
import {MatchesDataService, MatchesReducer} from "./imdbae/matches/state-config";
import {UserDataService, UserReducer} from "./imdbae/user/state-config";
import rooms from './imdbae/chat/rooms';
import room from './imdbae/chat/room'; 


const imdbaeReducers = {
  movies: moviesReducer,
  userMovies: userMoviesReducer,
  auth: authReducer,
  matches: MatchesReducer,
  user: UserReducer,
  rooms: rooms,
  room: room,
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

const middleware = [moviesDataService, userMoviesDataService, AuthDataService, MatchesDataService, UserDataService];

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};


let store = createStore(root_reducer, persistedState, composeWithDevTools(applyMiddleware(...middleware)));

store.subscribe(throttle(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
}, 1000));

export default store;

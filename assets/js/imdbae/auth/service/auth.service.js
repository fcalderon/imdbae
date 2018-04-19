import {CRUD} from "../../util/crud.service";
import {API_URL} from "../../util/constants";

const AUTH_URL = API_URL + '/auth';
const USERS_URL = API_URL + '/users';

const CURRENT_USER_KEY = '__current_user';
const AUTH_TOKEN_KEY = '__AUTH_TOKEN';

function authenticate(credentials) {
  return new Promise((resolve, reject) => {
    CRUD.post(AUTH_URL, {credentials: credentials}, false)
      .then(creds => {
        console.log('User authenticated', creds);
        localStorage.setItem(AUTH_TOKEN_KEY, creds.token);
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(creds.user));
        resolve(creds);
      })
      .catch(err => {
        console.error('Error authenticating user', err);
        reject(err);
      })
  });
}

function isUserLoggedIn() {
  return !!localStorage.getItem(AUTH_TOKEN_KEY);
}

function getCurrentUser() {
  return new Promise((resolve, reject) => {
    if (isUserLoggedIn()) {
      const currentUser = getCachedCurrentUser();
      CRUD.get(USERS_URL + '/' + currentUser.id, true)
        .then(currentUser => {
          localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
          resolve(currentUser);
        })
        .catch(err => {
          reject(err)
        });
    } else {
      reject(new Error('User not logged in'))
    }
  });
}

function getCachedCurrentUser() {
  if (isUserLoggedIn()) {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
  }
  return null;
}

function getToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

function logOut() {
  localStorage.removeItem(CURRENT_USER_KEY);
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export const authService = {
  authenticate,
  getCurrentUser,
  isUserLoggedIn,
  getCachedCurrentUser,
  getToken,
  logOut
};

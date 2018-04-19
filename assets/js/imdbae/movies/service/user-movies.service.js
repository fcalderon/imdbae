import {API_URL} from "../../util/constants";
import {CRUD} from "../../util/crud.service";

const USER_MOVIES_PATH = API_URL + '/usermovies';

function create(userMovieObject) {
  return new Promise((resolve, reject) => {
    CRUD.post(USER_MOVIES_PATH, {usermovie: userMovieObject}, true)
      .then((res) => {
        resolve(res);
      }).catch(err => {
      reject(err);
    });
  });
}

function getByUserMovieId(userMovieId) {
  const path = `${USER_MOVIES_PATH}/${userMovieId}`;

  return new Promise((resolve, reject) => {
    CRUD.get(path, true)
      .then((res) => {
        resolve(res);
      }).catch(err => {
      reject(err);
    });
  });
}

function getAll(userId) {
  const path = `${USER_MOVIES_PATH}?userId=${userId}`;

  return new Promise((resolve, reject) => {
    CRUD.get(path, true)
      .then((res) => {
        resolve(res);
      }).catch(err => {
      reject(err);
    });
  });
}

function deleteMovie(userMovieId) {
  const path = `${USER_MOVIES_PATH}/${userMovieId}`;

  return new Promise((resolve, reject) => {
    CRUD.delete(path, true)
      .then((res) => {
        resolve(res);
      }).catch(err => {
      reject(err);
    });
  });
}

export const UserMovieService = {
  create,
  getByUserMovieId,
  getAll,
  deleteMovie
};
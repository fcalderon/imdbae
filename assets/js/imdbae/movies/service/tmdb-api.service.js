import {CRUD} from "../../util/crud.service";

const API_KEY = '69a1b594aae60c70b79f5938e4d51368';
const API_URL = 'https://api.themoviedb.org/3';

function discover(pageNumber = 1, pageCount = 10) {
  const path = `${API_URL}/discover/movie?api_key=${API_KEY}&page=${pageNumber}&sort_by=release_date.desc&release_date.lte=${getToday()}`;
  return new Promise((res, rej) => {
    CRUD.get(path, false)
      .then((result) => {
        console.log('Got result', result);
        res(result);
      })
      .catch(rej);
  })
}

function search(query) {
  const path = `${API_URL}/search/movie?api_key=${API_KEY}&query=${query}`;
  return new Promise((res, rej) => {
    CRUD.get(path, false)
      .then((result) => {
        console.log('Got result', result);
        res(result);
      })
      .catch(rej);
  })
}

function getToday() {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth()}-${today.getDay()}`
}

export const tmdbApi = {
  discover,
  search
};
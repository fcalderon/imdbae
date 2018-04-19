import {API_URL} from "../../util/constants";
import {CRUD} from "../../util/crud.service";

const USER_PATH = API_URL + '/users';

function create(user) {
  return new Promise((resolve, reject) => {
    CRUD.post(USER_PATH, {user: user}, false)
      .then(createdUser => {
        console.log('User created', createdUser);
        resolve(createdUser.data);
      })
      .catch(error => {
        console.error('Error creating user', error);
        reject(error);
      });
  });
}

export const UserService = {
  create
};
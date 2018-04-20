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

function update(user) {
  return new Promise((resolve, reject) => {
    CRUD.put(`${USER_PATH}/${user.id}`, {user: user}, true)
      .then(updatedUser => {
        console.log('User updated successfully', updatedUser);
        resolve(updatedUser);
      }).catch(err => {
      console.error('Error updating user', user, err);
      reject(err);
    })
  });
}

function get(userId) {
  return new Promise((resolve, reject) => {
    CRUD.get(`${USER_PATH}/${userId}`, true)
      .then(user => {
        console.log('Got user successfully', user);
        resolve(user);
      }).catch(err => {
      console.error('Error getting user', userId, err);
      reject(err);
    })
  });
}

export const UserService = {
  create,
  update,
  get
};
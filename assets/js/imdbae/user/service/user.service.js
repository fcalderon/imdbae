import {API_URL} from "../../util/constants";
import {CRUD} from "../../util/crud.service";
import {getGeoFromIp} from "../../util/helpers";

const USER_PATH = API_URL + '/users';

function create(user) {
  return new Promise((resolve, reject) => {
    const _post = (userToPost) => {
      CRUD.post(USER_PATH, {user: userToPost}, false)
        .then(createdUser => {
          console.log('User created', createdUser);
          resolve(createdUser.data);
        })
        .catch(error => {
          console.error('Error creating user', error);
          reject(error);
        });
    };

    if (!user.loc_lon) {
      // attempt to get the user's location before saving
      getGeoFromIp(position => {
        const userToPost = {...user};
        userToPost.loc_lat = position.coords.latitude;
        userToPost.loc_lon = position.coords.longitude;
        userToPost.distance = 1;
        _post(userToPost);
      }, err => {
        console.error('Unable to get location based on ip', err);

        _post(user)
      })
    } else {
      _post(user);
    }

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
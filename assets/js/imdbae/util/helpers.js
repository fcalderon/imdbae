// https://gist.github.com/nmsdvid/8807205

import {CRUD} from "./crud.service";

export const debounceEvent = (callback, time) => {
  let interval;
  return (...args) => {
    clearTimeout(interval);
    interval = setTimeout(() => {
      interval = null;
      callback(...args);
    }, time);
  };
};

export function toAction(actionType, payload) {
  return {
    type: actionType,
    payload: payload
  }
}

export function getGeoLocation(callBack) {

  if (navigator.geolocation) {
    console.log(navigator.geolocation);
    navigator.geolocation.getCurrentPosition(callBack, err => {
      console.error('Error getting location', err);
      getGeoFromIp(callBack)
    });
  } else {
    getGeoFromIp(callBack);
  }

}

function getGeoFromIp(callBack) {
  // Attempt to get location from IP

  CRUD.getFromText('https://geoip-db.com/json/', true)
    .then(res => {
      console.log(res);
      const _rep = {
        coords: {
          latitude: res.latitude,
          longitude: res.longitude
        }
      };
      console.log('Rep', _rep);
      callBack(_rep, 'FROM_IP');
    })
    .catch(err => {
        console.error('Error getting location from geoip-db', err);
      }
    )
}
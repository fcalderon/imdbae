// https://gist.github.com/nmsdvid/8807205

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
      console.error('Error getting location', err)
    });
  } else {
    callBack(undefined);
  }

}
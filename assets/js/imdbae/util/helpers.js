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
function get(url, secured) {
  let headers = setAuthToken(
    {
      'content-type': 'application/json',
    },
    secured
  );

  console.log('Getting', url);
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'GET',
      headers: headers,
    })
      .then(function(res) {
        if (res.ok) {
          resolve(res.json());
        } else {
          console.log(res);
          reject(getAppropriateError(res.status));
        }
      })
      .catch(function(error) {
        console.log('Error with request', url, error);
      });
  });
}

function getFromText(url, isJson) {
  console.log('Getting', url);
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => response.text())
      .then(function (text) {
        let _toReturn = text;
        if (isJson) {
          try {
            _toReturn = JSON.parse(_toReturn);
          } catch (e) {
            console.error('Unable to parse, is this a json?', e)
          }
        }
        resolve(_toReturn);
      })
      .catch(function (error) {
        console.log('Error with request', url, error);
        reject(error);
      });
  });
}

function deleteEntity(url, secured) {
  let headers = setAuthToken(
    {
      'content-type': 'application/json',
    },
    secured
  );

  console.log('Deleting', url);
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'DELETE',
      headers: headers,
    })
      .then(function (res, err) {
        if (res.ok) {
          resolve();
        } else {
          console.error('Error deleting', url, res, err);
          reject(getAppropriateError(res.status));
        }
      })
      .catch(function(error) {
        console.log('Error with request', url, error);
      });
  });
}

function post(url, data, secured) {
  let headers = setAuthToken(
    {
      'content-type': 'application/json',
    },
    secured
  );

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: headers,
    })
      .then(function(res) {
        if (res.ok || res.status === 201) {
          resolve(res.json());
        } else {
          console.error('Error posting', url, data, res);
          reject(getAppropriateError(res.status));
        }
      })
      .catch(function(error) {
        console.log('Error with request', url, error);
      });
  });
}

function put(url, data, secured) {
  let headers = setAuthToken(
    {
      'content-type': 'application/json',
    },
    secured
  );

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: headers,
    }).then(function(res) {
      if (res.ok) {
        resolve(res.json());
      } else {
        console.log(res);
        reject(getAppropriateError(res.status));
      }
    }).catch(function(error) {
      console.log('Error with request', url, error);
    });
  });
}

function getAppropriateError(httpStatusCode, message) {
  switch (httpStatusCode) {
    case 401: {
      return new UnauthorizedError();
    }
    case 404: {
      return new NotFoundError();
    }
    case 400:
    case 422:
      return new BadRequestError(httpStatusCode, message);
    default: {
      return new ServerError(httpStatusCode, message);
    }
  }
}

/**
 * Sets the authorization header in the "headers" if secured is true
 * @param headers
 * @param secured
 * @returns {*}
 */
function setAuthToken(headers, secured) {
  if (secured) {
    let authToken = localStorage.getItem('__AUTH_TOKEN');
    if (authToken) {
      return Object.assign({}, headers, {
        authorization: 'Bearer ' + authToken,
      });
    }
  }

  return headers;
}

export class IMDbaeError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}

export class NotFoundError extends IMDbaeError {
  constructor(status = 404, message = 'Not found') {
    super(status, message);
  }
}

export class UnauthorizedError extends IMDbaeError {
  constructor(status = 401, message = 'User unauthorized') {
    super(status, message);
  }
}

export class BadRequestError extends IMDbaeError {
  constructor(status = 403, message = 'Bad request') {
    super(status, message);
  }
}

export class ServerError extends IMDbaeError {
  constructor(status = 500, message = 'Server error') {
    super(status, message);
  }
}

export const CRUD = {
  get,
  post,
  put,
  delete: deleteEntity,
  getFromText
};
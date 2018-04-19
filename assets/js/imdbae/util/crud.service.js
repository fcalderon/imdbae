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

function deleteEntity(url, secured) {
  let headers = setAuthToken(
    {
      'content-type': 'application/json',
    },
    secured
  );

  console.log('Getting', url);
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'DELETE',
      headers: headers,
    })
      .then(function(res) {
        if (res.ok) {
          resolve();
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
        }
		else if (res.status === 422) {
			console.log("422 Response", res);
		}
		  else {
          console.log(res);
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

function getAppropriateError(httpStatusCode) {
  switch (httpStatusCode) {
    case 401: {
      return new UnauthorizedError();
    }
    case 404: {
      return new NotFoundError();
    }
    default: {
      return new ServerError();
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

export class NotFoundError extends Error {}
export class UnauthorizedError extends Error {}
export class ServerError extends Error {}

export const CRUD = {
  get,
  post,
  put,
  delete: deleteEntity,
};

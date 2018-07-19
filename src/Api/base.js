import { logger } from "../utils";

class Api {
  static headers = {};
  constructor(root, options) {
    options = options || {};
    this.root = root;
    this.headers = { ...Api.headers, ...(options.headers || {}) };
  }

  fetch(url, options) {
    options = options || {};
    const headers = { ...this.headers, ...(options.headers || {}) };
    delete options.headers;
    const requestOptions = {
      headers,
      ...options
    };

    return fetch(this.root + url, requestOptions)
      .then(this.checkResponseForErrors)
      .catch(err => {
        if (err.IS_HASH_ERROR) {
          logger.warn(
            `API ERROR : ${options.method || "GET"} | ${this.root + url}`,
            err.message
          );
          throw err;
        } else {
          console.warn("----backend server down error : ", url, err);
          throw { message: "Backend server is down." };
        }
      });
  }

  checkResponseForErrors(unprocessedResponse) {
    return unprocessedResponse.json().then(res => {
      if (res && res.error) throw res;
      if (res === false) throw res;
      return res;
    });
  }

  get(url, options) {
    return this.fetch(url, ...(options || {}));
  }

  post(url, body, options) {
    return this.fetch(url, {
      method: "post",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(body)
    });
  }

  put(url, body, options) {
    return this.fetch(url, {
      method: "put",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(body)
    });
  }

  delete(url, body, options) {
    return this.fetch(url, {
      method: "delete",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(body)
    });
  }
}

export default Api;

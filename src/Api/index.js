import { AsyncStorage } from "react-native";
import config from "../../config";
import { createUser } from "../Models";
import logger from "../utils/logger";

class Api {
  static headers = {};
  constructor(root, options) {
    options = options || {};
    this.root = root;
    this.headers = { ...Api.headers };
    this.headers = { ...this.headers, ...(options.headers || {}) };
  }

  fetch = (url, options) => {
    options = options || {};
    const headers = { ...this.headers, ...(options.headers || {}) };
    delete options.headers;
    const requestOptions = {
      headers,
      ...options
    };

    return fetch(config.api.root + url, requestOptions)
      .then(this.checkResponseForErrors)
      .then(this.saveTokenAndUserFromResponse)
      .catch(err => {
        if (err.IS_HASH_ERROR) {
          logger.warn(
            `API ERROR : ${options.method || "GET"} | ${config.api.root + url}`,
            err.message
          );
          throw err;
        } else {
          throw { message: "Backend server is down." };
        }
      });
  };

  checkResponseForErrors = unprocessedResponse => {
    return unprocessedResponse.json().then(res => {
      if (!res || res.error) throw res;
      return res;
    });
  };

  get = (url, options) => {
    return this.fetch(url, ...(options || {}));
  };

  post = (url, body, options) => {
    return this.fetch(url, {
      method: "post",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(body)
    });
  };

  put = (url, body, options) => {
    return this.fetch(url, {
      method: "put",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(body)
    });
  };

  delete = (url, body, options) => {
    return this.fetch(url, {
      method: "delete",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(body)
    });
  };

  saveTokenAndUserFromResponse = res => {
    // TODO --- modify, since not planning on using JWTS
    if (!res) return res;
    const user = res.user;
    if (!user) return res;
    this.user = createUser(user);
    this.saveToken(user.token);
    user.isAuthenticated = true;
    return res;
  };

  saveToken = token => {
    // TODO --- modify, since not planning on using JWTS
    if (!valExists(token) || this.token === token) return;
    this.token = token;
    this.headers.authorization = `Bearer ${this.token}`;
    AsyncStorage.mergeItem("user", JSON.stringify({ token }));
  };

  logout = () => {
    this.user = null;
    console.warn("----TODO...");
    AsyncStorage.removeItem("user");
    return Promise.resolve();
    // return this.get(config.api.logout);
  };

  login = user => {
    return this.post(config.api.login, { user })
      .then(this.saveTokenAndUserFromResponse)
      .then(res => createUser(res.user));
  };

  signup = user => {
    return this.post(config.api.signup, { user })
      .then(this.saveTokenAndUserFromResponse)
      .then(res => createUser(res.user));
  };

  registerDeviceToken = device_token => {
    return this.post(config.api.notifications.register, { device_token });
  };

  checkUsernameAvailability = username => {
    return this.get(
      config.api.users.checkAvailability + "?username=" + username
    ).then(res => res.isAvailable);
  };

  selectUsername = username => {
    return this.put(config.api.users.root, {
      updates: { username }
    }).then(() => username);
  };
}

export default new Api(config.api.root);

import { BaseUser } from "./BaseUser.model";

export class User extends BaseUser {
  static validProperties = {
    ...BaseUser.validProperties,
    token: { type: String, default: null },
    is_authenticated: { type: Boolean, default: false },
    device_token: {
      type: String,
      default: ""
    }
  };

  trim() {
    const trimmed = super.trim();
    return trimmed;
  }
}

export const createUser = options => {
  return new User(options);
};
export const updateUser = (oldUser, options) => {
  return oldUser.renew(options);
};

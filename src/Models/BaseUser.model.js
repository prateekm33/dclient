import DataModel from "./Data.model";

export class BaseUser extends DataModel {
  static validProperties = {
    id: { type: Number, default: null },
    invite_type: { type: String, default: "" },
    is_searchable: { type: Boolean, default: false },
    username: { type: String, default: "" },
    first_name: { type: String, default: "" },
    last_name: { type: String, default: "" },
    email: { type: String, default: "" },
    phone_number: { type: String, default: "" },
    is_anon_user: { type: Boolean, default: false }
  };

  trim() {
    const copy = this.renew();
    return copy;
  }

  getId = () => {
    return this.is_anon_user ? this.uuid : this.id;
  };

  getKey = () => this.key;

  getName = options => {
    options = options || {};
    if (options.user && this.isMyself(options.user)) return "ME";
    if (this.first_name || this.last_name)
      return (this.first_name || "") + " " + (this.last_name || "");
    else if (this.username) return this.username;
    else if (this.email) return this.email;
    else if (this.phone_number) return this.phone_number;
  };

  isMyself = user => {
    if (
      (this.id !== null && user.id !== null) ||
      (!this.is_anon_user && !user.is_anon_user)
    ) {
      return this.id === user.id;
    } else {
      return (
        this.email === user.email ||
        this.phone_number === user.phone_number ||
        this.uuid === user.uuid
      );
    }
  };

  getAbbrvName = () => {};
}

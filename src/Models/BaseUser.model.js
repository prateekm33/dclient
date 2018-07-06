import DataModel from "./Data.model";

export class BaseUser extends DataModel {
  static validProperties = {
    invite_type: { type: String, default: "" },
    is_searchable: { type: Boolean, default: true },
    username: { type: String, default: "" },
    first_name: { type: String, default: "" },
    last_name: { type: String, default: "" },
    email: { type: String, default: "" },
    phone_number: { type: String, default: "" }
  };

  trim() {
    const copy = this.renew();
    return copy;
  }

  getKey = () => this.key;

  getAbbrvName = () => {};
}

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
    phone_number: { type: String, default: "" }
  };

  trim() {
    const copy = this.renew();
    return copy;
  }

  getId = () => {
    return this.id;
  };

  getKey = () => this.key;

  getAbbrvName = () => {};
}

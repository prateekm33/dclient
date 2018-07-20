import DataModel from "./Data.model";
import { Location, createLocation } from "./Location.model";
import { Rating, createRating } from "./Rating.model";
import { Deal } from "./Deal.model";
import phone from "phone";

export class Vendor extends DataModel {
  static validProperties = {
    name: { type: String, default: "" },
    // location: {
    //   type: Location,
    //   default: val => createLocation(val)
    // },
    address: { type: String, default: "" },
    latitude: { type: Number, default: 0 },
    longitude: { type: Number, default: 0 },
    business_phone: {
      type: String,
      default: "",
      verifyValue: value => phone(value)[0]
    },
    business_email: { type: String, default: "" },
    rating: {
      type: Rating,
      default: val => createRating(val)
    },
    deals: {
      type: Array,
      default: () => [],
      verifyValue: value => {
        return value.map(
          item => (item instanceof Deal ? item : new Deal(item))
        );
      }
    },
    type: { type: String, default: "" },
    hours: {
      type: Array,
      default: () => [],
      verifyValue: value => {
        return value.map(
          hour => (hour instanceof Hour ? hour : new Hour(hour))
        );
      }
    },
    cuisines: {
      type: Array,
      default: () => []
    }
  };

  formattedPhoneNumber = () => {
    if (!this.business_phone) return "";
    let temp = this.business_phone.split("+1")[1];
    let phone = "";
    return `(${temp.substr(0, 3)}) ${temp.substr(3, 3)}-${temp.substr(6, 4)}`;
  };
}

export const createVendor = params => new Vendor(params);
export const updateVendor = (vendor, params) => vendor.renew(params);

class Hour extends DataModel {
  static validProperties = {
    day: { type: String, default: "" },
    from: { type: Date, default: null },
    to: { type: Date, default: null }
  };

  constructor(params) {
    console.warn("----TODO...handle parsing of hour -- > ", params);
    super(params);
  }
}

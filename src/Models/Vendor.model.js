import DataModel from "./Data.model";
import { Location } from "./Location.model";
import { Rating } from "./Rating.model";
import { Deal } from "./Deal.model";

export class Vendor extends DataModel {
  static validProperties = {
    name: { type: String, default: "" },
    location: {
      type: Location,
      default: () => new Location(),
      verifyValue: value => {
        return value instanceof Location ? value : new Location(value);
      }
    },
    phone_number: { type: String, default: "" },
    email: { type: String, default: "" },
    rating: {
      type: Rating,
      default: new Rating(),
      verifyValue: value => {
        return value instanceof Rating ? value : new Rating(value);
      }
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
        value.map(hour => (hour instanceof Hour ? hour : new Hour(hour)));
      }
    }
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

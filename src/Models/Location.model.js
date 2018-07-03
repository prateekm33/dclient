import DataModel from "./Data.model";

export class Location extends DataModel {
  static validProperties = {
    address_line_1: { type: String, default: "" },
    address_line_2: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    country: { type: String, default: "" },
    zip_code: { type: String, default: "" },
    coordinates: { type: Coordinates, default: () => new Coordinates() }
  };
}

export const createLocation = params => new Location(params);

class Coordinates extends DataModel {
  static validProperties = {
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 }
  };

  constructor(params) {
    console.warn("----TODO..handle parsing of coordinate object : ", params);
    super(params);
  }
}

import { google } from "../../config";
import BaseApi from "../Api/base";
class GoogleClient extends BaseApi {
  constructor(params) {
    super(`https://maps.googleapis.com/maps/api`);
    this.API_KEY = params.API_KEY;
    this.fetch = this.fetch.bind(this);
  }

  fetch(url, options) {
    return super.fetch(`${url}&key=${this.API_KEY}`, options);
  }

  reverseGeocode = coords => {
    return this.get(
      `geocode/json?latlng=${encodeURI(
        `${coords.latitude},${coords.longitude}`
      )}`
    ).then(response => {
      if (response.status !== "OK")
        throw createNewError({
          message: "Unable to geocode address: " + address
        });
      const addy = (response.results || [])[0];
      return addy.formatted_address;
    });
  };

  getDistance = (A, B) =>
    Math.sqrt(
      Math.pow(A.latitude - B.latitude, 2) /
        Math.pow(A.longitude - B.longitude, 2)
    );
}

export default new GoogleClient(google.API_KEY);

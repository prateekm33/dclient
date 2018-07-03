import DataModel from "./Data.model";

export class Rating extends DataModel {
  static validProperties = {
    max: { type: Number, default: 5 },
    value: { type: Number, default: 0 }
  };
}
export const createRating = params => new Rating(params);
export const updateRating = (rating, params) => rating.renew(params);

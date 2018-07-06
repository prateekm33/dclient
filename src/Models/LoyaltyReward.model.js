import DataModel from "./Data.model";
import { Vendor, createVendor } from "./Vendor.model";
import uuid from "uuid/v1";
import moment from "moment";

export class LoyaltyReward extends DataModel {
  static validProperties = {
    name: { type: String, default: "" },
    short_desc: { type: String, default: "" },
    long_desc: { type: String, default: "" },
    vendor: {
      type: Vendor,
      default: val => new Vendor(val)
    },
    vendor_uuid: { type: String, default: () => uuid() },
    code: { type: String, default: "" },
    created_at: {
      type: moment,
      default: val => {
        if (!val) return null;
        const date = moment(val);
        if (date.isValid()) return date;
        return null;
      }
    }
  };

  constructor(params) {
    if (params && params.vendor) {
      params.vendor =
        params.vendor instanceof Vendor
          ? params.vendor
          : createVendor(params.vendor);
    }
    super(params);
  }
}
export const createLoyaltyReward = params => new LoyaltyReward(params);

export class MyLoyaltyRewardCard extends LoyaltyReward {
  static validProperties = {
    ...LoyaltyReward.validProperties,
    points: { type: Number, default: 0 },
    num_points_redeemed: { type: Number, default: 0 }
  };

  memberSince = () => this.created_at.format("MMMM DD YYYY");
}
export const createMyLoyaltyRewardCard = params =>
  new MyLoyaltyRewardCard(params);
export const udpateMyLoyaltyRewardCard = (oldCard, params) =>
  oldCard.renew(params);

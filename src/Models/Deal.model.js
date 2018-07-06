import DataModel from "./Data.model";
import { Vendor, createVendor } from "./Vendor.model";
import uuid from "uuid/v1";
import moment from "moment";

export class Deal extends DataModel {
  static validProperties = {
    name: { type: String, default: "" },
    short_desc: { type: String, default: "" },
    long_desc: { type: String, default: "" },
    vendor: {
      type: Vendor,
      default: () => new Vendor()
    },
    vendor_uuid: { type: String, default: () => uuid() },
    code: {
      type: String,
      default: ""
    },
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
export const createDeal = params => new Deal(params);

export class MyDeal extends Deal {
  static validProperties = {
    ...Deal.validProperties,
    is_saved: { type: Boolean, default: true },
    is_archived: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
    is_used: { type: Boolean, default: false }
  };
}
export const createMyDeal = params => new MyDeal(params);
export const updateMyDeal = (my_deal, params) => my_deal.renew(params);

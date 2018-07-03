import DataModel from "./Data.model";
import { Vendor } from "./Vendor.model";

export class Deal extends DataModel {
  static validProperties = {
    title: { type: String, default: "" },
    short_desc: { type: String, default: "" },
    long_desc: { type: String, default: "" },
    vendor: { type: Vendor, default: () => new Vendor() },
    vendor_id: { type: Number, default: null }
  };
}
export const createDeal = params => new Deal(params);

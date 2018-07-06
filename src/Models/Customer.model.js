import { BaseUser } from "./BaseUser.model";
import { Deal } from "./Deal.model";
import { LoyaltyReward, createLoyaltyReward } from "./LoyaltyReward.model";

export class Customer extends BaseUser {
  static validProperties = {
    ...BaseUser.validProperties,
    token: { type: String, default: null },
    is_authenticated: { type: Boolean, default: false },
    device_token: {
      type: String,
      default: ""
    },
    device_uuid: { type: String, default: "" },
    favorite_deals: {
      type: Array,
      verifyValue: value => {
        return value.map(
          deal => (deal instanceof Deal ? deal : new Deal(deal))
        );
      }
    },
    loyalty_rewards_cards: {
      type: Array,
      default: () => [],
      verifyValue: value => {
        return value.map(
          card =>
            card instanceof LoyaltyReward ? card : createLoyaltyReward(card)
        );
      }
    }
  };

  trim() {
    const trimmed = super.trim();
    return trimmed;
  }

  getFavoriteDeals = () => this.favorite_deals;

  getScannableCustomer = () => {
    /**
     * ADD IN ANY DATA A CUSTOMER WISHES TO SHARE WITH A VENDOR HERE
     * This is what will be wrapped in the QR Code that gets scanned.
     */
    return {
      uuid: this.uuid,
      first_name: this.first_name,
      last_name: this.last_name
    };
  };
}

export const createCustomer = options => new Customer(options);
export const updateCustomer = (oldCustomer, options) =>
  oldCustomer.renew(options);

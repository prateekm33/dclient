import { BaseUser } from "./BaseUser.model";

export class User extends BaseUser {
  static validProperties = {
    ...BaseUser.validProperties,
    token: { type: String, default: null },
    is_authenticated: { type: Boolean, default: false },
    device_token: {
      type: String,
      default: ""
    },
    favorites: {
      type: Array,
      default: () => [
        {
          name: "Cizerros",
          short_desc: "Pizza pizza read all about it",
          address_locale: "21335 Bubb Rd, Cupertino, CA 95014",
          deals: [
            {
              short_desc: "$6 pizzas off of any two medium pizzas",
              title: "2 Medium Pizzas for $6",
              vendor: {
                name: "Cizerrors",
                type: "restaurant"
              },
              code: 0
            },
            {
              short_desc: "$10.99 for any large pizza from the Yeezus menu.",
              title: "1 Large Pizza for $10.99",
              vendor: {
                name: "Cizerrors",
                type: "restaurant"
              },
              code: 2
            }
          ]
        },
        {
          name: "Pizza hut",
          short_desc: "Pizza pizza read all about that",
          address_locale: "21335 Stevens Creek Blvd, Cupertino, CA 95014",
          deals: [
            {
              short_desc: "$6 pizzas off of any two medium pizzas",
              title: "2 Medium Pizzas for $6",
              vendor: {
                name: "Pizza Hut",
                type: "restaurant"
              },
              code: 1
            }
          ]
        }
      ]
    },
    wishlist: { type: Array, default: () => [] }
  };

  trim() {
    const trimmed = super.trim();
    return trimmed;
  }
}

export const createUser = options => {
  return new User(options);
};
export const updateUser = (oldUser, options) => {
  return oldUser.renew(options);
};

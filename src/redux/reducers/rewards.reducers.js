import reward_types from "../types/reward.types";
import customer_types from "../types/customer.types";

export default {
  loyalty_rewards(state, action) {
    switch (action.type) {
      case reward_types.FETCHED_ALL_REWARDS:
        return action.loyalty_rewards;
      case customer_types.LOGGED_OUT_CUSTOMER:
        return [];
      default:
        return state || [];
    }
  },

  my_loyalty_rewards(state, action) {
    switch (action.type) {
      case reward_types.FETCHED_ALL_MY_REWARDS:
        return action.loyalty_rewards;
      case customer_types.LOGGED_OUT_CUSTOMER:
        return [];
      default:
        return state || [];
    }
  }
};

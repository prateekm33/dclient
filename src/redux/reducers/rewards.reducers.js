import reward_types from "../types/reward.types";

export default {
  loyalty_rewards(state, action) {
    switch (action.type) {
      case reward_types.FETCHED_ALL_REWARDS:
        return actio.loyalty_rewards;
      default:
        return state || [];
    }
  }
};

import deal_types from "../types/deal.types";

export default {
  deals(state, action) {
    switch (action.type) {
      case deal_types.FETCHED_ALL_DEALS:
        return action.deals;
      default:
        return state || [];
    }
  }
};

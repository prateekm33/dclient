import deal_types from "../types/deal.types";
import customer_types from "../types/customer.types";

export default {
  deals(state, action) {
    switch (action.type) {
      case deal_types.FETCHED_ALL_DEALS:
        return action.deals;
      case customer_types.LOGGED_OUT_CUSTOMER:
        return [];
      default:
        return state || [];
    }
  }
};

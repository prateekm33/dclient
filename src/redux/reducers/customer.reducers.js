import { createCustomer, updateCustomer } from "../../Models";
import deal_types from "../types/deal.types";
import reward_types from "../types/reward.types";
import customer_types from "../types/customer.types";

export default {
  customer(state, action) {
    switch (action.type) {
      case deal_types.FETCHED_SAVED_DEALS:
        return setSavedDealsToCustomer(state, action.deals);
      case reward_types.SUBSCRIBED_TO_REWARD_CARD_PROGRAM:
        return addRewardProgramToCustomer(state, action.loyalty_reward);
      case reward_types.UNSUBSCRIBED_FROM_REWARD_CARD_PROGRAM:
        return removeRewardProgramFromCustomer(
          state,
          action.loyalty_reward_uuid,
          action.vendor_uuid
        );
      // case deal_types.SAVED_DEAL:
      //   return addSavedDealToCustomer(state, action.deal);
      // case deal_types.UNSAVED_DEAL:
      //   return removeSavedDealFromCustomer(
      //     customer,
      //     action.deal_uuid,
      //     action.vendor_uuid
      //   );
      case customer_types.SAVE_CUSTOMER_DATA:
        return updateCustomer(state, action.customer);

      default:
        return state || createCustomer();
    }
  }
};
function setSavedDealsToCustomer(customer, deals) {
  return customer.renew({ saved_deals: deals });
}
function addSavedDealToCustomer(customer, deal) {
  return customer.renew({
    saved_deals: customer.saved_deals.concat(deal)
  });
}
function removeSavedDealFromCustomer(customer, deal_uuid, vendor_uuid) {
  return customer.renew({
    saved_deals: customer.saved_deals.map(
      deal => deal.vendor_uuid !== vendor_uuid || deal.uuid !== deal_uuid
    )
  });
}

function addRewardProgramToCustomer(customer, reward) {
  return customer.renew({
    loyalty_rewards_cards: customer.loyalty_rewards_cards.concat(reward)
  });
}
function removeRewardProgramFromCustomer(
  customer,
  loyalty_reward_uuid,
  vendor_uuid
) {
  return customer.renew({
    loyalty_rewards_cards: customer.loyalty_rewards_cards.filter(
      card =>
        card.vendor_uuid !== vendor_uuid || card.uuid !== loyalty_reward_uuid
    )
  });
}

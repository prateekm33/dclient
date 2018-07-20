import Api from "../../Api";
import { dispatchErrorActionOfType } from ".";
import error_types from "../types/error.types";
import reward_types from "../types/reward.types";
import loading_types from "../types/loading.types";

export const fetchRewardDetailsAction = (
  vendor_uuid,
  loyalty_reward_uuid
) => dispatch => {
  dispatch({
    type: loading_types.FETCHING_LOYALTY_REWARD_DETAILS,
    loading: true
  });
  return Api.getVendorRewards({ vendor_uuid, loyalty_reward_uuid })
    .then(loyalty_reward => {
      dispatch({
        type: loading_types.FETCHING_LOYALTY_REWARD_DETAILS,
        loading: false
      });
      return loyalty_reward;
    })
    .catch(error => {
      dispatch({
        type: loading_types.FETCHING_LOYALTY_REWARD_DETAILS,
        loading: false
      });
      dispatchErrorActionOfType(
        error_types.FETCHING_LOYALTY_REWARD_DETAILS_ERROR
      )(error);
      return false;
    });
};

export const fetchRewardCustomerDetailsAction = (
  vendor_uuid,
  loyalty_reward_uuid
) => dispatch => {
  dispatch({
    type: loading_types.FETCHING_LOYALTY_REWARD_CUSTOMER_DETAILS,
    loading: true
  });
  return Api.getMyRewardsCard({ vendor_uuid, loyalty_reward_uuid })
    .then(loyalty_reward => {
      dispatch({
        type: loading_types.FETCHING_LOYALTY_REWARD_CUSTOMER_DETAILS,
        loading: false
      });
      return loyalty_reward;
    })
    .catch(error => {
      dispatch({
        type: loading_types.FETCHING_LOYALTY_REWARD_CUSTOMER_DETAILS,
        loading: false
      });
      dispatchErrorActionOfType(
        error_types.FETCHING_LOYALTY_REWARD_CUSTOMER_DETAILS_ERROR
      )(error);
      return false;
    });
};

export const fetchMyRewardsCardsAction = (limit, offset) => dispatch => {
  dispatch({ type: loading_types.FETCHING_MY_LOYALTY_REWARDS, loading: true });
  return Api.getMyRewardsCards({ limit, offset })
    .then(res => {
      dispatch({
        type: loading_types.FETCHING_MY_LOYALTY_REWARDS,
        loading: false
      });
      dispatch({
        type: reward_types.FETCHED_ALL_MY_REWARDS,
        loyalty_rewards: res.loyalty_rewards
      });
      return res;
    })
    .catch(error => {
      dispatch({
        type: loading_types.FETCHING_MY_LOYALTY_REWARDS,
        loading: false
      });
      dispatchErrorActionOfType(error_types.FETCHING_MY_LOYALTY_REWARDS_ERROR)(
        error
      );
      return false;
    });
};

export const fetchAllRewardsCardsAction = (limit, offset) => dispatch => {
  dispatch({ type: loading_types.FETCHING_ALL_LOYALTY_REWARDS, loading: true });
  return Api.getMyRewardsCards({ limit, offset })
    .then(res => {
      dispatch({
        type: loading_types.FETCHING_ALL_LOYALTY_REWARDS,
        loading: false
      });
      dispatch({
        type: reward_types.FETCHED_ALL_REWARDS,
        loyalty_rewards: res.loyalty_rewards
      });
      return res;
    })
    .catch(error => {
      dispatch({
        type: loading_types.FETCHING_ALL_LOYALTY_REWARDS,
        loading: false
      });
      dispatchErrorActionOfType(error_types.FETCHING_ALL_LOYALTY_REWARDS_ERROR)(
        error
      );
      return false;
    });
};

export const unsubscribeFromRewardCardAction = (
  vendor_uuid,
  loyalty_reward_uuid
) => dispatch => {
  dispatch({
    type: loading_types.UNSUBSCRIBING_FROM_REWARD_CARD_PROGRAM,
    loading: true
  });
  return Api.leaveRewardsCard({ loyalty_reward_uuid, vendor_uuid })
    .then(done => {
      dispatch({
        type: loading_types.UNSUBSCRIBING_FROM_REWARD_CARD_PROGRAM,
        loading: false
      });
      dispatch({
        type: reward_types.UNSUBSCRIBED_FROM_REWARD_CARD_PROGRAM,
        loyalty_reward_uuid,
        vendor_uuid
      });
      return done;
    })
    .catch(error => {
      dispatch({
        type: loading_types.UNSUBSCRIBING_FROM_REWARD_CARD_PROGRAM,
        loading: false
      });
      dispatchErrorActionOfType(
        error_types.UNSUBSCRIBING_FROM_REWARD_CARD_PROGRAM_ERROR
      )(error);
      return false;
    });
};

export const subscribeToRewardCardAction = (
  vendor_uuid,
  loyalty_reward_uuid,
  loyalty_reward
) => dispatch => {
  dispatch({
    type: loading_types.SUBSCRIBING_TO_REWARD_CARD_PROGRAM,
    loading: true
  });
  return Api.joinRewardsCard({
    loyalty_reward,
    loyalty_reward_uuid,
    vendor_uuid
  })
    .then(res_loyalty_reward => {
      dispatch({
        type: loading_types.SUBSCRIBING_TO_REWARD_CARD_PROGRAM,
        loading: false
      });
      dispatch({
        type: reward_types.SUBSCRIBED_TO_REWARD_CARD_PROGRAM,
        loyalty_reward_uuid,
        vendor_uuid
      });
      return res_loyalty_reward;
    })
    .catch(error => {
      dispatch({
        type: loading_types.SUBSCRIBING_TO_REWARD_CARD_PROGRAM,
        loading: false
      });
      dispatchErrorActionOfType(
        error_types.SUBSCRIBING_TO_REWARD_CARD_PROGRAM_ERROR
      )(error);
      return false;
    });
};

export const searchRewardsAction = ({ search, limit, offset }) => dispatch => {
  dispatch({ type: loading_types.SEARCHING_REWARDS, loading: true });
  return Api.searchRewards({ search, limit, offset })
    .then(vendors => {
      dispatch({
        type: loading_types.SEARCHING_REWARDS,
        loading: false
      });
      return vendors;
    })
    .catch(error => {
      dispatch({
        type: loading_types.SEARCHING_REWARDS,
        loading: false
      });
      dispatchErrorActionOfType(error_types.SEARCHING_REWARDS_ERROR)(error);
      return false;
    });
};

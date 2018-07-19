import Api from "../../Api";
import { dispatchErrorActionOfType } from ".";
import error_types from "../types/error.types";
import deal_types from "../types/deal.types";
import loading_types from "../types/loading.types";

export const createMyDealAction = (deal_uuid, vendor_uuid) => dispatch => {
  dispatch({ type: loading_types.CREATING_MY_DEAL, loading: true });
  return Api.createMyDeal({ deal_uuid, vendor_uuid })
    .then(deal => {
      dispatch({ type: loading_types.CREATING_MY_DEAL, loading: false });
      return deal;
    })
    .catch(error => {
      dispatch({ type: loading_types.CREATING_MY_DEAL, loading: false });
      dispatchErrorActionOfType(error_types.CREATING_MY_DEAL_ERROR)(error);
      return false;
    });
};

export const fetchDealDetailsAction = (vendor_uuid, deal_uuid) => dispatch => {
  dispatch({ type: loading_types.FETCHING_DEAL_DETAILS, loading: true });
  return Api.getVendorDeals({ vendor_uuid, deal_uuid })
    .then(deal => {
      dispatch({ type: loading_types.FETCHING_DEAL_DETAILS, loading: false });
      return deal;
    })
    .catch(error => {
      dispatch({ type: loading_types.FETCHING_DEAL_DETAILS, loading: false });
      dispatchErrorActionOfType(error_types.FETCHING_DEAL_DETAILS_ERROR)(error);
      return false;
    });
};

export const fetchDealCustomerDetailsAction = (
  vendor_uuid,
  deal_uuid
) => dispatch => {
  dispatch({
    type: loading_types.FETCHING_DEAL_CUSTOMER_DETAILS,
    loading: true
  });
  return Api.getMyDeal({ vendor_uuid, deal_uuid })
    .then(deal => {
      dispatch({
        type: loading_types.FETCHING_DEAL_CUSTOMER_DETAILS,
        loading: false
      });
      return deal;
    })
    .catch(error => {
      dispatch({
        type: loading_types.FETCHING_DEAL_CUSTOMER_DETAILS,
        loading: false
      });
      dispatchErrorActionOfType(
        error_types.FETCHING_DEAL_CUSTOMER_DETAILS_ERROR
      )(error);
      return false;
    });
};

export const fetchAllDealsAction = (limit, offset) => dispatch => {
  dispatch({ type: loading_types.FETCHING_ALL_DEALS, loading: true });
  return Api.getDeals({ limit, offset })
    .then(res => {
      dispatch({ type: loading_types.FETCHING_ALL_DEALS, loading: false });
      dispatch({ type: deal_types.FETCHED_ALL_DEALS, deals: res.deals });
      return res;
    })
    .catch(error => {
      dispatch({ type: loading_types.FETCHING_ALL_DEALS, loading: false });
      dispatchErrorActionOfType(error_types.FETCHING_ALL_DEALS_ERROR)(error);
      return false;
    });
};
export const fetchSavedDealsAction = (limit, offset) => dispatch => {
  dispatch({ type: loading_types.FETCHING_SAVED_DEALS, loading: true });
  return Api.getSavedDeals({ limit, offset })
    .then(res => {
      dispatch({ type: loading_types.FETCHING_SAVED_DEALS, loading: false });
      dispatch({ type: deal_types.FETCHED_SAVED_DEALS, deals: res.deals });
      return res;
    })
    .catch(error => {
      dispatch({ type: loading_types.FETCHING_SAVED_DEALS, loading: false });
      dispatchErrorActionOfType(error_types.FETCHING_SAVED_DEALS_ERROR)(error);
      return false;
    });
};

export const saveDealAction = (deal_uuid, vendor_uuid, deal) => dispatch => {
  dispatch({ type: loading_types.SAVING_DEAL, loading: true });
  return Api.saveDeal({ deal_uuid, vendor_uuid, deal })
    .then(res_deal => {
      dispatch({ type: loading_types.SAVING_DEAL, loading: false });
      dispatch({ type: deal_types.SAVED_DEAL, deal });
      return res_deal;
    })
    .catch(error => {
      dispatch({ type: loading_types.SAVING_DEAL, loading: false });
      dispatchErrorActionOfType(error_types.SAVING_DEAL_ERROR)(error);
      return false;
    });
};

export const unSaveDealAction = (deal_uuid, vendor_uuid) => dispatch => {
  dispatch({ type: loading_types.UNSAVING_DEAL, loading: true });
  return Api.unSaveDeal({ deal_uuid, vendor_uuid })
    .then(deal => {
      dispatch({ type: loading_types.UNSAVING_DEAL, loading: false });
      dispatch({ type: deal_types.UNSAVED_DEAL, deal_uuid, vendor_uuid });
      return deal;
    })
    .catch(error => {
      dispatch({ type: loading_types.UNSAVING_DEAL, loading: false });
      dispatchErrorActionOfType(error_types.UNSAVING_DEAL_ERROR)(error);
      return false;
    });
};

export const fetchVendorDealsAction = ({
  vendor,
  offset,
  limit
}) => dispatch => {
  dispatch({ type: loading_types.FETCHING_VENDOR_DEALS, loading: true });
  return Api.getVendorDeals({ vendor_uuid: vendor.uuid, offset, limit })
    .then(res => {
      dispatch({ type: loading_types.FETCHING_VENDOR_DEALS, loading: false });
      return res;
    })
    .catch(error => {
      dispatch({ type: loading_types.FETCHING_VENDOR_DEALS, loading: false });
      dispatchErrorActionOfType(error_types.FETCHING_VENDOR_DEALS_ERROR)(error);
      return false;
    });
};

export const fetchVendorRewardsAction = ({
  vendor,
  limit,
  offset
}) => dispatch => {
  dispatch({ type: loading_types.FETCHING_VENDOR_REWARDS, loading: true });
  return Api.getVendorRewards({ vendor_uuid: vendor.uuid, limit, offset })
    .then(res => {
      dispatch({ type: loading_types.FETCHING_VENDOR_REWARDS, loading: false });
      return res;
    })
    .catch(error => {
      dispatch({ type: loading_types.FETCHING_VENDOR_REWARDS, loading: false });
      dispatchErrorActionOfType(error_types.FETCHING_VENDOR_REWARDS_ERROR)(
        error
      );
      return false;
    });
};

export const searchDealsAction = ({ search, limit, offset }) => dispatch => {
  dispatch({ type: loading_types.SEARCHING_DEALS, loading: true });
  return Api.searchDeals({ search, limit, offset })
    .then(deals => {
      dispatch({ type: loading_types.SEARCHING_DEALS, loading: false });
      return deals;
    })
    .catch(error => {
      dispatch({ type: loading_types.SEARCHING_DEALS, loading: false });
      dispatchErrorActionOfType(error_types.SEARCHING_DEALS_ERROR)(error);
      return false;
    });
};

import Api from "../../Api";
import { dispatchErrorActionOfType } from ".";
import loading_types from "../types/loading.types";
import error_types from "../types/error.types";

export const fetchVendorDetailsAction = vendor_uuid => dispatch => {
  dispatch({ type: loading_types.FETCHING_VENDOR_DETAILS, loading: true });
  return Api.getVendors(vendor_uuid)
    .then(vendor => {
      dispatch({ type: loading_types.FETCHING_VENDOR_DETAILS, loading: false });
      return vendor;
    })
    .catch(error => {
      dispatch({ type: loading_types.FETCHING_VENDOR_DETAILS, loading: false });
      dispatchErrorActionOfType(error_types.FETCHING_VENDOR_DETAILS_ERROR)(
        error
      );
      return false;
    });
};

export const fetchAllVendorsAction = (limit, offset) => dispatch => {
  dispatch({ type: loading_types.FETCHING_ALL_VENDORS, loading: true });
  return Api.getVendors(null, { limit, offset, type: "all" })
    .then(vendors => {
      dispatch({ type: loading_types.FETCHING_ALL_VENDORS, loading: false });
      return vendors;
    })
    .catch(error => {
      dispatch({ type: loading_types.FETCHING_ALL_VENDORS, loading: false });
      dispatchErrorActionOfType(error_types.FETCHING_ALL_VENDORS_ERROR)(error);
      return false;
    });
};
export const fetchFollowingVendorsAction = (limit, offset) => dispatch => {
  dispatch({ type: loading_types.FETCHING_FOLLOWED_VENDORS, loading: true });
  return Api.getVendors(null, { limit, offset, type: "following" })
    .then(vendors => {
      dispatch({
        type: loading_types.FETCHING_FOLLOWED_VENDORS,
        loading: false
      });
      return vendors;
    })
    .catch(error => {
      dispatch({
        type: loading_types.FETCHING_FOLLOWED_VENDORS,
        loading: false
      });
      dispatchErrorActionOfType(error_types.FETCHING_FOLLOWED_VENDORS_ERROR)(
        error
      );
      return false;
    });
};

export const searchVendorsAction = ({ search, limit, offset }) => dispatch => {
  dispatch({ type: loading_types.SEARCHING_VENDORS, loading: true });
  return Api.searchVendors({ search, limit, offset })
    .then(vendors => {
      dispatch({
        type: loading_types.SEARCHING_VENDORS,
        loading: false
      });
      return vendors;
    })
    .catch(error => {
      dispatch({
        type: loading_types.SEARCHING_VENDORS,
        loading: false
      });
      dispatchErrorActionOfType(error_types.SEARCHING_VENDORS_ERROR)(error);
      return false;
    });
};

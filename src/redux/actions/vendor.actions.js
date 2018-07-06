import Api from "../../Api";
import { dispatchErrorActionOfType } from ".";
import loading_types from "../types/loading.types";
import error_types from "../types/error.types";

export const fetchVendorDetailsAction = vendor_uuid => dispatch => {
  dispatch({ type: loading_types.FETCHING_VENDOR_DETAILS, loading: true });
  return Api.getVendor(vendor_uuid)
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

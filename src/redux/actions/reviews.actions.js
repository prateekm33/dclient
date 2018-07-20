import Api from "../../Api";
import { dispatchErrorActionOfType } from ".";
import error_types from "../types/error.types";
import review_types from "../types/review.types";
import loading_types from "../types/loading.types";

export const getVendorReviewsAction = ({
  vendor_uuid,
  limit,
  offset
}) => dispatch => {
  dispatch({ type: loading_types.FETCHING_VENDOR_REVIEWS, loading: true });
  return Api.getVendorReviews({ vendor_uuid, limit, offset })
    .then(res => {
      dispatch({ type: loading_types.FETCHING_VENDOR_REVIEWS, loading: false });
      return res;
    })
    .catch(error => {
      dispatch({ type: loading_types.FETCHING_VENDOR_REVIEWS, loading: false });
      dispatchErrorActionOfType(error_types.FETCHING_VENDOR_REVIEWS_ERROR)(
        error
      );
      return false;
    });
};

export const fetchVendorReviewMetricsAction = vendor_uuid => dispatch => {
  dispatch({
    type: loading_types.FETCHING_VENDOR_REVIEW_METRICS,
    loading: true
  });
  return Api.getVendorReviewMetrics({ vendor_uuid })
    .then(res => {
      dispatch({
        type: loading_types.FETCHING_VENDOR_REVIEW_METRICS,
        loading: false
      });
      return res;
    })
    .catch(error => {
      dispatch({
        type: loading_types.FETCHING_VENDOR_REVIEW_METRICS,
        loading: false
      });
      dispatchErrorActionOfType(
        error_types.FETCHING_VENDOR_REVIEW_METRICS_ERROR
      )(error);
      return false;
    });
};

export const fetchCustomerVendorReviewMetricsAction = vendor_uuid => dispatch => {
  dispatch({
    type: loading_types.FETCHING_CUSTOMER_VENDOR_REVIEW_METRICS,
    loading: true
  });
  return Api.getCustomerVendorReviewMetrics({ vendor_uuid })
    .then(res => {
      dispatch({
        type: loading_types.FETCHING_CUSTOMER_VENDOR_REVIEW_METRICS,
        loading: false
      });
      return res;
    })
    .catch(error => {
      dispatch({
        type: loading_types.FETCHING_CUSTOMER_VENDOR_REVIEW_METRICS,
        loading: false
      });
      dispatchErrorActionOfType(
        error_types.FETCHING_CUSTOMER_VENDOR_REVIEW_METRICS_ERROR
      )(error);
      return false;
    });
};

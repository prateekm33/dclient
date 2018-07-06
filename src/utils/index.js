import { Dimensions } from "react-native";
import logger from "./logger";
export { logger };

export const valExists = (...val) => {
  const arr = [].concat(val);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== undefined && arr[i] !== null) return true;
  }
  return false;
};

export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const isEmail = val => val.match(emailRegex);

const dims = Dimensions.get("window");
const { height, width } = dims;
/**
 *
 * @param {int} pixel : defines the pixel size formatted for iPhone 8s
 *
 * @returns {object} : returns a new pixel size object processed for
 *                     responsiveness on active device
 */
export const getResponsiveCSSFrom8 = pixel => {
  if (pixel === undefined || pixel === null) return null;
  pixel = +pixel;
  return {
    height: (pixel / 667) * height,
    width: (pixel / 375) * width
  };
};

export const generateQRCode = data => {};

export const customerIsAuthenticated = customer =>
  !!customer && customer.is_authenticated && !!customer.uuid;

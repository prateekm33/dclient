import DataModel from "./Data.model";
import { NOTIFICATION_TYPES } from "../utils/constants";

export class Notification extends DataModel {
  static validProperties = {
    body: { type: String, default: "" },
    category: { type: String, default: "" },
    identifier: { type: String, default: "" },
    data: { type: Object, default: null }
  };

  constructor(props) {
    if (props.userInfo) props.data = props.userInfo;
    super(props);
  }
}

export const createNotification = params => {
  return new Notification(params);
};

export class LocalNotification extends Notification {
  static validProperties = {
    ...Notification.validProperties,
    type: { type: String, default: NOTIFICATION_TYPES.BASIC }
  };
}

export const createLocalNotification = params => new LocalNotification(params);

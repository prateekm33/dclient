import logger from "../utils/logger";
import uuid from "uuid/v1";

export default class DataModel {
  static validProperties = {
    uuid: { type: String, default: () => uuid() }
  };
  constructor(props) {
    initClassValidProps.call(this, this.constructor, props);
    this._data_type = this.constructor.name.toLowerCase();
  }

  isValidProp = key => {
    return key in this.constructor.validProperties;
  };

  renew = (options, extraOptions) => {
    let newParams = {};
    const validProperties = {
      ...DataModel.validProperties,
      ...this.constructor.validProperties
    };
    for (let validProp in validProperties) {
      newParams[validProp] = this[validProp];
    }

    for (let key in options) {
      if (this.isValidProp(key)) {
        newParams[key] = options[key];
      }
    }
    return new this.constructor(newParams, extraOptions);
  };
}

function initClassValidProps(Class, props = {}) {
  const validProperties = {
    ...DataModel.validProperties,
    ...Class.validProperties
  };
  for (let validProp in validProperties) {
    let type = validProperties[validProp].type;
    let validators = validProperties[validProp].validate;
    try {
      if (props[validProp].constructor.prototype === type.prototype) {
        if (validators) {
          for (let i = 0; i < validators.length; i++) {
            if (!validators[i].fn(props[validProp]))
              throw new Error(validators[i].errorMessage);
          }
        }

        const verifyValue =
          validProperties[validProp].verifyValue || (value => value);
        const verifiedValue = verifyValue.call(this, props[validProp]);
        this[validProp] = verifiedValue;
      } else throw new Error("Incorrect type assignment");
    } catch (e) {
      const disable = false;
      logger.suppress(disable).warn(Class.name + " Model Init Errors");
      logger
        .suppress(disable)
        .warn("Incorrect type assignment for prop : ", validProp)
        .warn(
          "Got type : ",
          props[validProp] !== null && props[validProp] !== undefined
            ? props[validProp].constructor.prototype
            : props[validProp]
        );
      logger
        .suppress(disable)
        .warn(
          "Setting to default value : ",
          validProperties[validProp].default,
          { suppress: true }
        );
      logger.suppress(disable).warn(e);
      const defaultVal = validProperties[validProp].default;
      if (
        defaultVal &&
        defaultVal.constructor.prototype === Function.prototype
      ) {
        this[validProp] = defaultVal(props[validProp]);
      } else this[validProp] = defaultVal;
    }
  }
}

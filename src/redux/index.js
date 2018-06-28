import { connect as reduxConnect } from "react-redux";

export const connect = (...args) => {
  return Component => {
    const connectedComponent = reduxConnect(...args)(Component);
    connectedComponent.displayName =
      Component.originalName || Component.displayName;
    return connectedComponent;
  };
};

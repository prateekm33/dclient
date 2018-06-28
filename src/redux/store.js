import DebugConfig from "../../config/DebugConfig";
import { compose, applyMiddleware, createStore } from "redux";
import reducer from "./reducers";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

const logger = createLogger({
  level: {
    prevState: false,
    nextState: false,
    error: false
  }
});
const middlewares = [thunk];
if (!DebugConfig.production) middlewares.push(logger);
const finalCreateStore = compose(applyMiddleware(...middlewares))(createStore);

export default finalCreateStore(reducer);

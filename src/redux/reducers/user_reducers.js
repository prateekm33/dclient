import { createUser } from "../../Models";

export default {
  user(state, action) {
    switch (action.type) {
      default:
        return state || createUser();
    }
  }
};

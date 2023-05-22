import {
  SET_AUTHENTICATION,
  SET_USERNAME
} from "../constants";

export default {
  [SET_AUTHENTICATION](state: any, authenticated: any) {
      state.authenticated = authenticated
  },
  [SET_USERNAME](state: any, username: any) {
      state.username = username
  },
}

import {IS_USER_AUTHENTICATED, GET_USERNAME } from "../constants";

export default {
    [IS_USER_AUTHENTICATED](state: any) {
        return state.authenticated;
    },

    [GET_USERNAME](state: any) {
        return state.username;
    }
}
import { GET_USER } from "../actions/types";

/**
 * Reducer to handle authentication
 */
export default (state = null, action) => {
    switch (action.type) {
        case GET_USER: // Returns user object.
            return action.payload || false;
        default:
            return state;
    }
};

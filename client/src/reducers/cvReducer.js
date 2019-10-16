import { FETCH_CV, CLEAR_CV } from "../actions/types";

/**
 * Reducer to handle CV obtained from the server
 */
export default (state = null, action) => {
    switch (action.type) {
        case FETCH_CV:
            /**
             * Return cv fetched from the server.
             */
            return action.payload;
        case CLEAR_CV:
            return null;
        default:
            return state;
    }
};

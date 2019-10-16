import { MY_CVS, DELETE_CV } from "../actions/types";

/**
 * Reducer to handle CVs for that user, and deletion of CV
 */
export default (state = null, action) => {
    switch (action.type) {
        case MY_CVS:
            /**
             * Return all CVs associated with the user.
             */
            return action.payload;
        case DELETE_CV:
            /**
             * Remove the cv with id.
             */
            const newState = state.filter(cv => cv._id !== action.payload._id);
            return newState;
        default:
            return state;
    }
};

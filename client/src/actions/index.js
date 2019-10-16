import _ from "lodash";
import axios from "axios";
import {
    GET_USER,
    CHANGE_CATEGORY,
    SET_CV,
    UPDATE_SUBCATEGORY,
    CLEAR_CV,
    FETCH_CV,
    CLEAR_CV_FORM,
    MY_CVS,
    DELETE_CV
} from "../actions/types";

/**
 * Get current user profile.
 */
export const getUser = () => async dispatch => {
    const res = await axios.get("/auth/current_user");
    dispatch({ type: GET_USER, payload: res.data });
};

/**
 * Logout from the current user.
 */
export const logout = () => dispatch => {
    axios
        .get("/auth/logout")
        .then(() => dispatch({ type: GET_USER, payload: null }));
};

/**
 * Change the current category in CreateCV.
 * @param {Int} index
 */
export const changeCategory = index => {
    return { type: CHANGE_CATEGORY, payload: index };
};

/**
 * Display all categories in CreateCV
 * @param {*} formValues
 */
export const setFormValues = formValues => {
    return { type: SET_CV, payload: formValues };
};

/**
 * Show or hide subcategories in CreateCV
 * @param {Int} subCategoryKey
 * @param {Boolean} showSubCategory
 */
export const toggleSubCategory = (subCategoryKey, showSubCategory) => {
    return {
        type: UPDATE_SUBCATEGORY,
        payload: { subCategoryKey, showSubCategory }
    };
};

/**
 * Clear CVForm in CreateCV.
 */
export const clearCVForm = () => {
    return { type: CLEAR_CV_FORM, payload: null };
};

/**
 * Get CV with id from the server.
 * @param {Int} id of CV
 */
export const getCV = id => async dispatch => {
    try {
        const res = await axios.get(`/api/cv/${id}`);
        dispatch({ type: FETCH_CV, payload: res.data });
    } catch (e) {
        dispatch({ type: FETCH_CV, payload: false });
    }
};

/**
 * Get all of CVs associated with the user.
 */
export const getMyCVs = () => async dispatch => {
    const res = await axios.get("/api/cv");
    dispatch({ type: MY_CVS, payload: res.data });
};

/**
 * Delete CV with id from the server.
 * @param {Int} id of CV
 */
export const deleteCV = id => async dispatch => {
    const res = await axios.delete(`/api/cv/${id}`);
    dispatch({ type: DELETE_CV, payload: res.data });
};

/**
 * Create a new CV with the following values.
 * @param {*} formValues of createCV
 */
export const postCV = (formValues, his) => async dispatch => {
    const cv = {
        personal: {},
        contact: {},
        history: {},
        skill: {},
        extra: {}
    };

    _.forEach(formValues, (value, key) => {
        const keys = key.split("_");
        const category = keys[0];
        const subCategory = keys[1];

        cv[category][subCategory] = value;
    });

    const res = await axios.post("/api/cv", cv);
    dispatch({ type: FETCH_CV, payload: res.data });
    his.push("/cv/template");
};

/**
 * Update a current CV with id with the following values.
 * @param {Int} id of CV
 * @param {*} formValues of editCV
 * @param {*} his the history object for react-router-dom
 */
export const putCV = (id, formValues, his) => async dispatch => {
    const cv = {
        personal: {},
        contact: {},
        history: {},
        skill: {},
        extra: {}
    };

    _.forEach(formValues, (value, key) => {
        const keys = key.split("_");
        const category = keys[0];
        const subCategory = keys[1];

        cv[category][subCategory] = value;
    });

    const res = await axios.put("/api/cv", { id, cv });
    dispatch({ type: FETCH_CV, payload: res.data });
    his.push("/cv/template");
};

/**
 * Set to template with templateId to a CV with id.
 * @param {Int} id of CV
 * @param {Int} templateId of chosen template
 * @param {*} history for router-dom
 */
export const selectTemplate = (id, templateId, history) => async dispatch => {
    const res = await axios.patch("/api/cv/template", { id, templateId });
    history.push("/cv/list");
    history.push(`/cv/preview/${id}`);
    dispatch({ type: CLEAR_CV, payload: res.data });
};

/**
 * Clear currently saved CV from the redux state.
 */
export const clearCV = () => {
    return { type: CLEAR_CV, payload: null };
};

import _ from "lodash";
import {
    CLEAR_CV_FORM,
    CHANGE_CATEGORY,
    UPDATE_SUBCATEGORY,
    SET_CV
} from "../actions/types";
import categories from "../components/cvs/create/categories";

/**
 * Reducer to handle createCV
 */
export default (state = { categories, chosenCategory: 0 }, action) => {
    var newCategories = {};

    switch (action.type) {
        case CLEAR_CV_FORM:
            /**
             * Clears all form values.
             */
            return { categories, chosenCategory: 0 };
        case CHANGE_CATEGORY:
            /**
             * Change to a new category.
             */
            newCategories = _.cloneDeep(state.categories);
            newCategories[action.payload].isEnabled = true;

            return {
                ...state,
                chosenCategory: action.payload,
                categories: newCategories
            };
        case UPDATE_SUBCATEGORY:
            /**
             * Show or Hide subcategories.
             */
            const { subCategoryKey, showSubCategory } = action.payload;

            newCategories = _.cloneDeep(state.categories);
            newCategories[state.chosenCategory].subCategories.find(
                subCategory => {
                    return subCategory.key === subCategoryKey;
                }
            ).isVisible = showSubCategory;

            return { ...state, categories: newCategories };
        case SET_CV:
            /**
             * Show all categories and set all form values to the CV.
             */
            const { values } = action.payload;
            newCategories = _.cloneDeep(state.categories);
            _.forEach(newCategories, category => {
                category.isEnabled = true;
                _.forEach(category.subCategories, subCategory => {
                    if (
                        values[subCategory.key] &&
                        values[subCategory.key].length > 0
                    ) {
                        subCategory.isVisible = true;
                    }
                });
            });

            return {
                ...state,
                categories: newCategories
            };
        default:
            return state;
    }
};

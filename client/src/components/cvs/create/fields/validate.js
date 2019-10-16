import _ from "lodash";

/**
 * Validate formValues
 */
export default values => {
    const errors = {};
    // Personal name can't be empty
    if (!values["personal_name"]) {
        errors["personal_name"] = "Name is required";
    }
    // Check email format
    const emailErrors = []
    _.forEach(values["contact_email"], ({value}, index) => {
        if (!value || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            emailErrors[index] = "Email Format is incorrect"
        }
    })

    if (emailErrors.length) {
        errors["contact_email"] = emailErrors
    }

    return errors;
};
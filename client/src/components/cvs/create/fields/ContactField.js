import React from "react";
import { reduxForm, Field, FieldArray } from "redux-form";
import { isMobile } from "react-device-detect";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";

import SingleField from "./SingleField";
import DeleteButton from "./DeleteButton";

import validate from "./validate";

/**
 * Component to render a single contact field.
 */
const ContactField = ({ fields, type, input, label, errors }) => {
    if (fields.length === 0) {
        fields.push({});
    }

    var typeLabel = `${label} Type`;
    var buttonText = `Add Another ${label}`;

    if (type === "reference") {
        typeLabel = `Reference Name`;
        label = "Contact";
        buttonText = "Add Another Reference";
    } else if (type === "extra") {
        typeLabel = "Extra Title";
        label = "Description";
    }

    return (
        <div>
            {fields.map((contact, index) => {
                var emailError = "";
                if (errors !== undefined && errors[index] !== undefined) {
                    emailError = errors[index];
                }
                return (
                    <div
                        key={`contact_container_${index}`}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexWrap: isMobile ? "wrap" : "nowrap"
                        }}
                    >
                        <Field
                            component={SingleField}
                            type={type}
                            key={`contact_type_${index}`}
                            name={`${contact}.type`}
                            label={typeLabel}
                            {...input}
                        />
                        <Field
                            component={SingleField}
                            type={type}
                            key={`contact_value_${index}`}
                            name={`${contact}.value`}
                            label={label}
                            emailError={emailError}
                            {...input}
                        />
                        <DeleteButton
                            fields={fields}
                            index={index}
                            key={`contact_delete_${index}`}
                        />
                    </div>
                );
            })}
            <Slide in={true} direction="right" mountOnEnter>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        fields.push({});
                    }}
                >
                    {buttonText}
                </Button>
            </Slide>
        </div>
    );
};

/**
 * Component to render container for contact field.
 */
const ContactFieldArray = props => {
    const { type, input, label, meta } = props;

    return (
        <FieldArray
            component={ContactField}
            type={type}
            key={input.name}
            name={input.name}
            label={label}
            errors={meta.error}
        />
    );
};

export default reduxForm({
    form: "cvForm",
    destroyOnUnmount: false,
    validate
})(ContactFieldArray);

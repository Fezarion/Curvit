import React from "react";
import { reduxForm, Field, FieldArray } from "redux-form";
import { isMobile } from "react-device-detect";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";

import SingleField from "./SingleField";
import DeleteButton from "./DeleteButton";

/**
 * Component to add a title form.
 */
const renderHistoryTitle = (history, index, input, type) => {
    if (type === "history_with_title") {
        return (
            <div style={{ width: "50%" }}>
                <Field
                    component={SingleField}
                    type="text"
                    key={`history_title_${index}`}
                    name={`${history}.position`}
                    label="Position"
                    {...input}
                />
            </div>
        );
    }
};

/**
 * Component to render a single history field.
 */
const HistoryField = ({ fields, type, input, label }) => {
    if (fields.length === 0) {
        fields.push({});
    }
    return (
        <div>
            {fields.map((history, index) => {
                return (
                    <div key={`history_container_${index}`}>
                        <div
                            style={{
                                display: "flex",
                                flexWrap: isMobile ? "wrap" : "nowrap"
                            }}
                        >
                            <Field
                                component={SingleField}
                                type="text"
                                key={`history_type_${index}`}
                                name={`${history}.title`}
                                label={`${label}`}
                                {...input}
                            />
                            <Field
                                component={SingleField}
                                type="date"
                                key={`history_start_${index}`}
                                name={`${history}.startDate`}
                                label="Start Date"
                                {...input}
                            />
                            <Field
                                component={SingleField}
                                type="date"
                                key={`history_end_${index}`}
                                name={`${history}.endDate`}
                                label="End Date (optional)"
                                {...input}
                            />
                            {isMobile ? (
                                ""
                            ) : (
                                <DeleteButton
                                    fields={fields}
                                    index={index}
                                    key={`history_delete_${index}`}
                                />
                            )}
                        </div>

                        {renderHistoryTitle(history, index, input, type)}

                        <Field
                            component={SingleField}
                            type="multi"
                            key={`history_description_${index}`}
                            name={`${history}.description`}
                            label="Description"
                            {...input}
                        />
                        {isMobile ? (
                            <DeleteButton
                                fields={fields}
                                index={index}
                                key={`history_delete_${index}`}
                            />
                        ) : (
                            ""
                        )}
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
                    Add Another {label}
                </Button>
            </Slide>
        </div>
    );
};

/**
 * Component to render container for history field.
 */
const HistoryFieldArray = ({ type, input, label }) => {
    return (
        <FieldArray
            component={HistoryField}
            type={type}
            key={input.name}
            name={input.name}
            label={label}
        />
    );
};

export default reduxForm({
    form: "cvForm",
    destroyOnUnmount: false
})(HistoryFieldArray);

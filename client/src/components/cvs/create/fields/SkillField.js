import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field, FieldArray } from "redux-form";
import { isMobile } from "react-device-detect";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";

import SingleField from "./SingleField";
import DeleteButton from "./DeleteButton";
import SkillSlider from "./SkillSlider";

const mapStateToProps = ({ form }) => {
    return { form };
};

/**
 * Component to render a single skill field.
 */
const SkillField = connect(mapStateToProps)(
    ({ fields, type, input, label, form }) => {
        if (fields.length === 0) {
            fields.push({});
        }
        return (
            <div>
                {fields.map((skill, index) => {
                    const skillLevel =
                        form.cvForm.values[fields.name][index].level;
                    return (
                        <div key={`skill_container_${index}`}>
                            <div
                                style={{
                                    display: "flex",
                                    width: isMobile ? "100%" : "50%"
                                }}
                            >
                                <Field
                                    component={SingleField}
                                    type="text"
                                    key={`skill_title_${index}`}
                                    name={`${skill}.title`}
                                    label={`${label}`}
                                    {...input}
                                />
                                <DeleteButton
                                    fields={fields}
                                    index={index}
                                    key={`skill_delete_${index}`}
                                />
                            </div>

                            <Field
                                component={SkillSlider}
                                type="text"
                                key={`skill_level_${index}`}
                                name={`${skill}.level`}
                                label={`${label}`}
                                level={skillLevel}
                                fieldsName={fields.name}
                            />

                            <Field
                                component={SingleField}
                                type="multi"
                                key={`skill_description_${index}`}
                                name={`${skill}.description`}
                                label="Description"
                                {...input}
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
                        Add Another {label}
                    </Button>
                </Slide>
            </div>
        );
    }
);

/**
 * Component to render container for skill field.
 */
const SkillFieldArray = ({ type, input, label }) => {
    return (
        <FieldArray
            component={SkillField}
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
})(SkillFieldArray);

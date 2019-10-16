import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { withRouter, Prompt } from "react-router-dom";
import { isMobile } from "react-device-detect";

import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
import ErrorIcon from "@material-ui/icons/Error";

import CreateCVForm from "./CreateCVForm";
import * as actions from "../../../actions";

import baseUrl from "../../../baseUrl";

/**
 * CreateCV container component.
 */
class CreateCV extends Component {
    state = {
        showAllCategory: false,
        showLoading: false,
        snackbarOpen: false
    };

    componentWillUnmount() {
        // Clears form when component is unmounting.
        this.props.clearCVForm();
    }

    componentDidMount() {
        // If the user has not logged in, redirect them to login through google.
        if (this.props.auth === false) {
            window.location.replace(`${baseUrl}/auth/google`);
            window.localStorage.setItem("redirectUrl", "/cv/create");
        }

        // If createCV is in edit mode, then show all categories.
        if (this.props.isEdit) {
            this.setState({ showAllCategory: true });
        }
    }

    componentDidUpdate() {
        // If the user logged out while CreateCV is open, redirect them to the landing page.
        if (this.props.auth === false) {
            this.props.history.push("/");
        }

        // Set form values
        if (this.state.showAllCategory) {
            this.props.setFormValues(this.props.formValues);
            this.setState({ showAllCategory: false });
        }

        // Set prompt to activate
        if (this.shouldPromptBeforeNavigate()) {
            window.onbeforeunload = () => true;
        } else {
            window.onbeforeunload = undefined;
        }
    }

    /**
     * Determines when to prompt user there are unsaved data.
     */
    shouldPromptBeforeNavigate() {
        if (this.props.cv) {
            return false;
        }

        if (this.props.formValues === undefined) {
            return false;
        } else {
            if (this.props.formValues.values) {
                return true;
            } else {
                return false;
            }
        }
    }

    /**
     * Renders the categories.
     */
    renderBreadcrumbs() {
        return this.props.categories.map(({ key, value, isEnabled }, index) => {
            return (
                <div key={key}>
                    <Button
                        onClick={() => this.props.changeCategory(index)}
                        disabled={!isEnabled}
                        style={{ color: isEnabled ? "white" : "gray" }}
                    >
                        {isMobile
                            ? this.props.chosenCategory === index
                                ? key
                                : key[0]
                            : key}
                    </Button>
                </div>
            );
        });
    }

    /**
     * Renders the Navigation button Next
     */
    renderNavigationButtons() {
        const isLast = this.props.chosenCategory > 3;

        return (
            <div
                style={{
                    width: "90%",
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: 20
                }}
            >
                {this.state.showLoading ? (
                    // Display progress when a post is called
                    <CircularProgress color="secondary" />
                ) : (
                    <Button
                        variant="outlined"
                        style={{ color: "white", backgroundColor: "gray" }}
                        onClick={() => {
                            // Check if name is not empty
                            try {
                                const name = this.props.formValues.values.personal_name.trim();
                                if (!name) {
                                    throw Object.assign(
                                        new Error("Name is empty")
                                    );
                                }
                            } catch (error) {
                                this.setState({ snackbarOpen: true });
                                return;
                            }

                            if (isLast) {
                                if (this.props.isEdit) {
                                    // Change CV if it's edit
                                    this.props.putCV(
                                        this.props.cv._id,
                                        this.props.formValues.values,
                                        this.props.history
                                    );
                                } else {
                                    // Post CV if it's new
                                    this.props.postCV(
                                        this.props.formValues.values,
                                        this.props.history
                                    );
                                }
                                this.setState({ showLoading: true });
                            } else {
                                // Change categories if button is next
                                this.props.changeCategory(
                                    this.props.chosenCategory + 1
                                );
                            }
                        }}
                    >
                        {isLast
                            ? this.props.isEdit
                                ? "Save"
                                : "Submit"
                            : "Next"}
                    </Button>
                )}
            </div>
        );
    }

    render() {
        return (
            <div>
                <Prompt
                    when={this.shouldPromptBeforeNavigate()}
                    message="You have unsaved changes, are you sure you want to leave?"
                />
                <div
                    style={{
                        width: "80%",
                        margin: "0 auto",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly"
                    }}
                >
                    {this.renderBreadcrumbs()}
                </div>
                <CreateCVForm category={this.props.chosenCategory} />
                {this.renderNavigationButtons()}

                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                    }}
                    open={this.state.snackbarOpen}
                    autoHideDuration={4000}
                    onClose={() => this.setState({ snackbarOpen: false })}
                    message={
                        <div style={{ display: "flex" }}>
                            <ErrorIcon />
                            <Typography
                                variant="body1"
                                style={{ color: "white", marginLeft: 10 }}
                            >
                                Personal Name is required!
                            </Typography>
                        </div>
                    }
                />
            </div>
        );
    }
}

const mapStateToProps = ({ form, create, auth, cv }, { initialValues }) => {
    const { categories, chosenCategory } = create;

    return {
        auth,
        formValues: form.cvForm,
        categories,
        chosenCategory,
        cv,
        initialValues
    };
};

export default connect(
    mapStateToProps,
    actions
)(
    withRouter(
        reduxForm({
            form: "cvForm",
            destroyOnUnmount: true
        })(CreateCV)
    )
);

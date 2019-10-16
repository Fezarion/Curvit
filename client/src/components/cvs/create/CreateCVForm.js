import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Slide from "@material-ui/core/Slide";

import * as actions from "../../../actions";
import validate from "./fields/validate";

/**
 * Component to render form fields.
 */
class CreateCVForm extends Component {
    state = {
        anchorE1: null
    };

    openSubCategoryMenu(event) {
        this.setState({ anchorE1: event.currentTarget });
    }

    closeSubCategoryMenu() {
        this.setState({ anchorE1: null });
    }

    /**
     * Render fields according to the type provided from the file categories.js
     */
    renderFields() {
        return _.map(
            this.props.category.subCategories,
            ({ key, label, isVisible, value, component, type }) => {
                if (isVisible) {
                    return (
                        <Field
                            component={component}
                            type={type}
                            key={key}
                            name={key}
                            label={label}
                        />
                    );
                }
            }
        );
    }

    /**
     * Render button to show subcategories.
     */
    renderButton() {
        const menuItemCount = this.props.category.subCategories.filter(
            ({ isVisible }) => !isVisible
        ).length;

        if (menuItemCount !== 0) {
            const { key, label } = this.props.category;

            return (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        margin: "16px 0px"
                    }}
                >
                    <Slide in={true} direction="right" unmountOnExit>
                        <Button
                            aria-controls="sub-categories-menu"
                            aria-haspopup="true"
                            variant="outlined"
                            color="secondary"
                            onClick={this.openSubCategoryMenu.bind(this)}
                        >
                            Add {label}
                            {key === "personal" ||
                            key === "contact" ||
                            key === "extra"
                                ? " information"
                                : ""}
                        </Button>
                    </Slide>
                    <Menu
                        id="sub-categories-menu"
                        anchorEl={this.state.anchorE1}
                        keepMounted
                        open={Boolean(this.state.anchorE1)}
                        onClose={this.closeSubCategoryMenu.bind(this)}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center"
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "center"
                        }}
                    >
                        {this.renderMenuItems()}
                    </Menu>
                </div>
            );
        }
    }

    /**
     * Render subcategory drop down list.
     */
    renderMenuItems() {
        return _.map(
            this.props.category.subCategories,
            ({ key, label, isVisible }, index) => {
                if (!isVisible) {
                    return (
                        <MenuItem
                            key={key}
                            onClick={() => {
                                this.props.toggleSubCategory(key, true);
                                this.closeSubCategoryMenu();
                            }}
                        >
                            {label}
                        </MenuItem>
                    );
                }
            }
        );
    }

    render() {
        return (
            <div
                style={{
                    width: "80%",
                    margin: "16px auto",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                {this.renderFields()}
                {this.renderButton()}
            </div>
        );
    }
}

const mapStateToProps = ({ create: { categories, chosenCategory } }) => {
    return { category: categories[chosenCategory] };
};

export default connect(
    mapStateToProps,
    actions
)(
    reduxForm({
        form: "cvForm",
        destroyOnUnmount: false,
        validate
    })(CreateCVForm)
);

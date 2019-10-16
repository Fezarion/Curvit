import _ from "lodash";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

import CreateCV from "./CreateCV";

import * as actions from "../../../actions";

/**
 * Container for editting CV.
 */
class EditCV extends Component {
    componentDidMount() {
        this.props.getCV(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.clearCV()
    }

    renderLoading() {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%"
                }}
            >
                <CircularProgress color="secondary" />
            </div>
        );
    }

    render() {
        if (this.props.match.params.id) {
            if (this.props.initialValues) {
                if (this.props.auth && this.props.auth._id === this.props.cv._user) {
                    return (
                        <CreateCV
                            initialValues={this.props.initialValues}
                            isEdit={true}
                        />
                    );
                }

                return <Redirect to="/" />;
            } else {
                return this.renderLoading();
            }
        } else {
            return <Redirect to="/" />;
        }
    }
}

const mapStateToProps = ({ cv, auth }) => {
    if (!cv) {
        return {};
    }

    var initialValues = {};

    _.forEach(cv, (value, key) => {
        if (typeof value === "object") {
            _.forEach(value, (subValue, subKey) => {
                initialValues[`${key}_${subKey}`] = subValue;
            });
        }
    });

    return { initialValues, auth, cv };
};

export default connect(
    mapStateToProps,
    actions
)(EditCV);

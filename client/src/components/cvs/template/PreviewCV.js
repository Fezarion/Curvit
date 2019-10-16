import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import ParallaxTemplate from "./parallax/ParallaxContainer";

import * as actions from "../../../actions";

/**
 * Container for previewing CV.
 */
class PreviewCV extends Component {
    componentDidMount() {
        // If the path is /cv/steven then show my CV.
        if (this.props.match.path === "/cv/steven") {
            this.props.getCV("5d5af0b470617700164eb109");
        } else {
            this.props.getCV(this.props.match.params.id);
        }
    }

    componentWillUnmount() {
        this.props.clearCV();
    }

    renderLoading() {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    backgroundColor: "white"
                }}
            >
                <CircularProgress color="secondary" />
            </div>
        );
    }

    renderNotFound() {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    backgroundColor: "white",
                    flexDirection: "column"
                }}
            >
                <Typography variant="h4" color="primary" style={{ margin: "0px 0px 20px 0px" }}>
                    Oops, the requested CV was not found in the server.
                </Typography>
                <Typography
                    variant="h6"
                    color="secondary"
                    style={{ margin: "0px 0px 40px 0px" }}
                >
                    It may be that the owner has deleted it.
                </Typography>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => this.props.history.goBack()}
                >
                    Go back
                </Button>
            </div>
        );
    }

    render() {
        if (this.props.cv === null) {
            return this.renderLoading();
        } else if (this.props.cv === false) {
            console.log("error");
            return this.renderNotFound();
        }

        return <ParallaxTemplate cv={this.props.cv} />;
    }
}

const mapStateToProps = ({ cv }) => {
    return { cv };
};

export default connect(
    mapStateToProps,
    actions
)(withRouter(PreviewCV));

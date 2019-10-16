import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { isMobile } from "react-device-detect";

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import LoginDialog from "./LoginDialog";

/**
 * Component to display Landing page.
 */
class Landing extends Component {
    state = { showDialog: false };

    componentDidUpdate() {
        // If there is a redirectUrl in localstorage, then  redirect user to it.
        const redirectUrl = window.localStorage.getItem("redirectUrl");
        if (this.props.auth && redirectUrl) {
            this.props.history.push(redirectUrl);
            window.localStorage.removeItem("redirectUrl");
        }
    }

    renderButtons() {
        if (this.props.auth === null) {
            return (
                <div
                    style={{
                        width: "70%",
                        margin: "0px auto",
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <CircularProgress color="secondary" />
                </div>
            );
        } else {
            return (
                <div
                    style={{
                        width: "70%",
                        margin: "20px auto",
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: isMobile ? "column" : "flex"
                    }}
                >
                    <Button
                        onClick={() => {
                            if (this.props.auth) {
                                this.props.history.push("/cv/list");
                            } else {
                                // TODO display dialog
                                this.setState({ showDialog: true });
                            }
                        }}
                        variant="outlined"
                        color="secondary"
                        style={{
                            width: 200,
                            borderRadius: 25,
                            margin: "0px 10px 10px 10px"
                        }}
                    >
                        My CVs
                    </Button>
                    <Button
                        onClick={() => {
                            if (this.props.auth) {
                                this.props.history.push("/cv/create");
                            } else {
                                this.setState({ showDialog: true });
                            }
                        }}
                        variant="contained"
                        color="secondary"
                        style={{
                            width: 200,
                            borderRadius: 25,
                            margin: "0px 10px 10px 10px"
                        }}
                    >
                        Create New CV
                    </Button>
                </div>
            );
        }
    }

    render() {
        return (
            <div style={{ width: "80%", margin: "0px auto", padding: 20 }}>
                <img
                    src={require("../assets/images/main_logo.png")}
                    alt="Curvit Logo"
                    style={{
                        width: "50%",
                        maxWidth: isMobile ? 300 : 600,
                        minWidth: isMobile ? 200 : 400,
                        margin: "50px auto",
                        display: "block",
                        textAlign: "center"
                    }}
                />

                <Typography
                    variant="body1"
                    style={{ color: "white", textAlign: "center" }}
                >
                    Welcome to Curvit, you can create your own Digital CV.
                </Typography>

                {this.renderButtons()}
                <LoginDialog
                    open={this.state.showDialog}
                    onClose={() => this.setState({ showDialog: false })}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { auth: state.auth };
};

export default connect(mapStateToProps)(withRouter(Landing));

/* About Me button
<div className="button">
    <Button
        variant="outlined"
        color="secondary"
        onClick={() => {
            this.props.history.push(
                `cv/preview/${
                    !process.env.NODE_ENV ||
                    process.env.NODE_ENV === "development"
                        ? "5d5a76408fb3b510881ce6e1"
                        : "5d5af0b470617700164eb109"
                }`
            );
        }}
        style={{
            width: 200,
            borderRadius: 25
        }}
    >
        About Me
    </Button>
</div>
*/

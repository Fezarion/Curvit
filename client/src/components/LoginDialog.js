import React, { Component } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import baseUrl from "../baseUrl";

/**
 * Component to render Login and Logout dialogs
 */
export default class LoginDialog extends Component {
    render() {
        var isLogin = true;
        if (this.props.auth) {
            isLogin = false;
        }

        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.onClose}
                fullWidth={true}
            >
                <DialogTitle>{isLogin ? "Log In" : "Log Out"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {isLogin
                            ? "We'll first need to differentiate you from others."
                            : `You are currently logged in as ${this.props.auth.displayName}.`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={this.props.onClose}
                        style={{ color: "gray" }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            this.props.onClose();
                            if (isLogin) {
                                window.location.replace(
                                    `${baseUrl}/auth/google`
                                );
                                window.localStorage.setItem(
                                    "redirectUrl",
                                    "/cv/list"
                                );
                            } else {
                                this.props.onLogout();
                            }
                        }}
                        style={{ color: isLogin ? "green" : "red" }}
                    >
                        {isLogin ? "Login" : "Logout"}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

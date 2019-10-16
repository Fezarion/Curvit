import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { fade, withStyles } from "@material-ui/core/styles";
// import InputBase from "@material-ui/core/InputBase";
// import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";

import LoginDialog from "./LoginDialog";
import * as actions from "../actions";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    appBar: {
        background: "transparent",
        boxShadow: "none",
        margin: 0
    },
    button: {
        color: "white",
        backgroundColor: "transparent",
        "&:hover": {
            backgroundColor: "transparent"
        },
        fontSize: 20
    },
    title: {
        flexGrow: 0,
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block"
        }
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(1),
            width: "auto"
        }
    },
    searchIcon: {
        width: theme.spacing(7),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    inputRoot: {
        color: "inherit"
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 8),
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: 120,
            "&:focus": {
                width: 200
            }
        }
    }
});

/**
 * Component to render Header.
 */
class Header extends Component {
    state = {
        loginDialogIsVisible: false,
        logoutDialogIsVisible: false,
        snackbarOpen: false
    };

    renderSnackbar() {
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}
                open={this.state.snackbarOpen}
                autoHideDuration={4000}
                onClose={() => this.setState({ snackbarOpen: false })}
                message={
                    <Typography variant="body1">
                        Logged out successfully!
                    </Typography>
                }
            />
        );
    }

    render() {
        // Removes the header when in preview mode
        if (this.props.location.pathname.includes("/cv/preview") || this.props.location.pathname.includes("/cv/steven")) {
            return <div />;
        }

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <Button
                            onClick={() => this.props.history.push("/")}
                            className={classes.button}
                        >
                            CurVit
                        </Button>
                        <div className={classes.root} />
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                                onClick={() => {
                                    if (this.props.auth) {
                                        this.setState({
                                            logoutDialogIsVisible: true
                                        });
                                    } else {
                                        this.setState({
                                            loginDialogIsVisible: true
                                        });
                                    }
                                }}
                            >
                                <AccountCircle />
                                <Typography style={{ marginLeft: 10 }}>
                                    {this.props.auth === null
                                        ? ""
                                        : this.props.auth
                                        ? "Logout"
                                        : "Login"}
                                </Typography>
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>

                <LoginDialog
                    open={this.state.loginDialogIsVisible}
                    onClose={() =>
                        this.setState({ loginDialogIsVisible: false })
                    }
                />

                <LoginDialog
                    open={this.state.logoutDialogIsVisible}
                    onClose={() =>
                        this.setState({ logoutDialogIsVisible: false })
                    }
                    auth={this.props.auth}
                    onLogout={() => {
                        this.props.logout();
                        this.setState({ snackbarOpen: true });
                    }}
                />

                {this.renderSnackbar()}
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return { auth };
};

export default connect(
    mapStateToProps,
    actions
)(withRouter(withStyles(styles)(Header)));

/* Search bar
    <div className={classes.search}>
        <div className={classes.searchIcon}>
            <SearchIcon />
        </div>
        <InputBase
            placeholder="Search…"
            classes={{
                root: classes.inputRoot,
                input: classes.inputInput
            }}
            inputProps={{ "aria-label": "search" }}
        />
    </div>
*/

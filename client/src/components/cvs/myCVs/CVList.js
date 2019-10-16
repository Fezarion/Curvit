import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { isMobile, MobileView, BrowserView } from "react-device-detect";
import QRCode from "qrcode.react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import * as actions from "../../../actions";
import baseUrl from "../../../baseUrl";


/**
 * Component to render user's CVs.
 */
class CVList extends Component {
    constructor(props) {
        super(props);
        const page = parseInt(queryString.parse(props.location.search).page);

        this.state = {
            cvIndex: page ? page : 0,
            shareDialogOpen: false,
            deleteDialogOpen: false,
            snackbarOpen: false
        };
    }

    componentDidMount() {
        // If not authenticated, then redirect to log in.
        if (this.props.auth === false) {
            window.location.replace(`${baseUrl}/auth/google`);
            window.localStorage.setItem("redirectUrl", "/cv/list");
            return;
        }
        // Get user's CVs.
        this.props.getMyCVs();
    }

    componentDidUpdate() {
        // If user logged off, then redirect to the landing page.
        if (this.props.auth === false) {
            this.props.history.push("/");
        }
    }

    openShareDialog = () => {
        this.setState({ shareDialogOpen: true });
    };

    closeShareDialog = () => {
        this.setState({ shareDialogOpen: false });
    };

    openDeleteDialog = () => {
        this.setState({ deleteDialogOpen: true });
    };

    closeDeleteDialog = () => {
        this.setState({ deleteDialogOpen: false });
    };

    openSnackbar = () => {
        this.setState({ snackbarOpen: true });
    };

    closeSnackbar = () => {
        this.setState({ snackbarOpen: false });
    };

    renderLoading() {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "90vh"
                }}
            >
                <CircularProgress color="secondary" />
            </div>
        );
    }

    // Render navigation buttons to navigate between CVs
    renderNavigationButton(isNext) {
        // Hides previous button on the first and next button on the last.
        var hideButton =
            (this.state.cvIndex === 0 && !isNext) ||
            (this.state.cvIndex === this.props.myCVs.length - 1 && isNext);

        return (
            <img
                src={require(`../../../assets/icons/${
                    isNext ? "next" : "previous"
                }.png`)}
                alt="Previous"
                style={{
                    height: isMobile ? 37.5 : 50,
                    width: isMobile ? 150 : 200,
                    margin: isMobile ? 10 : "0px 50px",
                    cursor: "pointer",
                    visibility: hideButton ? "hidden" : "visible"
                }}
                onClick={() => {
                    const newPage = this.state.cvIndex + (isNext ? 1 : -1);
                    this.setState({ cvIndex: newPage });
                    this.props.history.push(`/cv/list?page=${newPage}`);
                }}
            />
        );
    }

    // Render Edit, Share and Delete buttons.
    renderCVButton(title, src, onClick) {
        return (
            <div
                onClick={() => onClick()}
                style={{
                    display: "flex",
                    alignItems: "center",
                    borderStyle: "solid",
                    borderWidth: 3,
                    borderColor: "white",
                    borderRadius: 30,
                    padding: 10,
                    cursor: "pointer",
                    width: 180,
                    margin: "10px 0px"
                }}
            >
                <img
                    src={src}
                    alt="edit"
                    style={{
                        height: 30,
                        width: 30,
                        marginLeft: 30
                    }}
                />
                <Typography
                    variant="button"
                    style={{
                        color: "white",
                        marginLeft: 20,
                        WebkitTouchCallout: "none",
                        WebkitUserSelect: "none",
                        KhtmlUserSelect: "none",
                        MozUserSelect: "none",
                        msUserSelect: "none",
                        userSelect: "none"
                    }}
                >
                    {title}
                </Typography>
            </div>
        );
    }

    renderCVMobileButton(title, src, onClick) {
        return (
            <div
                onClick={() => onClick()}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderStyle: "solid",
                    borderWidth: 3,
                    borderColor: "white",
                    borderRadius: 30,
                    cursor: "pointer",
                    width: 80,
                    height: 40,
                    margin: 10
                }}
            >
                <img
                    src={src}
                    alt="edit"
                    style={{
                        height: 30,
                        width: 30
                    }}
                />
            </div>
        );
    }

    // Render share dialog.
    renderShareDialog(currentId) {
        const link = `${baseUrl}/cv/preview/${currentId}`;
        return (
            <Dialog
                open={this.state.shareDialogOpen}
                onClose={this.closeShareDialog}
                fullWidth={true}
            >
                <DialogTitle>Share CV</DialogTitle>
                <CopyToClipboard
                    text={link}
                    onCopy={() => {
                        this.openSnackbar();
                    }}
                >
                    <DialogContent
                        style={{
                            display: "flex",
                            margin: "10px 10px 30px 10px",
                            flexDirection: isMobile ? "column" : "row",
                            alignItems: isMobile ? "center" : "unset",
                            cursor: "pointer"
                        }}
                    >
                        <QRCode value={link} />
                        <DialogContentText>
                            <div style={{ margin: "0px 20px" }}>
                                <Typography
                                    variant="body1"
                                    color="primary"
                                    style={{
                                        display: isMobile ? "none" : "block"
                                    }}
                                >
                                    {link}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    style={{ cursor: "pointer" }}
                                >
                                    Click to copy!
                                </Typography>
                            </div>
                        </DialogContentText>
                    </DialogContent>
                </CopyToClipboard>
            </Dialog>
        );
    }

    // Render warning dialog to delete CV.
    renderDeleteDialog(currentId) {
        return (
            <Dialog
                open={this.state.deleteDialogOpen}
                onClose={() => this.closeDeleteDialog()}
                fullWidth={true}
            >
                <DialogTitle>Delete CV</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Permanently delete this CV, this process is
                        irreversible.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            this.closeDeleteDialog();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            this.closeDeleteDialog();
                            this.props.deleteCV(currentId);
                        }}
                        style={{ color: "red" }}
                    >
                        {isMobile ? "Delete" : "Delete Permanently"}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    render() {
        if (!this.props.myCVs) {
            return this.renderLoading();
        }

        const cv = this.props.myCVs[this.state.cvIndex];

        if (!cv) {
            // If CVs is empty then display empty message.
            if (this.props.myCVs.length === 0) {
                return (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "50vh"
                        }}
                    >
                        <Typography
                            style={{
                                whiteSpace: "pre-line",
                                color: "white",
                                borderStyle: "solid",
                                borderWidth: 3,
                                borderColor: "#98B588",
                                borderRadius: 30,
                                padding: 50,
                                margin: 30,
                                textAlign: "center"
                            }}
                            variant="body1"
                        >
                            {"Can't seem to find any CVs.\nLet's make one!"}
                        </Typography>
                        <Button
                            onClick={() =>
                                this.props.history.push("/cv/create")
                            }
                            variant="outlined"
                            color="secondary"
                        >
                            Create CV
                        </Button>
                    </div>
                );
            } else {
                // If the last cv is deleted then goes back to the last cv - 1
                this.setState({ cvIndex: this.props.myCVs.length - 1 });
                return null;
            }
        }

        const currentId = cv._id;
        const templateId = cv.template;

        return (
            <>
                <BrowserView>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        {this.renderNavigationButton(false)}

                        <div style={{ margin: "50px 0px" }}>
                            <Typography
                                variant="h2"
                                color="secondary"
                                style={{ width: 300 }}
                            >
                                My CV List
                            </Typography>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    borderStyle: "solid",
                                    borderWidth: 3,
                                    borderColor: "white",
                                    borderRadius: 12,
                                    height: "50vh",
                                    marginTop: 40,
                                    padding: "50px 100px"
                                }}
                            >
                                <img
                                    src={require(`../../../assets/images/template_${templateId}.png`)}
                                    alt="Theme 1"
                                    style={{
                                        height: "100%",
                                        cursor: "pointer"
                                    }}
                                    onClick={() =>
                                        this.props.history.push(
                                            `/cv/preview/${currentId}`
                                        )
                                    }
                                />
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginLeft: 30
                                    }}
                                >
                                    <Typography
                                        variant="h5"
                                        style={{
                                            color: "white",
                                            padding: "10px 10px 30px 10px",
                                            marginBottom: 50,
                                            borderBottom: "2px solid white",
                                            cursor: "pointer",
                                            WebkitTouchCallout: "none",
                                            WebkitUserSelect: "none",
                                            KhtmlUserSelect: "none",
                                            MozUserSelect: "none",
                                            msUserSelect: "none",
                                            userSelect: "none",
                                            width: 200,
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            textAlign: "center"
                                        }}
                                        onClick={() =>
                                            this.props.history.push(
                                                `/cv/preview/${currentId}`
                                            )
                                        }
                                    >
                                        {cv.personal.cv
                                            ? cv.personal.cv
                                            : currentId}
                                    </Typography>
                                    {this.renderCVButton(
                                        "Edit",
                                        require("../../../assets/icons/pen_icon.png"),
                                        () => {
                                            this.props.history.push(
                                                `/cv/edit/${currentId}`
                                            );
                                        }
                                    )}
                                    {this.renderCVButton(
                                        "Share",
                                        require("../../../assets/icons/share_icon.png"),
                                        event => {
                                            this.openShareDialog(currentId);
                                        }
                                    )}

                                    {this.renderCVButton(
                                        "Delete",
                                        require("../../../assets/icons/trash_icon.png"),
                                        () => {
                                            this.openDeleteDialog(currentId);
                                        }
                                    )}
                                </div>
                            </div>
                        </div>

                        {this.renderNavigationButton(true)}
                    </div>
                </BrowserView>
                <MobileView>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column"
                        }}
                    >
                        <div></div>
                        <Typography
                            variant="h5"
                            style={{
                                color: "white",
                                padding: "5px 10px",
                                marginBottom: 10,
                                borderBottom: "2px solid white",
                                cursor: "pointer",
                                WebkitTouchCallout: "none",
                                WebkitUserSelect: "none",
                                KhtmlUserSelect: "none",
                                MozUserSelect: "none",
                                msUserSelect: "none",
                                userSelect: "none",
                                width: "70%",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                textAlign: "center"
                            }}
                            onClick={() =>
                                this.props.history.push(
                                    `/cv/preview/${currentId}`
                                )
                            }
                        >
                            {cv.personal.cv ? cv.personal.cv : currentId}
                        </Typography>

                        <img
                            src={require(`../../../assets/images/template_${templateId}.png`)}
                            alt="Theme 1"
                            style={{
                                width: "80%",
                                cursor: "pointer",
                                margin: "10px 0px"
                            }}
                            onClick={() =>
                                this.props.history.push(
                                    `/cv/preview/${currentId}`
                                )
                            }
                        />
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            {this.renderCVMobileButton(
                                "Edit",
                                require("../../../assets/icons/pen_icon.png"),
                                () => {
                                    this.props.history.push(
                                        `/cv/edit/${currentId}`
                                    );
                                }
                            )}
                            {this.renderCVMobileButton(
                                "Share",
                                require("../../../assets/icons/share_icon.png"),
                                event => {
                                    this.openShareDialog(currentId);
                                }
                            )}

                            {this.renderCVMobileButton(
                                "Delete",
                                require("../../../assets/icons/trash_icon.png"),
                                () => {
                                    this.openDeleteDialog(currentId);
                                }
                            )}
                        </div>

                        <div style={{ display: "flex", flexDirection: "row" }}>
                            {this.renderNavigationButton(false)}
                            {this.renderNavigationButton(true)}
                        </div>
                    </div>
                </MobileView>

                {this.renderShareDialog(currentId)}
                {this.renderDeleteDialog(currentId)}

                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right"
                    }}
                    open={this.state.snackbarOpen}
                    autoHideDuration={2000}
                    onClose={this.closeSnackbar}
                    message={
                        <Typography variant="body1">
                            Copied to clipboard!
                        </Typography>
                    }
                />
            </>
        );
    }
}

const mapStateToProps = ({ myCVs, auth }) => {
    return { myCVs, auth };
};

export default connect(
    mapStateToProps,
    actions
)(withRouter(CVList));

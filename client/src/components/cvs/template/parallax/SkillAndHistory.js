import React, { Component } from "react";
import { ParallaxLayer } from "react-spring/renderprops-addons";
import { isMobile } from "react-device-detect";
import Moment from "moment";
import Linkify from "react-linkify";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import SubTitle from "./SubTitle";

/**
 * Component to display Skill or History Information.
 */
export default class SkillAndHistory extends Component {
    state = { dialogOpen: false, index: 0 };

    constructor(props) {
        super(props);
        Moment.locale("en");
    }

    linkDecorator = (href, text, key) => (
        <a
            href={href}
            key={key}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: this.props.colors.background }}
        >
            {text}
        </a>
    );

    openDialog = (event, index) => {
        event.stopPropagation();
        this.setState({ dialogOpen: true, index });
    };

    closeDialog = event => {
        event.stopPropagation();
        this.setState({ dialogOpen: false });
    };

    renderDialog(item) {
        return (
            <Dialog
                open={this.state.dialogOpen}
                onClose={this.closeDialog}
                fullWidth={true}
                maxWidth="lg"
            >
                <DialogTitle id="alert-dialog-title">
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                    >
                        {item.title}
                        {item.position ? `, ${item.position}` : ""}
                        {this.renderSubItem(item, true)}
                    </div>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText
                        id="alert-dialog-description"
                        style={{ whiteSpace: "pre-line" }}
                    >
                        <Linkify componentDecorator={this.linkDecorator}>
                            {item.description}
                        </Linkify>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        );
    }

    renderSubItem(item, isDialog) {
        if (item.level) {
            return (
                <img
                    src={require(`../../../../assets/icons/${this.props.template}_${item.level}_star.png`)}
                    alt={`Level: ${item.level}`}
                    style={
                        isDialog
                            ? {
                                  height: 30,
                                  margin: "auto 0px"
                              }
                            : { marginTop: 10, width: "70%" }
                    }
                />
            );
        } else {
            var startDate = item.startDate
            var endDate = item.endDate

            if (startDate) {
                startDate = Moment(startDate).format("MM/YY")
            } else {
                startDate = ""
            }

            if (endDate) {
                endDate = Moment(endDate).format("MM/YY")
            } else {
                endDate = "Current";
            }

            return (
                <Typography
                    variant="body1"
                    style={
                        isDialog
                            ? {
                                  height: 30,
                                  width: 150,
                                  textAlign: "end",
                                  color: this.props.colors.primary
                              }
                            : {
                                  marginTop: 10,
                                  textAlign: "center",
                                  color: this.props.colors.primary
                              }
                    }
                >{`${startDate}-${endDate}`}</Typography>
            );
        }
    }

    render() {
        const {
            parentProps: { classes },
            scrollNext,
            offset,
            items,
            subTitle,
            colors,
            template
        } = this.props;

        return (
            <>
                <ParallaxLayer
                    offset={offset}
                    speed={0.5}
                    style={{
                        backgroundColor: colors.light,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    onClick={() => scrollNext()}
                />

                <ParallaxLayer
                    offset={offset + 0.1}
                    speed={1}
                    onClick={() => scrollNext()}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            marginLeft: "10%",
                            marginRight: "10%"
                        }}
                    >
                        <SubTitle template={template}>{subTitle}</SubTitle>
                        <Grid
                            container
                            spacing={isMobile ? 1 : 4}
                            style={{ flexGrow: 1 }}
                        >
                            {items.map((item, index) => {
                                if (isMobile) {
                                    return (
                                        <Grid
                                            item
                                            xs="auto"
                                            key={index}
                                            onClick={event =>
                                                this.openDialog(event, index)
                                            }
                                            style={{ width: "100%" }}
                                        >
                                            <Paper
                                                className={
                                                    classes.mobileSkillContainer
                                                }
                                            >
                                                <Typography variant="h6">
                                                    <Box
                                                        fontWeight="bold"
                                                        lineHeight="1em"
                                                        maxHeight="5em"
                                                    >
                                                        {item.title}
                                                    </Box>
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                    );
                                } else {
                                    return (
                                        <Grid
                                            item
                                            xs="auto"
                                            key={index}
                                            onClick={event =>
                                                this.openDialog(event, index)
                                            }
                                        >
                                            <Paper
                                                className={
                                                    classes.skillContainer
                                                }
                                            >
                                                <Typography variant="h6">
                                                    <Box fontWeight="bold">
                                                        {index < 9
                                                            ? `0${index + 1}`
                                                            : index + 1}
                                                        .
                                                    </Box>
                                                </Typography>
                                                <Typography
                                                    variant="h6"
                                                    style={{
                                                        marginTop: 10,
                                                        textAlign: "center",
                                                        display: "box",
                                                        height: 50
                                                    }}
                                                >
                                                    <Box
                                                        fontWeight="bold"
                                                        lineHeight="1em"
                                                        maxHeight="5em"
                                                    >
                                                        {item.title}
                                                    </Box>
                                                </Typography>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "center"
                                                    }}
                                                >
                                                    {this.renderSubItem(
                                                        item,
                                                        false
                                                    )}
                                                </div>
                                                <Typography
                                                    style={{
                                                        color: colors.primary,
                                                        margin:
                                                            "40px 0px 20px 50%",
                                                        textAlign: "center",
                                                        borderRadius: 26,
                                                        borderWidth: 2,
                                                        borderColor:
                                                            colors.primary,
                                                        borderStyle: "solid",
                                                        width: "40%",
                                                        padding: 5,
                                                        fontWeight: "bold"
                                                    }}
                                                >
                                                    DETAILS
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                    );
                                }
                            })}
                        </Grid>
                    </div>
                </ParallaxLayer>

                {this.renderDialog(items[this.state.index])}
            </>
        );
    }
}

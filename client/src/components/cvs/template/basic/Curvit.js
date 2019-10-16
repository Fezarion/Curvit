/**
 * Unfinished basic template
 */

import React, { Component } from "react";
import TrackVisibility from "react-on-screen";
import Moment from "moment";

import Linkify from "react-linkify";

import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grow from "@material-ui/core/Grow";
import Slide from "@material-ui/core/Slide";

import { withStyles } from "@material-ui/core";

const styles = theme => ({
    title: {
        color: "white",
        margin: "10px 0px"
    },
    titleCenter: {
        color: "white",
        textAlign: "center"
    },
    description: {
        whiteSpace: "pre-line"
    }
});

const linkDecorator = (href, text, key) => (
    <a
        href={href}
        key={key}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "white" }}
    >
        {text}
    </a>
);

function getSubCategories(category) {
    if (category) {
        return Object.keys(category)
            .map(key => {
                category[key].key = key;
                return category[key];
            })
            .filter(subCategory => {
                return subCategory.length > 0;
            });
    }
}

const baseTimeout = 500;

function getInnerTimeout(index) {
    return baseTimeout / 2 + baseTimeout * (index + 1);
}

const UserComponent = ({ isVisible, props }) => {
    const {
        classes,
        cv: { personal }
    } = props;

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center"
            }}
        >
            <div style={{ margin: 20 }}>
                <Grow in={isVisible}>
                    <Avatar
                        src={personal.photo}
                        alt={personal.name}
                        style={{
                            height: 150,
                            width: 150,
                            margin: "0px auto 20px auto"
                        }}
                    />
                </Grow>

                <Grow in={isVisible} timeout={isVisible ? baseTimeout : 0}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center"
                        }}
                    >
                        <Typography
                            variant="h4"
                            className={classes.titleCenter}
                        >
                            {personal.name}
                        </Typography>

                        <Typography
                            variant="h6"
                            className={classes.titleCenter}
                        >
                            {getCityCountry(personal)}
                        </Typography>

                        <Typography
                            variant="h4"
                            className={classes.titleCenter}
                        >
                            {personal.title}
                        </Typography>
                    </div>
                </Grow>
            </div>
            {personal.summary && (
                <Grow
                    in={isVisible}
                    timeout={isVisible ? baseTimeout * 2 : 0}
                    style={{
                        minWidth: "20%",
                        maxWidth: "40%",
                        padding: 20,
                        margin: "auto 20px"
                    }}
                >
                    <Paper>
                        <Typography
                            variant="body1"
                            className={classes.description}
                        >
                            {personal.summary}
                        </Typography>
                    </Paper>
                </Grow>
            )}
        </div>
    );
};

function getCityCountry({ city, country }) {
    var cityCountry = [];
    if (city) {
        cityCountry.push(city);
    }

    if (country) {
        cityCountry.push(country);
    }

    switch (cityCountry.length) {
        case 1:
            return `based in ${cityCountry[0]}`;
        case 2:
            return `based in ${cityCountry[0]}, ${cityCountry[1]}`;
        default:
            return "";
    }
}

const HistoryComponent = ({ isVisible, props }) => {
    const {
        classes,
        cv: { history }
    } = props;

    const histories = getSubCategories(history);

    return (
        <>
            <hr style={{ borderTop: "1px solid #ccc", width: "100%" }} />
            <Slide in={isVisible} timeout={baseTimeout} direction="right">
                <div style={{ margin: 25 }}>
                    <Typography variant="h2" className={classes.title}>
                        History
                    </Typography>
                    <hr
                        style={{ borderTop: "1px solid #ccc", width: "100%" }}
                    />
                </div>
            </Slide>

            <div style={{ margin: 25 }}>
                {histories.map((history, index) => {
                    const title =
                        history.key.charAt(0).toUpperCase() +
                        history.key.substring(1);
                    return (
                        <Slide
                            in={isVisible}
                            timeout={isVisible ? getInnerTimeout(index) : 0}
                            direction="right"
                            key={`${title}_${index}`}
                        >
                            <div style={{ margin: "20px 0px" }}>
                                <Typography
                                    variant="h3"
                                    className={classes.title}
                                >
                                    {title}
                                </Typography>
                                <div />
                                {history.map(subHistory => {
                                    return (
                                        <div
                                            key={subHistory._id}
                                            className={classes.title}
                                        >
                                            <Typography variant="h4">
                                                {subHistory.title}
                                            </Typography>
                                            <Typography variant="h6">
                                                {subHistory.position &&
                                                    `${subHistory.position}, `}
                                                {`${Moment(
                                                    subHistory.startDate
                                                ).format("MM/YYYY")} - ${Moment(
                                                    subHistory.endDate
                                                ).format("MM/YYYY")}`}
                                            </Typography>
                                            <Typography
                                                className={classes.description}
                                                variant="body1"
                                            >
                                                <Linkify
                                                    componentDecorator={
                                                        linkDecorator
                                                    }
                                                >
                                                    {subHistory.description}
                                                </Linkify>
                                            </Typography>
                                        </div>
                                    );
                                })}
                            </div>
                        </Slide>
                    );
                })}
            </div>
        </>
    );
};

const SkillComponent = ({ isVisible, props }) => {
    const {
        classes,
        cv: { skill }
    } = props;

    const skills = getSubCategories(skill);

    return (
        <>
            <hr style={{ borderTop: "1px solid #ccc", width: "100%" }} />
            <Slide in={isVisible} timeout={baseTimeout} direction="right">
                <div style={{ margin: 25 }}>
                    <Typography variant="h2" className={classes.title}>
                        Skills
                    </Typography>
                    <hr
                        style={{ borderTop: "1px solid #ccc", width: "100%" }}
                    />
                </div>
            </Slide>
            <div style={{ margin: 25 }}>
                {skills.map((skill, index) => {
                    const title =
                        skill.key.charAt(0).toUpperCase() +
                        skill.key.substring(1);

                    return (
                        <Slide
                            in={isVisible}
                            timeout={isVisible ? getInnerTimeout(index) : 0}
                            direction="right"
                            key={`${title}_${index}`}
                        >
                            <div style={{ margin: "20px 0px" }}>
                                <Typography
                                    variant="h3"
                                    className={classes.title}
                                >
                                    {title}
                                </Typography>
                                <div />
                                {skill.map(subSkill => {
                                    return (
                                        <div
                                            key={subSkill._id}
                                            className={classes.title}
                                        >
                                            <Typography variant="h4">
                                                {subSkill.title}
                                            </Typography>

                                            <Typography>
                                                {`Level ${subSkill.level}`}
                                            </Typography>

                                            <Typography
                                                variant="body1"
                                                className={classes.description}
                                            >
                                                <Linkify
                                                    componentDecorator={
                                                        linkDecorator
                                                    }
                                                >
                                                    {subSkill.description}
                                                </Linkify>
                                            </Typography>
                                        </div>
                                    );
                                })}
                            </div>
                        </Slide>
                    );
                })}
            </div>
        </>
    );
};

class Curvit extends Component {
    constructor(props) {
        super(props);

        Moment.locale("en");
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
        if (!this.props.cv) {
            return this.renderLoading();
        }

        return (
            <div
                style={{ display: "flex", flexDirection: "column", margin: 20 }}
            >
                <TrackVisibility partialVisibility>
                    <UserComponent props={this.props} />
                </TrackVisibility>

                <TrackVisibility partialVisibility>
                    <HistoryComponent props={this.props} />
                </TrackVisibility>

                <TrackVisibility partialVisibility>
                    <SkillComponent props={this.props} />
                </TrackVisibility>

                <hr style={{ borderTop: "1px solid #ccc", width: "100%" }} />

                <div />
            </div>
        );
    }
}

export default withStyles(styles)(Curvit);

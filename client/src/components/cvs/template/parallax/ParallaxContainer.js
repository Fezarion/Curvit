import React, { Component } from "react";

import Moment from "moment";

import { Parallax } from "react-spring/renderprops-addons";

import { withStyles } from "@material-ui/core";

import Title from "./Title";
import Personal from "./Personal";
import SkillAndHistory from "./SkillAndHistory";
import Contact from "./Contact";

import themes from "./themes";

const styles = theme => ({
    title: {
        color: "white",
        margin: "10px 0px"
    },
    center: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    disableSelect: {
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        KhtmlUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
        userSelect: "none"
    },
    skillContainer: {
        height: 220,
        width: 200,
        padding: 20,
        cursor: "pointer"
    },
    mobileSkillContainer: {
        height: 20,
        padding: 20
    }
});

/**
 * Root container component for Parallax templates.
 */
class ParallaxContainer extends Component {
    // Initialize Moment object.
    constructor(props) {
        super(props);
        Moment.locale("en");
    }

    // Get number of pages required to display.
    getPagesLength() {
        var result = 0;
        const {
            skill: { skills, languages },
            history: {
                work,
                education,
                organizations,
                achievements,
                projects,
                research,
                licenses,
                extras
            },
            contact: { email, phone, reference }
        } = this.props.cv;

        if (skills.length > 0) {
            result += 1;
        }
        if (languages.length > 0) {
            result += 1;
        }
        if (work.length > 0) {
            result += 1;
        }
        if (education.length > 0) {
            result += 1;
        }
        if (organizations.length > 0) {
            result += 1;
        }
        if (achievements.length > 0) {
            result += 1;
        }
        if (projects.length > 0) {
            result += 1;
        }
        if (research.length > 0) {
            result += 1;
        }
        if (licenses.length > 0) {
            result += 1;
        }
        if (extras.length > 0) {
            result += 1;
        }

        if (email.length + phone.length + reference.length > 0) {
            result += 1;
        }

        return result + 2;
    }

    // Render a list of skills and histories.
    renderSkillAndHistory() {
        var result = [];

        const {
            skill: { skills, languages },
            history: {
                work,
                education,
                organizations,
                achievements,
                projects,
                research,
                licenses,
                extras
            }
        } = this.props.cv;

        if (skills.length > 0) {
            result.push(this.renderItem(result.length, skills, "MY SKILLS"));
        }

        if (languages.length > 0) {
            result.push(this.renderItem(result.length, languages, "LANGUAGES"));
        }

        if (work.length > 0) {
            result.push(
                this.renderItem(result.length, work, "WORK EXPERIENCE")
            );
        }

        if (education.length > 0) {
            result.push(this.renderItem(result.length, education, "EDUCATION"));
        }

        if (organizations.length > 0) {
            result.push(
                this.renderItem(result.length, organizations, "ORGANIZATIONS")
            );
        }

        if (achievements.length > 0) {
            result.push(
                this.renderItem(result.length, achievements, "ACHIEVEMENTS")
            );
        }

        if (projects.length > 0) {
            result.push(this.renderItem(result.length, projects, "PROJECTS"));
        }

        if (research.length > 0) {
            result.push(this.renderItem(result.length, research, "RESEARCH"));
        }

        if (licenses.length > 0) {
            result.push(this.renderItem(result.length, licenses, "LICENSES"));
        }

        if (extras.length > 0) {
            result.push(this.renderItem(result.length, extras, "EXTRA"));
        }

        return result;
    }

    // Render a single Skill or History page.
    renderItem(index, item, subTitle) {
        return (
            <SkillAndHistory
                parentProps={this.props}
                scrollNext={() => this.parallax.scrollTo(index + 3)}
                colors={themes(this.props.cv.template)}
                offset={index + 2}
                items={item}
                subTitle={subTitle}
                key={subTitle}
                template={this.props.cv.template}
            />
        );
    }

    /**
     * Render contact and place it at the bottom.
     * @param {Int} pages count
     */
    renderContact(pages) {
        const {
            contact: { email, phone, reference }
        } = this.props.cv;

        if (email.length + phone.length + reference.length > 0) {
            return (
                <Contact
                    parentProps={this.props}
                    scrollNext={() => this.parallax.scrollTo(0)}
                    colors={themes(this.props.cv.template)}
                    offset={pages - 1}
                />
            );
        }
    }

    render() {
        const pages = this.getPagesLength();

        return (
            <Parallax
                ref={ref => (this.parallax = ref)}
                pages={pages}
                style={{ backgroundColor: "white" }}
            >
                <Title
                    parentProps={this.props}
                    scrollNext={() => this.parallax.scrollTo(1)}
                />
                <Personal
                    parentProps={this.props}
                    scrollNext={() => this.parallax.scrollTo(2)}
                />

                {this.renderSkillAndHistory()}
                {this.renderContact(pages)}
            </Parallax>
        );
    }
}

export default withStyles(styles)(ParallaxContainer);

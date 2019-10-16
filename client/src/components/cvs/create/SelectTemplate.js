import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { isMobile } from "react-device-detect";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import * as actions from "../../../actions";

// Template assets
const templates = [
    {
        title: "Curvit",
        image: require("../../../assets/images/template_0.png")
    },
    {
        title: "Amaranth",
        image: require("../../../assets/images/template_1.png")
    },
    {
        title: "Sea Green",
        image: require("../../../assets/images/template_2.png")
    }
];

/**
 * Component to select template for createCV.
 */
class SelectTemplate extends Component {
    state = {
        template: 0
    };

    componentWillUnmount() {
        this.props.clearCV();
    }

    renderTemplates() {
        return templates.map(({ title, image }, index) => {
            return (
                <Grid key={title} item xs={isMobile ? "auto" : 4}>
                    <div
                        style={
                            this.state.template === index
                                ? {
                                      backgroundColor: "#98B588",
                                      padding: 7,
                                      borderRadius: 5
                                  }
                                : { padding: 7 }
                        }
                    >
                        <Card>
                            <CardActionArea
                                onClick={() =>
                                    this.setState({ template: index })
                                }
                            >
                                <CardMedia title={title} />
                                <img
                                    src={image}
                                    alt={title}
                                    style={{ height: "100%", width: "100%" }}
                                />
                                <CardContent>
                                    <Typography>{title}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </div>
                </Grid>
            );
        });
    }

    render() {
        if (!this.props.cv) {
            return <Redirect to="/" />;
        }

        return (
            <div style={{ margin: "15px 30px 15px 30px" }}>
                <Grid container spacing={4} justify="flex-start">
                    {this.renderTemplates()}
                </Grid>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        margin: "20px 0px"
                    }}
                >
                    <Button
                        variant="outlined"
                        style={{
                            color: "white",
                            backgroundColor: "gray",
                            marginRight: 10
                        }}
                        onClick={() => {
                            this.props.clearCV();
                            this.props.selectTemplate(
                                this.props.cv._id,
                                this.state.template,
                                this.props.history
                            );
                        }}
                    >
                        Select {templates[this.state.template].title}
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state;
};

export default withRouter(
    connect(
        mapStateToProps,
        actions
    )(SelectTemplate)
);

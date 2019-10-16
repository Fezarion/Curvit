import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";

import Header from "./Header";
import Landing from "./Landing";
import CVList from "./cvs/myCVs/CVList";
import CreateCV from "./cvs/create/CreateCV";
import EditCV from "./cvs/create/EditCV";
import SelectTemplate from "./cvs/create/SelectTemplate";
import PreviewCV from "./cvs/template/PreviewCV";
import * as actions from "../actions";

/**
 * Root Component
 */
class App extends Component {
    componentDidMount() {
        this.props.getUser();
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Container style={{ padding: 0, maxWidth: "100%" }}>
                        <Header />
                        <Switch>
                            <Route path="/" exact component={Landing} />
                            <Route path="/cv/list" exact component={CVList} />
                            <Route
                                path="/cv/create"
                                exact
                                component={CreateCV}
                            />
                            <Route
                                path="/cv/template"
                                exact
                                component={SelectTemplate}
                            />
                            <Route
                                path="/cv/preview/:id"
                                exact
                                component={PreviewCV}
                            />
                            <Route
                                path="/cv/edit/:id"
                                exact
                                component={EditCV}
                            />
                            <Route
                                path="/cv/steven"
                                exact
                                component={PreviewCV}
                            />
                            <Redirect to="/" />
                        </Switch>
                    </Container>
                </div>
            </BrowserRouter>
        );
    }
}

export default connect(
    null,
    actions
)(App);

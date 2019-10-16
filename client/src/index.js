import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import Helmet from "react-helmet";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import "typeface-roboto";

import App from "./components/App";
import reducers from "./reducers";
import mainTheme from "./themes/mainTheme";

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={mainTheme}>
            <Helmet bodyAttributes={{ style: "background-color: #35323E; margin: 0" }} />
            <App />
        </MuiThemeProvider>
    </Provider>,
    document.querySelector("#root")
);

import React, { Component } from "react";
import Moment from 'moment'

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Slide from "@material-ui/core/Slide";

const styles = theme => ({
    input: {
        color: "white",
        minWidth: 200
    },

    notchedOutline: {
        borderWidth: "1px",
        borderColor: `gray !important`
    },

    label: {
        "&$focusedLabel": {
            color: "gray"
        },
        color: "gray"
    },

    focusedLabel: {},
    shrink: "shrink",
    deleteButton: {
        margin: theme.spacing(2)
    }
});

/**
 * Component to render a single form field.
 */
class SingleLineField extends Component {
constructor(props) {
    super(props)
    Moment.locale("en")
}

    getInputLabelProps(classes, type) {
        var inputLabelProps = {
            classes: {
                root: classes.label,
                focused: classes.focusedLabel
            }
        };
        if (type === "date") {
            inputLabelProps = { ...inputLabelProps, shrink: true };
        }
        return inputLabelProps;
    }

    render() {
        const {
            classes,
            input,
            type,
            label,
            meta: { touched, error },
            emailError
        } = this.props;


        var hasError = false;
        var helperText = "";

        if (emailError) {
            if (touched) {
                hasError = true
                helperText = emailError
            }
        } else if (error) {
            if (touched) {
                hasError = true;
                helperText = error;
            }
        }

        if (type === "date") {
            input.value = Moment(input.value).format("YYYY-MM-DD")
        }

        return (
            <Slide in={true} direction="right" mountOnEnter style={{width: "100%", margin: "16px 16px 16px 0px"}}>
                <TextField
                    label={label}
                    margin="normal"
                    variant="outlined"
                    type={type}
                    multiline={type === "multi"}
                    error={hasError}
                    helperText={helperText}
                    InputLabelProps={this.getInputLabelProps(classes, type)}
                    InputProps={{
                        classes: {
                            root: classes.input,
                            notchedOutline: classes.notchedOutline
                        }
                    }}
                    {...input}
                />
            </Slide>
        );
    }
}

export default withStyles(styles)(SingleLineField);

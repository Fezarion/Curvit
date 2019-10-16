import React, { Component } from "react";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { toggleSubCategory } from "../../../../actions";

/**
 * Component to render delete button
 */
class DeleteButton extends Component {
    render() {
        const { fields, index } = this.props;
        return (
            <IconButton
                aria-label="delete"
                onClick={() => {
                    fields.remove(index);
                    if (fields.length < 2) {
                        this.props.toggleSubCategory(fields.name, false);
                    }
                }}
            >
                <DeleteIcon
                    style={{ color: "white", marginBottom: isMobile ? 10 : 0 }}
                />
            </IconButton>
        );
    }
}

export default connect(
    null,
    { toggleSubCategory }
)(DeleteButton);

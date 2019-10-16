import React from "react";
import { isMobile } from "react-device-detect";

import Typography from "@material-ui/core/Typography";

import themes from "./themes";

/**
 * Renders subtitle for each subcategories.
 */
export default ({ children, textColor, template }) => {
    const colors = themes(template)
    return (
        <div
            style={{
                width: "50%",
                marginBottom: isMobile ? 20 : 50
            }}
        >
            <div
                style={{
                    display: "inline-flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center"
                }}
            >
                <hr
                    style={{
                        color: colors.primary,
                        backgroundColor: colors.primary,
                        borderColor: "transparent",
                        height: 3,
                        width: isMobile ? 50 : 100,
                        marginRight: 20
                    }}
                />
                <Typography
                    variant={isMobile ? "h6" : "h4"}
                    style={{ color: textColor, width: 300 }}
                >
                    {children}
                </Typography>
            </div>
        </div>
    );
};

import React from "react";

import { ParallaxLayer } from "react-spring/renderprops-addons";
import { isMobile } from "react-device-detect";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import themes from "./themes"

/**
 * Component to render the first page for Title.
 */
export default ({
    parentProps: {
        classes,
        cv: { personal, template }
    },
    scrollNext
}) => {
    const colors = themes(template)
    return (
        <>
            <ParallaxLayer
                offset={0}
                speed={0.1}
                style={{
                    backgroundColor: colors.background,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}
                onClick={() => scrollNext()}
            >
                <div
                    style={{
                        width: isMobile ? "60%" : 600,
                        height: isMobile ? "20%" : 200,
                        borderStyle: "solid",
                        borderWidth: 8,
                        borderColor: "white",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Typography
                        variant={isMobile ? "h4" : "h2"}
                        className={`${classes.title} ${classes.disableSelect}`}
                    >
                        <Box fontWeight="bold">{personal.name}</Box>
                    </Typography>
                    <Typography
                        variant={isMobile ? "body1" : "h6"}
                        className={classes.disableSelect}
                        style={{color: colors.primary, margin: "10px 0px"}}
                    >
                        {personal.title}
                    </Typography>
                </div>
            </ParallaxLayer>
        </>
    );
};

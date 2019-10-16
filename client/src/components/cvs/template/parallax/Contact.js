import React from "react";

import { ParallaxLayer } from "react-spring/renderprops-addons";

import Typography from "@material-ui/core/Typography";

import SubTitle from "./SubTitle";

/**
 * Component to render Contact Information.
 */
const renderItems = (contact, title, colors) => {
    if (contact.length > 0) {
        return (
            <>
                <Typography variant="h4" style={{ color: colors.primary }}>
                    {title}
                </Typography>

                {contact.map((item, index) => {
                    return (
                        <div key={index}>
                            {item.type ? (
                                <Typography
                                    variant="body1"
                                    style={{
                                        color: colors.primary
                                    }}
                                >
                                    {item.type}
                                </Typography>
                            ) : (
                                ""
                            )}
                            {item.value ? (
                                <Typography
                                    variant="body1"
                                    style={{ color: "white" }}
                                >
                                    {item.value}
                                </Typography>
                            ) : (
                                ""
                            )}
                        </div>
                    );
                })}
            </>
        );
    }
};

export default ({
    parentProps: {
        classes,
        cv: {
            contact: { email, phone, reference },
            template
        }
    },
    scrollNext,
    colors,
    offset
}) => {
    return (
        <>
            <ParallaxLayer
                offset={offset}
                speed={0.5}
                style={{
                    backgroundColor: colors.background,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            />

            <ParallaxLayer offset={offset + 0.1} speed={1}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "10%",
                        marginRight: "10%",
                        height: "80%"
                    }}
                >
                    <SubTitle textColor="white" template={template}>CONTACT</SubTitle>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            height: "100%"
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column"
                            }}
                        >
                            {renderItems(email, "Email", colors)}
                            {renderItems(phone, "Phone", colors)}
                            {renderItems(reference, "Reference", colors)}
                        </div>

                        {/*<div
                            style={{
                                height: "90%",
                                width: "90%",
                                borderStyle: "solid",
                                borderWidth: 8,
                                borderColor: "white"
                            }}
                        ></div>*/}
                    </div>
                </div>
            </ParallaxLayer>
        </>
    );
};

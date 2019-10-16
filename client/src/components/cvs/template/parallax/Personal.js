import React from "react";
import { BrowserView, MobileView } from "react-device-detect";

import Moment from "moment";
import { ParallaxLayer } from "react-spring/renderprops-addons";

import Typography from "@material-ui/core/Typography";

import SubTitle from "./SubTitle";

const styles = {
    row: {
        height: 50,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginRight: "2%"
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: "2%"
    }
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
            return `${cityCountry[0]}`;
        case 2:
            return `${cityCountry[0]}, ${cityCountry[1]}`;
        default:
            return "";
    }
}

/**
 * Component to display Personal Information.
 */
export default ({ parentProps: { classes, cv }, scrollNext, colors }) => {
    Moment.locale("en");

    const { personal, template } = cv;

    return (
        <>
            <ParallaxLayer
                offset={1}
                speed={0.5}
                style={{
                    backgroundColor: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
                onClick={() => scrollNext()}
            />

            <ParallaxLayer offset={1.1} speed={1} onClick={() => scrollNext()}>
                <>
                    <MobileView>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                marginLeft: "10%",
                                marginRight: "10%"
                            }}
                        >
                            <SubTitle template={template}>ABOUT ME</SubTitle>
                            <div style={{ display: "flex" }}>
                                <img
                                    src={personal.photo}
                                    alt={personal.name}
                                    style={{
                                        width: 120,
                                        height: 120,
                                        boxShadow:
                                            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                                        marginRight: "8%"
                                    }}
                                />
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column"
                                    }}
                                >
                                    <div style={styles.row}>
                                        <img
                                            src={require(`../../../../assets/icons/${template}_birthday.png`)}
                                            alt=""
                                            style={styles.icon}
                                        />
                                        <Typography
                                            variant="body1"
                                            style={{ marginRight: "2%" }}
                                        >
                                            {Moment(personal.birthday).format(
                                                "DD.MM.YYYY"
                                            )}
                                        </Typography>
                                    </div>
                                    <div style={styles.row}>
                                        <img
                                            src={require(`../../../../assets/icons/${template}_location.png`)}
                                            alt=""
                                            style={styles.icon}
                                        />
                                        <Typography variant="body1">
                                            {getCityCountry(personal)}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                            <Typography
                                variant="body1"
                                style={{
                                    marginTop: 30,
                                }}
                            >
                                {personal.summary}
                            </Typography>
                        </div>
                    </MobileView>
                    <BrowserView>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                marginLeft: "10%",
                                marginRight: "10%"
                            }}
                        >
                            <SubTitle template={template}>ABOUT ME</SubTitle>
                            <div style={{ display: "flex" }}>
                                <img
                                    src={personal.photo}
                                    alt={personal.name}
                                    style={{
                                        width: 300,
                                        height: 300,
                                        boxShadow:
                                            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                                        marginRight: "8%"
                                    }}
                                />
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column"
                                    }}
                                >
                                    <div style={styles.row}>
                                        <img
                                            src={require(`../../../../assets/icons/${template}_birthday.png`)}
                                            alt=""
                                            style={styles.icon}
                                        />
                                        <Typography
                                            variant="body1"
                                            style={{ marginRight: "2%" }}
                                        >
                                            {Moment(personal.birthday).format(
                                                "DD.MM.YYYY"
                                            )}
                                        </Typography>
                                        <img
                                            src={require(`../../../../assets/icons/${template}_location.png`)}
                                            alt=""
                                            style={styles.icon}
                                        />
                                        <Typography variant="body1">
                                            {getCityCountry(personal)}
                                        </Typography>
                                    </div>
                                    <Typography
                                        variant="body1"
                                        style={{ width: "70%" }}
                                    >
                                        {personal.summary}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </BrowserView>
                </>
            </ParallaxLayer>
        </>
    );
};

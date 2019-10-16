import React from "react";
import { isMobile} from 'react-device-detect'

import Slider from "@material-ui/core/Slider";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        color: "white"
    },
    markLabel: {
        color: "#bfbfbf"
    },
    markLabelActive: {
        color: "white"
    }
});

/**
 * Component to render skill slider
 */
export default ({ input, level, fieldsName }) => {
    const classes = useStyles();
    const { onChange } = input;
    const isLanguage = fieldsName.includes("languages"); // Changes the label names.

    const marks = [
        {
            value: 1,
            label: isMobile ? 1 : isLanguage ? "Basic" : "Beginner"
        },
        {
            value: 2,
            label: isMobile ? 2 : "Novice"
        },
        {
            value: 3,
            label: isMobile ? 3 : isLanguage ? "Conversational" : "Intermediate"
        },
        {
            value: 4,
            label: isMobile ? 4 : "Proficient"
        },
        {
            value: 5,
            label: isMobile ? 5 : isLanguage ? "Business" : "Expert"
        }
    ];

    return (
        <div
            style={{ display: "flex", justifyContent: "center" }}
        >
            <Slide in={true} direction="right" mountOnEnter style={{width:"95%"}}>
                <Slider
                    classes={classes}
                    defaultValue={level}
                    getAriaValueText={value => {
                        onChange(value);
                    }}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="off"
                    marks={marks}
                    step={1}
                    min={1}
                    max={5}
                />
            </Slide>
        </div>
    );
};

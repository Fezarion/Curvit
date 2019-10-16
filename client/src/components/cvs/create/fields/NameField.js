import React, { Component } from "react";
import { CloudinaryContext } from "cloudinary-react";
import { connect } from "react-redux";
import { Field, change } from "redux-form";
import { isMobile } from "react-device-detect";
import axios from "axios";
import Resizer from "react-image-file-resizer";

import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";

import Config from "../../../../config/cloudinaryConfig";
import SingleField from "./SingleField";
import { Typography } from "@material-ui/core";

// Upload count of image, max upload is 3 to defer users from abusing it.
var uploadCount = 0;

const mapStateToProps = ({ form }) => {
    return { form };
};

/**
 * Component for photo input.
 */
const PhotoInput = connect(mapStateToProps)(props => {
    return (
        <>
            <input
                type="file"
                id="image_upload"
                accept=".jpg, .png, .jpeg"
                onChange={event => {
                    onPhotoSelected(props.dispatch, event.target.files[0]);
                }}
                style={{ display: "none" }}
            />

            <label htmlFor="image_upload">{props.element}</label>
        </>
    );
});

function onPhotoSelected(dispatch, file) {
    // If image is too large, then resize it
    if (file && file.size > 2000000) {
        Resizer.imageFileResizer(file, 1920, 1920, "JPEG", 80, 0, uri => {
            uploadPhoto(dispatch, new File([uri], file.name));
        });
        return;
    }

    return uploadPhoto(dispatch, file);
}

function uploadPhoto(dispatch, file) {
    if (uploadCount === 1) {
        alert("You can only reupload one more time");
    } else if (uploadCount > 2) {
        alert("You have reuploaded too many times");
        return;
    }

    const url = `https://api.cloudinary.com/v1_1/${Config.cloudName}/upload`;
    let data = new FormData();
    data.append("file", file, file.fileName);
    data.append("upload_preset", Config.uploadPreset);
    data.append("tags", "curvit");

    axios
        .post(url, data, {
            headers: {
                accept: "application/json",
                "Accept-Language": "en-US,en;q=0.8",
                "Content-Type": `multipart/form-data; boundary=${data._boundary}`
            }
        })
        .then((response, error) => {
            uploadCount++;
            // TODO show error here
            dispatch(change("cvForm", "personal_photo", response.data.url));
        });
}

/**
 * Component to render Name and Photo Input Field.
 */
class NameField extends Component {
    renderUploadButton() {
        try {
            const personal_photo = this.props.form.cvForm.values.personal_photo;
            if (personal_photo === undefined) {
                throw Object.assign(new Error("undefined"));
            }
            return (
                <Field
                    component={PhotoInput}
                    name={"personal_photo"}
                    element={
                        <div
                            style={{
                                marginLeft: 20,
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center"
                            }}
                        >
                            <Avatar
                                alt="My Photo"
                                src={personal_photo}
                                style={{
                                    cursor: "pointer",
                                    height: 60,
                                    width: 60
                                }}
                            />
                            <Typography
                                variant="body1"
                                style={{
                                    cursor: "pointer",
                                    color: "white",
                                    marginLeft: 20,
                                    display: isMobile ? "none" : "block"
                                }}
                            >
                                Upload Photo
                            </Typography>
                        </div>
                    }
                />
            );
        } catch (error) {
            return (
                <Field
                    component={PhotoInput}
                    name={"personal_photo"}
                    element={
                        <IconButton component="span" style={{ padding: 0 }}>
                            <div
                                style={{
                                    marginLeft: 20,
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}
                            >
                                <AccountCircle
                                    style={{
                                        height: 60,
                                        width: 60,
                                        color: "white"
                                    }}
                                />
                                <Typography
                                    variant="body1"
                                    style={{
                                        cursor: "pointer",
                                        color: "white",
                                        marginLeft: 20,
                                        display: isMobile ? "none" : "block"
                                    }}
                                >
                                    Upload Photo
                                </Typography>
                            </div>
                        </IconButton>
                    }
                />
            );
        }
    }

    render() {
        const { type, key, label, input } = this.props;

        return (
            <CloudinaryContext
                cloudName={Config.cloudName}
                uploadPreset={Config.uploadPreset}
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ width: isMobile ? "100%" : "50%" }}>
                        <SingleField
                            type={type}
                            key={key}
                            name={key}
                            label={label}
                            input={input}
                            {...this.props}
                        />
                    </div>
                    {this.renderUploadButton()}
                </div>
            </CloudinaryContext>
        );
    }
}

export default connect(mapStateToProps)(NameField);

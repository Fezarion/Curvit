const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const CV = mongoose.model("cv");

/**
 * CV Routes.
 */
module.exports = app => {
    // Get User CVs
    app.get("/api/cv", requireLogin, async (req, res) => {
        try {
            let cvs = await CV.find({ _user: res.locals.userId });
            cvs = cvs.map(cv => {
                cv = cv.toObject();
                delete cv._user;
                return cv;
            });
            res.send(cvs);
        } catch (error) {
            res.status(404).send({ error: `Get CV error, ${error}` });
        }
    });

    // Get a specific CV
    app.get("/api/cv/:cvId", async (req, res) => {
        const id = req.params.cvId;
        try {
            const cv = (await CV.findById(id)).toObject();
            delete cv._user;
            res.send(cv);
        } catch (error) {
            res.status(404).send({
                error: "Can't find cv with that particular id"
            });
        }
    });

    // Delete a specific CV
    app.delete("/api/cv/:cvId", requireLogin, async (req, res) => {
        const id = req.params.cvId;
        const { userId } = res.locals;

        try {
            const conditions = {
                _id: id,
                _user: userId
            };

            const cv = await CV.findOneAndDelete(conditions, {
                useFindAndModify: false
            });

            if (!cv) {
                throw Object.assign(new Error("Can't find cv"));
            }

            res.send(cv);
        } catch (error) {
            res.status(404).send({
                error:
                    "Can't find cv with that particular id or you are not authorized to update this cv."
            });
        }
    });

    // Create a new CV
    app.post("/api/cv", requireLogin, async (req, res) => {
        const { personal, contact, history, skill, extra } = req.body;

        try {
            const cv = await new CV({
                _user: res.locals.userId,
                personal,
                contact,
                history,
                skill,
                extra
            }).save();

            res.send(cv);
        } catch (error) {
            res.status(422).send({ error: `Create new CV error, ${error}` });
        }
    });

    // Updates the CV with a particular id
    app.put("/api/cv", requireLogin, async (req, res) => {
        const {
            id,
            cv: { personal, contact, history, skill, extra }
        } = req.body;
        const { userId } = res.locals;

        if (id === undefined) {
            return res.status(422).send({ error: "Missing id" });
        }

        try {
            const conditions = {
                _id: id,
                _user: userId
            };

            const cv = await CV.findOneAndUpdate(
                conditions,
                {
                    personal,
                    contact,
                    history,
                    skill,
                    extra
                },
                { new: true, useFindAndModify: false }
            );

            if (!cv) {
                throw Object.assign(new Error("Can't find cv"));
            }

            res.send(cv);
        } catch (error) {
            res.status(404).send({
                error:
                    "Can't find cv with that particular id or you are not authorized to update this cv."
            });
        }
    });

    // Patches the cv's chosen template
    app.patch("/api/cv/template", requireLogin, async (req, res) => {
        const { id, templateId } = req.body;
        const { userId } = res.locals;

        if (id === undefined || templateId === undefined) {
            return res
                .status(422)
                .send({ error: "Missing id and/or template" });
        }

        try {
            const cv = await CV.findById(id);
            if (!userId.match(cv._user)) {
                return res.status(401).send({
                    error: "You are not authorized to update this cv."
                });
            }
            cv.template = templateId;

            res.send(await cv.save());
        } catch (error) {
            res.status(404).send({
                error: "Can't find cv with that particular id"
            });
        }
    });
};

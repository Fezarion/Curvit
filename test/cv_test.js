const assert = require("assert");
const request = require("supertest");
const app = require("..");
const config = require("./config");

describe("CV route tests", () => {
    it("GET CV with id", done => {
        request(app)
            .get(`/api/cv/${config.testCVId}`)
            .timeout(5000)
            .expect(200, done);
    });

    it("responds with unauthorized when no authorization key is included", done => {
        request(app)
            .get("/test/login")
            .expect(401, done);
    });

    it("checks if test user exists", done => {
        request(app)
            .get("/test/login")
            .set("Authorization", config.testUser)
            .end((err, res) => {
                assert(res.body.authenticated === true);
                done();
            });
    });

    it("GET the user's CVs", done => {
        request(app)
            .get("/api/cv")
            .set("Authorization", config.testUser)
            .expect(200, done);
    });

    it("POST new CV and then DELETE it", done => {
        request(app)
            .post("/api/cv")
            .send(config.testCV)
            .set("Authorization", config.testUser)
            .end((err, res) => {
                request(app)
                    .delete(`/api/cv/${res.body._id}`)
                    .set("Authorization", config.testUser)
                    .expect(200, done);
            });
    });

    it("PUT new values to existing CV", done => {
        request(app)
            .put("/api/cv")
            .send({ id: config.testCVId, cv: config.testCV })
            .set("Authorization", config.testUser)
            .expect(200, done);
    });

    it("PATCH templateId to existing CV", done => {
        const templateId = Math.ceil(Math.random() * 2);
        request(app)
            .patch("/api/cv/template")
            .send({ id: config.testCVId, templateId })
            .set("Authorization", config.testUser)
            .end((err, res) => {
                assert(templateId === res.body.template);
                done();
            });
    });

    it("can't update CV from different user", done => {
        request(app)
            .put("/api/cv")
            .send({ id: config.testCVId, cv: config.testCV })
            .set("Authorization", config.testUser2)
            .expect(404, done);
    });

    it("rejects other user's CV's PATCH", done => {
        request(app)
            .patch("/api/cv/template")
            .send({ id: config.testCVId, templateId: 0 })
            .set("Authorization", config.testUser2)
            .expect(401, done);
    });
});

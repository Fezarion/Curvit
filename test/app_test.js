const assert = require("assert");
const request = require("supertest");
const app = require("..");

describe("The express app", () => {
    it("handles a GET request to API", done => {
        request(app)
            .get("/test")
            .end((err, response) => {
                assert(response.body.test === "hello world");
                done();
            });
    });
});

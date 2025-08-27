const { expect } = require('chai');
const request = require('request');

const baseUrl = "http://localhost:3004"; 

describe("SIT725 Week6 – Projects API (Mocha + Chai)", function () {
  let createdId = null;

  it("1) /health should return 200 and { ok: true }", function (done) {
    request.get(`${baseUrl}/health`, function (error, res, body) {
      expect(res.statusCode).to.equal(200);
      const json = JSON.parse(body);
      expect(json).to.have.property("ok", true);
      done();
    });
  });

  it("2) GET /api/projects should return an array", function (done) {
    request.get(`${baseUrl}/api/projects`, function (error, res, body) {
      expect(res.statusCode).to.equal(200);
      const json = JSON.parse(body);
      expect(json).to.have.property("data");
      expect(json.data).to.be.an("array");
      done();
    });
  });

  it("3) POST /api/projects should create a project (201)", function (done) {
    const newProject = {
      title: "Test Kitten",
      image: "images/test.jpg",
      link: "About Test Kitten",
      description: "A kitten used for testing",
    };

    request.post(
      { url: `${baseUrl}/api/projects`, json: true, body: newProject },
      function (err, res, body) {
        expect(res.statusCode).to.equal(201);
        expect(body).to.have.property("data");
        expect(body.data).to.include({ title: "Test Kitten" });
        createdId = body.data._id || body.data.id;
        expect(createdId).to.exist;
        done();
      }
    );
  });

  it("4) GET /api/projects/:id should return the created project", function (done) {
    request.get(
      `${baseUrl}/api/projects/${createdId}`,
      function (error, res, body) {
        expect(res.statusCode).to.equal(200);
        const json = JSON.parse(body);
        expect(json).to.have.property("data");
        expect(json.data).to.have.property("_id");
        expect(json.data._id || json.data.id).to.equal(createdId);
        done();
      }
    );
  });

  it("5) GET /api/projects/:id (non-existing id) should return 404", function (done) {
    const nonExistingId = "000000000000000000000000"; // valid ObjectId but not present
    request.get(
      `${baseUrl}/api/projects/${nonExistingId}`,
      function (error, res, _body) {
        expect(res.statusCode).to.equal(404);
        done();
      }
    );
  });

  it("6) POST /api/projects with missing fields should return error (400/500)", function (done) {
    const badPayload = { title: "No Image" }; // missing required image
    request.post(
      { url: `${baseUrl}/api/projects`, json: true, body: badPayload },
      function (error, res, body) {
        expect(res.statusCode).to.satisfy((code) => [400, 500].includes(code));
        done();
      }
    );
  });
});

const request = require("supertest");
const expect = require("chai").expect;
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

// Import your express app instead of redefining it
const app = require("../server"); // Adjust the path as necessary

describe("POST /login", function () {
  it("should reject with 400 for weak passwords", function (done) {
    request(app)
      .post("/login")
      .type("form")
      .send({ password: "123" }) // This should be a weak password
      .expect(400)
      .end(function (err, res) {
        expect(res.text).to.equal(
          "Password does not meet the requirements or is too common."
        );
        done(err);
      });
  });

  it("should accept with 200 for strong passwords", function (done) {
    request(app)
      .post("/login")
      .type("form")
      .send({ password: "StrongPassw0rd!" }) // This should be a strong password
      .expect(200, done); // Expecting HTTP status 200: OK
  });
});

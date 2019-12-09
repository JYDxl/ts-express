import * as should from "should";
import * as supertest from "supertest";
import * as app from "../../app";
import {logger} from "../../src/util/logger";

const request = supertest(app);
const log     = logger();

describe("test/routes/fib.test.js", () => {
  it("should return 55 when n is 10", (done) => {
    request
      .get("/fib")
      .query({n: 10})
      .end((err, res) => {
        should(err).null();
        should(res.status).eql(200);
        should(res.text).eql("55");
        done();
      });
  });

  it("should return 0 when n === 0", (done) => {
    request
      .get("/fib")
      .query({n: 0})
      .end((err, res) => {
        should(err).null();
        should(res.status).eql(200);
        should(res.text).eql("0");
        done();
      });
  });

  it("should throw error when n===100", (done) => {
    request
      .get("/fib")
      .query({n: 100})
      .end((err, res) => {
        should(res.status).eql(500);
        log.error(res.text);
        done();
      });
  });
});

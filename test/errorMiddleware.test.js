import { notFound, errorHandler } from "../middleware/errorMiddleware.js";
import { assert } from "chai";

describe("notFound middleware", () => {
  it("should return a 404 status code", () => {
    const req = { originalUrl: "/test" };
    const res = {
      status: function (statusCode) {
        assert.strictEqual(statusCode, 404);
        return this;
      },
      send: function () {},
    };
    const next = function (error) {
      assert(error instanceof Error);
      assert.strictEqual(error.message, "Not Found - /test");
    };

    notFound(req, res, next);
  });
});

describe("errorHandler middleware", () => {
  beforeEach(() => {
    process.env.NODE_ENV = "test";
  });

  it("should return a JSON response with error message and stack trace in development environment", () => {
    const err = new Error("Test error message");
    const req = {};
    const res = {
      statusCode: 200,
      status: function (statusCode) {
        assert.strictEqual(statusCode, 500);
        return this;
      },
      json: function (response) {
        assert.deepStrictEqual(response, {
          message: "Test error message",
          stack: err.stack,
        });
      },
    };
    const next = function (error) {};

    errorHandler(err, req, res, next);
  });

  it("should return a JSON response with error message and no stack trace in production environment", () => {
    const err = new Error("Test error message");
    const req = {};
    const res = {
      statusCode: 200,
      status: function (statusCode) {
        assert.strictEqual(statusCode, 500);
        return this;
      },
      json: function (response) {
        assert.deepStrictEqual(response, {
          message: "Test error message",
          stack: null,
        });
      },
    };
    const next = function (error) {};
    process.env.NODE_ENV = "production";

    errorHandler(err, req, res, next);
  });

  it("should return a status code based on the response statusCode if it's not 200", () => {
    const err = new Error("Test error message");
    const req = {};
    const res = {
      statusCode: 404,
      status: function (statusCode) {
        assert.strictEqual(statusCode, 404);
        return this;
      },
      json: function (response) {
        assert.deepStrictEqual(response, {
          message: "Test error message",
          stack: err.stack,
        });
      },
    };
    const next = function (error) {};

    errorHandler(err, req, res, next);
  });
});

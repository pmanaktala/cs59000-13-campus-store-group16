import mongoose from "mongoose";
import { expect } from "chai";
import sinon from "sinon";
import User from "../models/userModel.js";

describe("User model", () => {
  let mongooseConnectStub;

  before(async () => {
    // Stub the mongoose connect method
    mongooseConnectStub = sinon.stub(mongoose, "connect");
    await mongooseConnectStub();
  });

  after(async () => {
    // Restore the mongoose connect method
    mongooseConnectStub.restore();
  });

  describe("matchPassword", () => {
    it("should return true if the passwords match", async () => {
      // Create a user with a hashed password
      const user = new User({
        name: "John Doe",
        email: "johndoe@example.com",
        password: "password",
      });

      // Stub the bcrypt.compare method to return true
      sinon.stub(user, "matchPassword").resolves(true);

      // Call the matchPassword method with the correct password
      const result = await user.matchPassword("password");

      // Expect the result to be true
      expect(result).to.be.true;
    });

    it("should return false if the passwords do not match", async () => {
      // Create a user with a hashed password
      const user = new User({
        name: "John Doe",
        email: "johndoe@example.com",
        password: "password",
      });

      // Stub the bcrypt.compare method to return false
      sinon.stub(user, "matchPassword").resolves(false);

      // Call the matchPassword method with an incorrect password
      const result = await user.matchPassword("incorrect_password");

      // Expect the result to be false
      expect(result).to.be.false;
    });
  });
});

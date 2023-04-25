import { expect } from "chai";
import jwt from "jsonwebtoken";
import sinon from "sinon";

import generateToken from "../utils/generateToken.js";

describe("generateToken", () => {
  process.env.JWT_SECRET = "mysecretkey";

  it("returns a JWT token with the correct payload", () => {
    const userId = "abc123";
    const token = generateToken(userId);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    expect(decoded).to.have.property("id").that.equals(userId);
  });

  it("returns a JWT token that expires in 30 days", () => {
    const token = generateToken("abc123");
    const decoded = jwt.decode(token);
    const expirationDate = new Date(decoded.exp * 1000);
    const expectedExpirationDate = new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000
    );
    expect(expirationDate.getTime()).to.be.closeTo(
      expectedExpirationDate.getTime(),
      1000
    );
  });
});

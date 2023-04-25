import mongoose from "mongoose";
import sinon from "sinon";
import { expect } from "chai";

import Product from "../models/productModel.js";

describe("Product model", () => {
  let mongooseConnectStub;
  let productSaveStub;

  before(() => {
    mongooseConnectStub = sinon.stub(mongoose, "connect");
  });

  after(() => {
    mongooseConnectStub.restore();
  });

  beforeEach(() => {
    productSaveStub = sinon.stub(Product.prototype, "save");
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should be invalid if required fields are empty", () => {
    const product = new Product();

    const error = product.validateSync();

    expect(error.errors.name).to.exist;
    expect(error.errors.image).to.exist;
    expect(error.errors.brand).to.exist;
    expect(error.errors.category).to.exist;
    expect(error.errors.description).to.exist;
  });

  it("Save method called", async () => {
    const product = new Product();

    await product.save();

    sinon.assert.calledOnce(productSaveStub);
  });
});

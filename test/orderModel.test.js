import mongoose from "mongoose";
import sinon from "sinon";
import { expect } from "chai";
import Order from "../models/orderModel.js";

describe("Order model", () => {
  let mongooseConnectStub, orderSaveStub;

  before(() => {
    mongooseConnectStub = sinon.stub(mongoose, "connect");
  });

  after(() => {
    mongooseConnectStub.restore();
  });

  beforeEach(() => {
    orderSaveStub = sinon.stub(Order.prototype, "save");
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should save order with all fields", async () => {
    const order = new Order({
      user: "615af4ca8a95f10224a67d9a",
      orderItems: [
        {
          name: "Product 1",
          qty: 2,
          image: "image1.jpg",
          price: 9.99,
          product: "615af4ca8a95f10224a67d9b",
        },
      ],
      shippingAddress: {
        address: "123 Main St",
        city: "Anytown",
        postalCode: "12345",
        country: "USA",
      },
      paymentMethod: "PayPal",
      paymentResult: {
        id: "PAYMENT_ID",
        status: "COMPLETED",
        update_time: "2022-04-25T00:00:00Z",
        email_address: "test@example.com",
      },
      taxPrice: 1.0,
      shippingPrice: 2.0,
      totalPrice: 11.99,
      isPaid: true,
      paidAt: "2022-04-25T00:00:00Z",
      isDelivered: false,
    });

    orderSaveStub.resolves(order);

    const savedOrder = await order.save();

    expect(orderSaveStub.calledOnce).to.be.true;
    expect(savedOrder.user.toString()).to.equal("615af4ca8a95f10224a67d9a");
    expect(savedOrder.orderItems[0].name).to.equal("Product 1");
    expect(savedOrder.shippingAddress.address).to.equal("123 Main St");
    expect(savedOrder.paymentMethod).to.equal("PayPal");
    expect(savedOrder.paymentResult.id).to.equal("PAYMENT_ID");
    expect(savedOrder.taxPrice).to.equal(1.0);
    expect(savedOrder.shippingPrice).to.equal(2.0);
    expect(savedOrder.totalPrice).to.equal(11.99);
    expect(savedOrder.isPaid).to.be.true;
    expect(savedOrder.paidAt.toISOString()).to.equal(
      "2022-04-25T00:00:00.000Z"
    );
    expect(savedOrder.isDelivered).to.be.false;
  });
});

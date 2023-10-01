import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = () => {
  //Changes due to react-router-6, we do not have match or history instead we are using navigate and useParams
  let navigate = useNavigate();
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${quantity}`);
  };

  return (
    <>
      <Link className="btn btn-light my-3" to={"/"}>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant={"flush"}>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  text={`${product.numReviews} reviews`}
                  value={product.rating}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price : $ {product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description : {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant={"flush"}>
                <ListGroup.Item>
                  <Row>
                    <Col>Price : </Col>
                    <Col>
                      <strong> $ {product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status : </Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out of stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col> Quantity </Col>
                      <Col>
                        <Form.Control
                          as={"select"}
                          value={quantity}
                          onChange={(e) => {
                            setQuantity(e.target.value);
                          }}
                        >
                          {[...Array(product.countInStock).keys()].map(
                            (number) => {
                              return (
                                <option key={number + 1} value={number + 1}>
                                  {number + 1}
                                </option>
                              );
                            }
                          )}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock <= 0}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;

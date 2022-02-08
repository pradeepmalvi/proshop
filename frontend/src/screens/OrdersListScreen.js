import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderList } from "../actions/orderActions";
import {
  Table,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
const OrdersListScreen = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { orders, loading, error } = orderList;

  useEffect(() => {
    dispatch(getOrderList());
  }, []);

  return loading ? (
    <Loader></Loader>
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <>
      <Row>
        <Col md={12}>
          {orders.length === 0 ? (
            <Message>Order is empty</Message>
          ) : (
            <>
              <Row className="align-items-center">
                <Col>
                  <h1>Orders</h1>
                </Col>
              </Row>
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <td>ID</td>
                  <td>DATE</td>
                  <td>TOTAL</td>
                  <td>PAID</td>
                  <td>DELIVERED</td>
                  <td></td>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <i className="fas fa-times text-danger"></i>
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <i className="fas fa-times text-danger"></i>
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button className="btn-sm" variant="light">
                            Details
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>{" "}
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default OrdersListScreen;

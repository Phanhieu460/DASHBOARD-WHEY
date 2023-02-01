import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Orders = (props) => {
  const { orders } = props;
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Tên</th>
          <th scope="col">Email</th>
          <th scope="col">Tổng</th>
          <th scope="col">Paid</th>
          <th scope="col">Ngày</th>
          <th>Trạng Thái</th>
          <th scope="col" className="text-end">
            Hành Động
          </th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id}>
            <td>
              <b>{order.user.name}</b>
            </td>
            <td>{order.user.email}</td>
            <td>
              {"₫" +
                " " +
                Intl.NumberFormat("vi-VN").format(order.totalPrice) +
                ".000"}
            </td>
            <td>
              {order.isPaid ? (
                <span className="badge rounded-pill alert-success">
                  Paid At {moment(order.paidAt).format("MMM Do YYYY")}
                </span>
              ) : (
                <span className="badge rounded-pill alert-danger">
                  Not Paid
                </span>
              )}
            </td>
            <td>{moment(order.createdAt).format("MMM Do YYYY")}</td>
            <td>
              {order.isDelivered ? (
                <span className="badge btn-success">Đã Giao</span>
              ) : (
                <span className="badge btn-dark">Chưa Giao</span>
              )}
            </td>
            <td className="d-flex justify-content-end align-item-center">
              <Link to={`/order/${order._id}`} className="text-success">
                <i className="fas fa-eye"></i>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Orders;

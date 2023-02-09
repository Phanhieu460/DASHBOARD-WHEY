import React from "react";

const OrderDetailInfo = (props) => {
  const { order } = props;
  return (
    <div className="row mb-5 order-info-wrap">
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-user"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">Khách Hàng</h6>
            <p className="mb-1">
              {order.user.name} <br />
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
            </p>
            <p>Số điện thoại: {order.shippingAddress.phone}</p>
          </div>
        </article>
      </div>
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-truck-moving"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">Thông tin đặt hàng</h6>
            <p className="mb-1">Shipping: {order.shippingAddress.country}</p>
            <p>
              Phương Thức Thanh Toán:{" "}
              {order.paymentMethod === "paypal"
                ? "Paypal"
                : "Thanh toán khi nhận hàng"}
            </p>
          </div>
        </article>
      </div>
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-map-marker-alt"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">Địa Chỉ Nhận Hàng</h6>
            <p className="mb-1">
              Địa chỉ: {order.shippingAddress.city}
              <br />
              {order.shippingAddress.address}
              <br />
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default OrderDetailInfo;

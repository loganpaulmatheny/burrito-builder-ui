import React from "react";
import "./Orders.css";

const Orders = ({ orders, deleteOrder }) => {
  const orderEls = orders.map((order) => {
    return (
      <div className="order" key={order.id}>
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map((ingredient) => {
            return <li key={ingredient}>{ingredient}</li>;
          })}
        </ul>
        <div onClick={() => deleteOrder(order.id)}>🗑️</div>
      </div>
    );
  });

  return (
    <section className="orders-container">
      {orderEls.length ? orderEls : <p>No orders yet!</p>}
    </section>
  );
};

export default Orders;

import { useState, useEffect } from "react";
import "./App.css";
import { deleteOrderApi, getOrders, postOrder } from "../../apiCalls";
import Orders from "../../components/Orders/Orders";
import OrderForm from "../../components/OrderForm/OrderForm";

function App() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders()
      .then((data) => {
        setOrders(data.orders);
      })
      .catch((err) => console.error("Error fetching:", err));
  }, []);

  function addOrder(newOrder) {
    postOrder(newOrder).then((data) => {
      console.log("Posted data", data);
      setOrders([...orders, data]);
    });
  }

  function deleteOrder(id) {
    deleteOrderApi(id).then(() => {
      getOrders().then((data) => {
        setOrders(data.orders);
      });
    });
  }

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm addOrder={addOrder} />
      </header>
      {orders.length > 0 && (
        <Orders orders={orders} deleteOrder={deleteOrder} />
      )}
    </main>
  );
}

export default App;

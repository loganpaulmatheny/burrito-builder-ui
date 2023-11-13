import { useState, useEffect } from "react";
import "./App.css";
import { getOrders, postOrder } from "../../apiCalls";
import Orders from "../../components/Orders/Orders";
import OrderForm from "../../components/OrderForm/OrderForm";

function App() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders()
      .then((data) => {
        // console.log(data);
        setOrders(data.orders);
      })
      .catch((err) => console.error("Error fetching:", err));
  }, []);

  function addOrder(newOrder) {
    // clearError();
    postOrder(newOrder).then((data) => {
      console.log("Posted data", data);
      setOrders([...orders, data]);
    });
    // .catch((error) => {
    //   console.log(error.message);
    //   if (error.message === "500") {
    //     setError(
    //       "Oopsy daisy, looks like something went wrong, please try again later!"
    //     );
    //   } else {
    //     setError(
    //       "Hmmmm, not sure what happened there, check your URL and try again"
    //     );
    //   }
    // });
  }

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm addOrder={addOrder} />
      </header>
      {orders.length > 0 && <Orders orders={orders} />}
    </main>
  );
}

export default App;

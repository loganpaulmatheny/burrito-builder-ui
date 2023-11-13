export const getOrders = () => {
  return fetch("http://localhost:3001/api/v1/orders").then((response) => {
    return response.json();
  });
};

export const postOrder = (newOrder) => {
  return fetch("http://localhost:3001/api/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newOrder),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};

export const deleteOrderApi = (id) => {
  return fetch(`http://localhost:3001/api/v1/orders/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    console.log(`${id} deleted`);
  });
};

export const getOrders = () => {
  return fetch("http://localhost:3001/api/v1/orders").then((response) => {
    console.log("apiCall happening");
    return response.json();
  });
};

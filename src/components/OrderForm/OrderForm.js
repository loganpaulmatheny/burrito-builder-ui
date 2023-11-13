import { useState } from "react";

function OrderForm({ addOrder }) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    const newOrder = {
      id: Date.now(),
      name,
      ingredients,
    };
    addOrder(newOrder);
    clearInputs();
  }

  function clearInputs() {
    setName("");
    setIngredients([]);
  }

  const possibleIngredients = [
    "beans",
    "steak",
    "carnitas",
    "sofritas",
    "lettuce",
    "queso fresco",
    "pico de gallo",
    "hot sauce",
    "guacamole",
    "jalapenos",
    "cilantro",
    "sour cream",
  ];

  const handleIngredientsClick = (ingredient) => {
    setIngredients((ingredients) => [...ingredients, ingredient]);
  };

  const ingredientButtons = possibleIngredients.map((ingredient) => {
    return (
      <button
        className="ingredients-button"
        key={ingredient}
        name={ingredient}
        onClick={(e) => {
          e.preventDefault();
          handleIngredientsClick(ingredient);
        }}
      >
        {ingredient}
      </button>
    );
  });

  return (
    <form>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      {ingredientButtons}

      <p className="order-recap">
        Order: {ingredients.join(", ") || "Nothing selected"}
      </p>

      <button
        className="submit-button"
        onClick={(e) => handleSubmit(e)}
        disabled={ingredients.length === 0 || name === ""}
      >
        Submit Order
      </button>
    </form>
  );
}

export default OrderForm;

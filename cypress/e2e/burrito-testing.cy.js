describe("Testing the initial load of the page", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/orders", {
      statusCode: 200,
      fixture: "burritos.json",
    }).as("getRequest");

    cy.intercept("POST", "http://localhost:3001/api/v1/orders", {
      statusCode: 201,
      body: {
        name: "Logan's Burrito",
        ingredients: ["beans", "steak", "lettuce"],
        id: 4,
      },
    }).as("postRequest");
  });

  it("Should have all the intial elements on the page", () => {
    cy.visit("http://localhost:3000")
      .get("h1")
      .should("contain", "Burrito Builder")
      .get("input")
      .should("exist")
      .get(".ingredients-button")
      .should("have.length", 12)
      .get("p")
      .should("contain", "Nothing selected")
      .get(".submit-button")
      .should("be.disabled")
      .get(".orders-container")
      .find(".order")
      .should("have.length", 3);
  });
});

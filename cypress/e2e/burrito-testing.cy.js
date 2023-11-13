describe("Testing the initial load of the page", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/orders", {
      statusCode: 200,
      fixture: "burritos.json",
    }).as("getRequest");

    cy.intercept("POST", "http://localhost:3001/api/v1/orders", {
      statusCode: 201,
      body: {
        id: 4,
        name: "Logan's Burrito",
        ingredients: ["beans", "steak", "lettuce"],
      },
    }).as("postRequest");
  });

  it("Should have all the intial elements on the page", () => {
    cy.visit("http://localhost:3000")
      .wait("@getRequest")
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
      .should("have.length", 3)
      .get(".order:first")
      .find("h3")
      .should("contain", "Pat")
      .get(".order:first")
      .find("li")
      .eq(0)
      .should("contain", "beans")
      .get(".order:first")
      .find("li")
      .eq(1)
      .should("contain", "lettuce")
      .get(".order:first")
      .find("li")
      .eq(2)
      .should("contain", "carnitas")
      .get(".order:first")
      .find("li")
      .eq(3)
      .should("contain", "queso fresco")
      .get(".order:first")
      .find("li")
      .eq(4)
      .should("contain", "jalapeno");
  });

  it("Should be able to submit an order", () => {
    cy.visit("http://localhost:3000")
      .wait("@getRequest")
      .get("input")
      .type("Logan's Burrito")
      .should("have.value", "Logan's Burrito")
      .get(".ingredients-button")
      .eq(0)
      .click()
      .get(".ingredients-button")
      .eq(1)
      .click()
      .get(".ingredients-button")
      .eq(4)
      .click()
      .get(".order-recap")
      .should("contain", "Order: beans, steak, lettuce")
      .get(".submit-button")
      .click()
      .wait("@postRequest")
      .get(".order")
      .eq(3)
      .find("h3")
      .should("contain", "Logan's Burrito")
      .get(".order")
      .eq(3)
      .find("li")
      .eq(0)
      .should("contain", "beans")
      .get(".order")
      .eq(3)
      .find("li")
      .eq(1)
      .should("contain", "steak")
      .get(".order")
      .eq(3)
      .find("li")
      .eq(2)
      .should("contain", "lettuce");
  });

  it("Should not be able to add an order without BOTH a name and at least one ingredient", () => {
    cy.visit("http://localhost:3000")
      .wait("@getRequest")
      .get(".submit-button")
      .should("be.disabled")
      .get("input")
      .type("Should not submit this burrito")
      .get(".submit-button")
      .should("be.disabled")
      .get("input")
      .clear()
      .get(".ingredients-button")
      .eq(11)
      .click()
      .get(".order-recap")
      .should("contain", "sour cream")
      .get(".submit-button")
      .should("be.disabled")
      .get("input")
      .type("Should be able to submit this burrito BUT DONT")
      .get(".submit-button")
      .should("be.enabled");
  });
});

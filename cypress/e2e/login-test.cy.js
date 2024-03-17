import "@testing-library/cypress/add-commands";

describe("login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get("[data-qa=login-tab]").click();
  });

  it("Logs in with correct credentials", () => {
    cy.get("#email")
      .should("have.attr", "placeholder", "Enter your email ID")
      .type("test675@gmail.com");
    cy.get("#password").type("Test@675");
    cy.get("[data-qa=showHidePassword]").click();
    cy.get("[data-qa=showHidePassword]").click();
    cy.get('[data-qa="RegisterLoginButton"]').should("be.visible");
    cy.get('[data-qa="RegisterLoginButton"]').should("contain.text", "Login");
    cy.get("form").submit();
    //cy.url().should("include", "/dashboard");
    // cy.get(".Toastify__toast-container")
    //   .find(".Toastify__toast--success")
    //   .should("be.visible");
    // cy.get(".Toastify__toast-container")
    //   .find(".Toastify__toast--success")
    //   .should("contain.text", "Logged in Successfully");
  });

  it("Logs in with invalid credentials", () => {
    cy.get("#email").type("kausi123@gmail.com");
    cy.get("#password").type("Test@675");
    cy.get('[data-qa="RegisterLoginButton"]').should("contain.text", "Login");
    cy.get("form").submit();
    // cy.find(".Toastify__toast--error").should(
    //   "contain.text",
    //   "User does not exist"
    // );
  });
});

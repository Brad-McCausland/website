describe("My first test", function()
{
    it("Clicks blog link", function ()
    {
        // Arrange - set up initial state. Visit a web page, select an element, etc.
        cy.visit("localhost:8000/");

        // Act - interact with element being tested. Modify, select, etc.
        cy.getCookie("BM_Language")
            .then((language) =>
            {
                if (language.value === "EN")
                {
                    cy.contains("my blog").click();
                }
                else if (language.value === "DE")
                {
                    cy.contains("meinen Lebenslauf").click();
                }
                else
                {
                    cy.expect(true).to.equal(false);
                }
            })

        // Assert - Assert that page content is correct given the actions taken
        cy.url().should("include", "/blog");
        cy.get(".under_construction_page");
        cy.get(".under_construction_title");
    });
});
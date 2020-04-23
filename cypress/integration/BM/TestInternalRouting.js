describe("Test internal Routing", function()
{
    it("Test homepage link from home page", function ()
    {
        cy.visit("localhost:8000/");

        // Verify homepage link works from homepage (links to self)
        cy.get(".name_in_header").click();
        cy.url().should("include", "http://localhost:8000/");
    });

    it("Test homepage link from blog page", function ()
    {
        cy.visit("localhost:8000/");

        // Navigate to blog page and verify homepage link navigates back to homepage
        cy.contains("my blog").click();
        cy.get(".name_in_header").click();
        cy.url().should("include", "http://localhost:8000/");
    });

    it("Test blog link", function ()
    {
        cy.visit("localhost:8000/");

        // Select blog link (English text only for now)
        cy.contains("my blog").click();

        // Verify correct url
        cy.url().should("include", "http://localhost:8000/blog");

        // Verify current page is 'Under Construction' page
        cy.get(".under_construction_page");
        cy.get(".under_construction_title");
    });

    it("Test travel link", function ()
    {
        // TODO: Fill out when travel page is ready to be developed
    });
});
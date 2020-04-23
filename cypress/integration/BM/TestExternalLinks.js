describe("Test External Links", function()
{
    it("Test email link (Do manually verify that the new window opened to the correct url.)", function ()
    {
        cy.visit("localhost:8000/");

        // Click envelope icon
        cy.get(".icon-envelope").click();

        // Verify manually
        expect(true).to.be.true;
    });

    it("Test github link (Do manually verify that the new window opened to the correct url.)", function ()
    {
        cy.visit("localhost:8000/");

        // Click github icon
        cy.get(".icon-github").click();

        // Verify manually
        expect(true).to.be.true;
    });

    it("Test linkedin link (Do manually verify that the new window opened to the correct url.)", function ()
    {
        cy.visit("localhost:8000/");

        // Click linkedin icon
        cy.get(".icon-linkedin").click();

        // Verify manually
        expect(true).to.be.true;
    });

    it("Test resume link (Do manually verify that the new window opened to the correct url.)", function ()
    {
        cy.visit("localhost:8000/");

        // Click 'my resume' text
        cy.contains("my resume").click();

        // Verify manually
        expect(true).to.be.true;
    });
});
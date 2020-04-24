describe("Test Subtitle Button Scrolling", function()
{
    it("Test clicking subtitle buttons scrolls to correct position (scroll amounts are approximate, please verify manually).", function()
    {
        // 591px is the approximate height of the hero image in the default cypress test window. Modify if this changes.
        const heroHeight = 591;

        // 600px is the current height of a body section
        const bodySectionHeight = 600;

        // Waiting for static amounts of time is considered bad practice. Replace if a better solution is found
        const scrollDuration = 1000;

        cy.visit("localhost:8000/");
        
        cy.contains("Educator").click();
        cy.wait(scrollDuration);
        cy.window().then(($window) =>
        {
            expect($window.scrollY).to.be.closeTo(heroHeight + bodySectionHeight, 20);
        });

        cy.contains("Traveller").click();
        cy.wait(scrollDuration);
        cy.window().then(($window) =>
        {
            expect($window.scrollY).to.be.closeTo(heroHeight + (2 * bodySectionHeight), 20);
        });

        cy.contains("Developer").click();
        cy.wait(scrollDuration);
        cy.window().then(($window) =>
        {
            expect($window.scrollY).to.be.closeTo(heroHeight, 20);
        });
    });
});
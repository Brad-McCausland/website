describe("Test Sliding Menu", function()
{
    it("Test clicking menu button opens menu", function ()
    {
        cy.visit("localhost:8000/");
        cy.get(".icon-menu").click();
        cy.get(".sliding_menu").should("be.visible");
    });

    it("Test clicking menu close button closes menu", function ()
    {
        cy.visit("localhost:8000/");
        cy.get(".icon-menu").click();
        cy.get(".sliding_menu").should("be.visible");

        cy.get(".icon_cross").then(($button) =>
        {
            $button.click();
            cy.get(".sliding_menu").should("not.be.visible");
        });
    });

    it("Test toggling dark mode sets dark mode cookie from false to true and true to false", function ()
    {
        cy.visit("localhost:8000/");
        cy.get(".icon-menu").click();

        cy.getCookie("BM_DarkMode")
            .then((cookie1) =>
            {
                cy.get(".toggle_outer_element").eq(0).click();
                cy.getCookie("BM_DarkMode")
                    .then((cookie2) =>
                    {
                        cy.get(".toggle_outer_element").eq(0).click();
                        cy.getCookie("BM_DarkMode")
                            .then((cookie3) =>
                            {
                                expect(cookie1.value).to.equal(cookie3.value);
                                if (cookie1.value === "false")
                                {
                                    expect(cookie2.value).to.equal("true");
                                }
                                else if (cookie1.value === "true")
                                {
                                    expect(cookie2.value).to.equal("false");
                                }
                                else
                                {
                                    expect(true).to.equal(false);
                                }
                            });
                    });
            });
    });

    // This test uses the .first() function to select the first toggle switch, which should be dark mode
    it("Test toggling language changes language cookie from EN to DE and DE to EN", function ()
    {
        cy.visit("localhost:8000/");
        cy.get(".icon-menu").click();

        cy.getCookie("BM_Language")
            .then((cookie1) =>
            {
                cy.get(".toggle_outer_element").eq(1).click();
                cy.getCookie("BM_Language")
                    .then((cookie2) =>
                    {
                        cy.get(".toggle_outer_element").eq(1).click();
                        cy.getCookie("BM_Language")
                            .then((cookie3) =>
                            {
                                expect(cookie1.value).to.equal(cookie3.value);
                                if (cookie1.value === "EN")
                                {
                                    expect(cookie2.value).to.equal("DE");
                                }
                                else if (cookie1.value === "DE")
                                {
                                    expect(cookie2.value).to.equal("EN");
                                }
                                else
                                {
                                    expect(true).to.equal(false);
                                }
                            });
                    });
            });
    });

    // Checks background color and src of first body 50/50 section to verify styles are changing as dark mode is toggled on and off
    it("Test toggling dark mode changes displayed images and colors", function ()
    {
        cy.visit("localhost:8000/");
        cy.get(".icon-menu").click();

        // Don't include file extension in img src to allow for hero_light.png and hero_light_placeholder.png
        cy.get(".body_image").first().should("have.attr", "src").should("include", "/src/images/portrait_light");
        cy.get(".BM_web_page").should("have.css", "background-color", "rgb(238, 238, 238)");
        
        cy.get(".toggle_outer_element").eq(0).click().then(() =>
        {
            cy.get(".body_image").first().should("have.attr", "src").should("include", "/src/images/portrait_dark");
            cy.get(".BM_web_page").should("have.css", "background-color", "rgb(1, 0, 17)");

            cy.get(".toggle_outer_element").eq(0).click().then(() =>
            {
                cy.get(".body_image").first().should("have.attr", "src").should("include", "/src/images/portrait_light");
                cy.get(".BM_web_page").should("have.css", "background-color", "rgb(238, 238, 238)");
            });
        });
    });

    it("Test toggling language changes displayed text", function ()
    {
        cy.visit("localhost:8000/");
        cy.get(".icon-menu").click();
        
        cy.get(".home_page").should("contain", "Travel");
        cy.get(".home_page").should("not.contain", "Reisen");
        
        cy.get(".toggle_outer_element").eq(1).click().then(() =>
        {
            cy.get(".home_page").should("not.contain", "Travel");
            cy.get(".home_page").should("contain", "Reisen");

            cy.get(".toggle_outer_element").eq(1).click().then(() =>
            {
                cy.get(".home_page").should("contain", "Travel");
                cy.get(".home_page").should("not.contain", "Reisen");
            });
        });
    });
});
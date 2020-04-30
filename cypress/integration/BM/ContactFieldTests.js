describe("Test Contact Form", function()
{
    it("Test clicking disabled button has no effect", function()
    {
        cy.visit("localhost:8000/");

        // Button should be disabled
        cy.get(".contact_widget").find(".submit_button").find(".submit_button_fill").should("have.css", "background-color", "rgb(170, 170, 170)");

        // Click button
        cy.get(".contact_widget").find(".submit_button").click();

        // Button should still be disabled
        cy.get(".contact_widget").find(".submit_button").find(".submit_button_fill").should("have.css", "background-color", "rgb(170, 170, 170)");
    });

    it("Test 'send' button only enabled whan all fields are filled", function()
    {
        cy.visit("localhost:8000/");

        cy.get(".contact_widget").find(".name_field").type("Name");
        cy.get(".contact_widget").find(".submit_button").find(".submit_button_fill").should("have.css", "background-color", "rgb(170, 170, 170)");
        cy.get(".contact_widget").find(".email_field").type("Test@email.com");
        cy.get(".contact_widget").find(".submit_button").find(".submit_button_fill").should("have.css", "background-color", "rgb(170, 170, 170)");
        cy.get(".contact_widget").find(".message_field").type("Message");
        cy.get(".contact_widget").find(".submit_button").find(".submit_button_fill").should("have.css", "background-color", "rgb(255, 160, 0)");
    });

    it("Test button is disabled after returning to unsendable state", function()
    {
        cy.visit("localhost:8000/");

        cy.get(".contact_widget").find(".name_field").type("Name");
        cy.get(".contact_widget").find(".email_field").type("Test@email.com");
        cy.get(".contact_widget").find(".message_field").type("Message");
        cy.get(".contact_widget").find(".submit_button").find(".submit_button_fill").should("have.css", "background-color", "rgb(255, 160, 0)");

        cy.get(".contact_widget").find(".message_field").clear();
        cy.get(".contact_widget").find(".submit_button").find(".submit_button_fill").should("have.css", "background-color", "rgb(170, 170, 170)");
        cy.get(".contact_widget").find(".message_field").type("Message");
        cy.get(".contact_widget").find(".submit_button").find(".submit_button_fill").should("have.css", "background-color", "rgb(255, 160, 0)");

        cy.get(".contact_widget").find(".email_field").clear();
        cy.get(".contact_widget").find(".submit_button").find(".submit_button_fill").should("have.css", "background-color", "rgb(170, 170, 170)");
        cy.get(".contact_widget").find(".email_field").type("Test@email.com");
        cy.get(".contact_widget").find(".submit_button").find(".submit_button_fill").should("have.css", "background-color", "rgb(255, 160, 0)");

        cy.get(".contact_widget").find(".name_field").clear();
        cy.get(".contact_widget").find(".submit_button").find(".submit_button_fill").should("have.css", "background-color", "rgb(170, 170, 170)");
        cy.get(".contact_widget").find(".name_field").type("Name");
        cy.get(".contact_widget").find(".submit_button").find(".submit_button_fill").should("have.css", "background-color", "rgb(255, 160, 0)");

    });

    // ContactWidget.tsx has code that switches onClick action when window.Cypress returns true. When run by Cypress, the widget should set the body field to 'Submit Button Clicked' instead of sending an email.
    it("Test button executes action when clicked", function()
    {
        cy.visit("localhost:8000/");

        cy.get(".contact_widget").find(".name_field").type("Name");
        cy.get(".contact_widget").find(".email_field").type("Test@email.com");
        cy.get(".contact_widget").find(".message_field").type("Message");
        cy.get(".contact_widget").find(".submit_button").click();

        cy.get(".contact_widget").find(".message_field").contains("Submit Button Clicked");
    });

    it("Test button text changes from send to sending when clicked, from sending to sent! on success, and from sent! back to send after a timeout", function()
    {
        cy.visit("localhost:8000/");

        cy.get(".contact_widget").find(".name_field").type("Name");
        cy.get(".contact_widget").find(".email_field").type("Test@email.com");
        cy.get(".contact_widget").find(".message_field").type("Message");

        cy.get(".contact_widget").find(".submit_button").find(".submit_button_text").should("have.text", "SEND");

        cy.get(".contact_widget").find(".submit_button").then(($button) =>
        {
            $button.click();
            cy.get(".contact_widget").find(".submit_button").find(".submit_button_text").should("have.text", "SENDING");
            cy.wait(3000);
            cy.get(".contact_widget").find(".submit_button").find(".submit_button_text").should("have.text", "SENT!");
            cy.wait(3000);
            cy.get(".contact_widget").find(".submit_button").find(".submit_button_text").should("have.text", "SEND");
        });
    });

    it("Test button's text changes when a failure is suffered", function()
    {
        cy.visit("localhost:8000/");

        cy.get(".contact_widget").find(".name_field").type("Plain Simple Garak");
        cy.get(".contact_widget").find(".email_field").type("Test@email.com");
        cy.get(".contact_widget").find(".message_field").type("I'm just a humble tailor.");

        cy.get(".contact_widget").find(".submit_button").find(".submit_button_text").should("have.text", "SEND");

        cy.get(".contact_widget").find(".submit_button").then(($button) =>
        {
            $button.click();
            cy.get(".contact_widget").find(".submit_button").find(".submit_button_text").should("have.text", "SENDING");
            cy.wait(3000);
            cy.get(".contact_widget").find(".submit_button").find(".submit_button_text").should("have.text", "FAILED");
            cy.wait(3000);
            cy.get(".contact_widget").find(".submit_button").find(".submit_button_text").should("have.text", "SEND");
        });
    });

    // Test cases stolen from https://gist.github.com/cjaoude/fd9910626629b53c4d25
    it("Test accepts only valid email addresses", function()
    {
        cy.visit("localhost:8000/");

        const validEmails =
        [
            "email@example.com",
            "firstname.lastname@example.com",
            "email@subdomain.example.com",
            "firstname+lastname@example.com",
            "email@123.123.123.123",
            "email@[123.123.123.123]",
            "\"email\"@example.com",
            "1234567890@example.com",
            "email@example-one.com",
            "_______@example.com",
            "email@example.name",
            "email@example.museum",
            "email@example.co.jp",
            "firstname-lastname@example.com"
        ];

        const invalidEmails = 
        [
            "plainaddress",
            "#@%^%#$@#$@#.com",
            "@example.com",
            "Joe Smith <email@example.com>",
            "email.example.com",
            "email@example@example.com",
            ".email@example.com",
            "email.@example.com",
            "あいうえお@example.com",
            "email@example.com (Joe Smith)",
            "email@example",
            "email@-example.com",
        ];

        cy.get(".contact_widget").find(".name_field").type("Name");
        cy.get(".contact_widget").find(".message_field").type("Message");

        for (let address of validEmails)
        {
            cy.get(".contact_widget").find(".email_field").clear();
            cy.get(".contact_widget").find(".email_field").type(address);
            cy.get(".contact_widget").find(".submit_button").find(".submit_button_fill").should("have.css", "background-color", "rgb(255, 160, 0)");
        }

        for (let address of invalidEmails)
        {
            cy.get(".contact_widget").find(".email_field").clear();
            cy.get(".contact_widget").find(".email_field").type(address);
            cy.get(".contact_widget").find(".submit_button").find(".submit_button_fill").should("have.css", "background-color", "rgb(170, 170, 170)");
        }
    });

    it("Test will disable button if valid email is made invalid", function()
    {
        cy.visit("localhost:8000/");

        cy.get(".contact_widget").find(".name_field").type("Name");
        cy.get(".contact_widget").find(".email_field").type("Test@example.com");
        cy.get(".contact_widget").find(".message_field").type("Message");
        cy.get(".contact_widget").find(".submit_button").find(".submit_button_fill").should("have.css", "background-color", "rgb(255, 160, 0)");
        
        cy.get(".contact_widget").find(".email_field").type("{backspace}{backspace}{backspace}");
        cy.get(".contact_widget").find(".submit_button").find(".submit_button_fill").should("have.css", "background-color", "rgb(170, 170, 170)");

        cy.get(".contact_widget").find(".email_field").type("com");
        cy.get(".contact_widget").find(".submit_button").find(".submit_button_fill").should("have.css", "background-color", "rgb(255, 160, 0)");
    });
});
import * as React from "react";
import { BMStyle } from "../BMStyle";
import "../styles/components/ContactWidget.less";

/// <reference path = "../../external_modules/cypress.d.ts" />
/*
 * A collection of elements that makes up the "contact me" section of the site. Includes title, input fields for name, email address, message, and submit button
 */

interface ContactWidgetProps
{
}

interface ContactWidgetState
{
    name: string,
    email: string,
    message: string,
    isSending: boolean,
}

export class ContactWidget extends React.Component<ContactWidgetProps, ContactWidgetState>
{
    constructor(props: ContactWidgetProps)
    {
        super(props);
        this.state = 
        {
            name: "",
            email: "",
            message: "",
            isSending: false,
        };
    }

    handleNameFieldChange(event: React.ChangeEvent<HTMLInputElement>)
    {
        this.setState({name: event.target.value});
    }

    handleEmailFieldChange(event: React.ChangeEvent<HTMLInputElement>)
    {
        this.setState({email: event.target.value});
    }

    handleMessageFieldChange(event: React.ChangeEvent<HTMLTextAreaElement>)
    {
        this.setState({message: event.target.value});
    }

    handleSubmitButtonClicked(event: React.MouseEvent<HTMLButtonElement, MouseEvent>)
    {
        event.preventDefault();
        if (window.Cypress)
        {
            this.setState({message: "Submit Button Clicked"});
            this.setState({isSending: true});
            setTimeout(() =>
            {
                this.setState({isSending: false});
            }, 2000);
        }
        else
        {
            this.sendMessage();
        }
    }

    sendMessage()
    {
        this.setState({isSending: true});
    
        // Send request to AWS service
        fetch(BMStyle.EBAliasUrl,
            {
                method: "POST",
                body: JSON.stringify(this.state),
                headers:
                {
                    "Accept": "text/plain",
                    "Content-Type": "text/plain"
                },
            })
            .then((response) =>
            {
                if (response.status == 200)
                {
                    //TODO: Replace alerts with more pleasing UI feedback
                    alert("Message sent successfully!");
                    this.resetForm();
                }
                else
                {
                    alert("Error: something went wrong with my mailer server. Email me the old-fashioned way (click the envelope in the top bar) and let me know what happened.");
                    this.setState({isSending: false});
                }
            })
            .catch(() =>
            {
                alert("Error: email server not reachable. Email me the old-fashioned way (click the envelope in the top bar) and let me know what happened.");
                this.setState({isSending: false});
            });
    }

    resetForm()
    {
        this.setState(
            {
                name: "",
                email: "",
                message: "",
                isSending: false,
            }
        );
    }

    messageIsSendable()
    {
        return this.state.name !== "" && this.isEmailValid() && this.state.message !== "" && !this.state.isSending;
    }

    isEmailValid()
    {
        const emailRegex = /^[\w"_][\w.+"_-]+[\w"_]@[\w\[\]][\w.\[\]-]+\.[\w\[\]]+$/;
        return emailRegex.test(this.state.email);
    }

    render()
    {
        const isSendable = this.messageIsSendable();
        return (
            <BMStyle.ThemeContext.Consumer>
                {theme => (
                    <BMStyle.LanguageContext.Consumer>
                        {language => (
                            <BMStyle.StateContext.Consumer>
                                {({IsMobileWidth}) => (
                                    <div
                                        className = "contact_widget"
                                        style = {{padding: IsMobileWidth? "100px 8px 150px" : "100px 24vw 150px"}}
                                    >
                                        <h1
                                            className = "contact_widget_header"
                                            style =
                                                {{
                                                    fontSize: IsMobileWidth? "15vw" : "64px",
                                                    color: theme.colors.UIMainColor,
                                                }}
                                        >
                                            {language.Contact} 
                                        </h1>

                                        <input
                                            className = "name_field"
                                            type = "text"
                                            placeholder = {language.Name}
                                            value = {this.state.name}
                                            onChange = {this.handleNameFieldChange.bind(this)}
                                            style =
                                                {{
                                                    color: theme.colors.ContactTextColor,
                                                    backgroundColor: theme.colors.ContactBackgroundColor,
                                                }}
                                        ></input>
                                        <input
                                            className = "email_field"
                                            type = "text"
                                            placeholder = {language.Email}
                                            value = {this.state.email}
                                            onChange = {this.handleEmailFieldChange.bind(this)}
                                            style =
                                                {{
                                                    color: theme.colors.ContactTextColor,
                                                    backgroundColor: theme.colors.ContactBackgroundColor,
                                                }}
                                        ></input>
                                        <textarea
                                            className = "message_field"
                                            placeholder = {language.YourMessage}
                                            value = {this.state.message}
                                            onChange = {this.handleMessageFieldChange.bind(this)}
                                            style =
                                                {{
                                                    color: theme.colors.ContactTextColor,
                                                    backgroundColor: theme.colors.ContactBackgroundColor,
                                                }}
                                        >
                                        </textarea>

                                        <button
                                            className = "submit_button"
                                            onClick = {isSendable? this.handleSubmitButtonClicked.bind(this) : (() =>
                                            {
                                                return null;
                                            })}
                                            style = 
                                                {{
                                                    width: IsMobileWidth? "100%" : "200px",
                                                    cursor: isSendable? "pointer" : "auto",
                                                    backgroundColor: this.state.isSending? theme.colors.UIButtonIndentedColor : (isSendable ? theme.colors.UIMainColor : theme.colors.UIDisabledColor),
                                                }}
                                        >
                                            {language.Send}
                                        </button>
                                    </div>
                                )}
                            </BMStyle.StateContext.Consumer>
                        )}
                    </BMStyle.LanguageContext.Consumer>
                )}
            </BMStyle.ThemeContext.Consumer>
        );
    }
}
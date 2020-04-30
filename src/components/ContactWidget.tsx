import * as React from "react";
import { BMStyle } from "../BMStyle";
import "../styles/components/ContactWidget.less";

/// <reference path = "../../external_modules/cypress.d.ts" />
/*
 * A collection of elements that makes up the "contact me" section of the site. Includes title, input fields for name, email address, message, and submit button
 */

enum MessageSendState
{
    ready,
    sending,
    recentlySent,
    recentlyFailed
}


interface ContactWidgetProps
{
}

interface ContactWidgetState
{
    name: string,
    email: string,
    message: string,
    sendState: MessageSendState,
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
            sendState: MessageSendState.ready,
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
        // Submitting the form with the correct strings fakes a failure. Useful for testing.
        if (this.state.name === "Plain Simple Garak" && this.state.message === "I'm just a humble tailor.")
        {
            this.mockFailure();
        }
        else if (window.Cypress)
        {
            this.setState({message: "Submit Button Clicked"});
            this.setState({sendState: MessageSendState.sending});
            setTimeout(() =>
            {
                this.setState({sendState: MessageSendState.recentlySent});
                this.resetStateAfterTimeout(3000);
            }, 2000);
        }
        else
        {
            this.sendMessage();
        }
    }

    mockFailure()
    {
        this.setState({sendState: MessageSendState.sending});
        setTimeout(() =>
        {
            this.setState({sendState: MessageSendState.recentlyFailed});
            this.resetStateAfterTimeout(3000);
        }, 2000);
    }

    sendMessage()
    {
        this.setState({sendState: MessageSendState.sending});
    
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
                    this.resetForm();
                    this.setState({sendState: MessageSendState.recentlySent});
                    this.resetStateAfterTimeout(3000);
                }
                else
                {
                    alert("Error: something went wrong with my mailer server. Email me the old-fashioned way (click the envelope in the top bar) and let me know what happened.");
                    this.setState({sendState: MessageSendState.recentlyFailed});
                    this.resetStateAfterTimeout(3000);
                }
            })
            .catch(() =>
            {
                alert("Error: email server not reachable. Email me the old-fashioned way (click the envelope in the top bar) and let me know what happened.");
                this.setState({sendState: MessageSendState.recentlyFailed});
                this.resetStateAfterTimeout(3000);
            });
    }

    // Needed as alternative to sendMessage() in inline conditional for send button
    nullFunction()
    {
        return null;
    }

    resetForm()
    {
        this.setState(
            {
                name: "",
                email: "",
                message: "",
            }
        );
    }

    resetStateAfterTimeout(timeout: number)
    {
        setTimeout(() =>
        {
            this.setState({sendState: MessageSendState.ready});
        }, timeout);
    }

    messageIsSendable()
    {
        return this.state.name !== "" && this.isEmailValid() && this.state.message !== "" && this.isReady();
    }

    isReady()
    {
        return this.state.sendState === MessageSendState.ready;
    }
    
    isSending()
    {
        return this.state.sendState === MessageSendState.sending;
    }
    
    hasRecentlySent()
    {
        return this.state.sendState === MessageSendState.recentlySent;
    }
    
    hasRecentlyFailed()
    {
        return this.state.sendState === MessageSendState.recentlyFailed;
    }


    isEmailValid()
    {
        const emailRegex = /^[\w"_][\w.+"_-]+[\w"_]@[\w\[\]][\w.\[\]-]+\.[\w\[\]]+$/;
        return emailRegex.test(this.state.email);
    }

    render()
    {
        const isSendable = this.messageIsSendable();
        const isReady = this.isReady();
        const isSending = this.isSending();
        const hasRecentlySent = this.hasRecentlySent();
        const hasRecentlyFailed = this.hasRecentlyFailed();

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
                                            onClick = {isSendable? this.handleSubmitButtonClicked.bind(this) : this.nullFunction}
                                            style =
                                                {{
                                                    width: IsMobileWidth? "100%" : "200px",
                                                    cursor: isSendable? "pointer" : "auto"
                                                }}
                                        >
                                            <span className = "submit_button_fill" style =
                                                {{
                                                    transition: "background-color 0.5s",
                                                    backgroundColor: 
                                                        isSending? theme.colors.UIButtonIndentedColor : 
                                                            hasRecentlySent? theme.colors.UIMainColor :
                                                                hasRecentlyFailed? theme.colors.UIFailedColor :
                                                                    isSendable ? theme.colors.UIMainColor : theme.colors.UIDisabledColor,
                                                }}>
                                            </span>
                                            <span className = "submit_button_load_bar" style =
                                                {{
                                                    backgroundColor: theme.colors.UIMainColor,
                                                    width: isSending || hasRecentlySent? "100%" : "0%",
                                                    transition: isReady || hasRecentlyFailed? "width 0s" : "width 3s",
                                                }}>
                                            </span>
                                            <span className = "submit_button_text">
                                                {
                                                    isReady? language.Send :
                                                        isSending? language.Sending :
                                                            hasRecentlySent? language.Sent :
                                                                hasRecentlyFailed? language.Failed : ""
                                                }
                                            </span>
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
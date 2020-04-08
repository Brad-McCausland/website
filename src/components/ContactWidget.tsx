import * as React from "react";
import { BMStyle } from '../BMStyle';

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
    isSendable: boolean,
    isSending: boolean,
    showTestButtonsClickCount: number,
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
            isSendable: false,
            isSending: false,
            showTestButtonsClickCount: 0,
        }
    }

    handleNameFieldChange(event: React.ChangeEvent<HTMLInputElement>)
    {
        this.setState(
        {
            name: event.target.value
        });
        this.checkIfSendable();
    }

    handleEmailFieldChange(event: React.ChangeEvent<HTMLInputElement>)
    {
        this.setState(
        {
            email: event.target.value
        });
        this.checkIfSendable();
    }

    handleMessageFieldChange(event: React.ChangeEvent<HTMLTextAreaElement>)
    {
        this.setState(
        {
            message: event.target.value
        });
        this.checkIfSendable();
    }

    handleSubmitButtonClicked(event: React.MouseEvent<HTMLButtonElement, MouseEvent>)
    {
        event.preventDefault();

        this.setState({isSending: true, isSendable: false})
    
        // Send request to AWS service
        fetch(BMStyle.EBMailServerUrl,
        {
            method: "POST",
            body: JSON.stringify(this.state),
            headers:
            {
                    'Accept': 'text/plain',
                    'Content-Type': 'text/plain'
            },
        })
        .then((response) =>
        {
            if (response.status == 200)
            {
                //TODO: Replace alerts with more pleasing UI feedback
                alert("Message sent successfully!");
                this.resetForm()
            }
            else
            {
                alert("Error: something went wrong with my mailer server. Email me the old-fashioned way (click the envelope in the top bar) and let me know what happened.");
                this.setState({isSending: false, isSendable: true})
            }
        })
        .catch(() =>
        {
            alert("Error: email server not reachable. Email me the old-fashioned way (click the envelope in the top bar) and let me know what happened.");
            this.setState({isSending: false, isSendable: true})
        })
    }

    // TODO: REMOVE TEST METHOD
    handleTestSubmitButtonClicked(event: React.MouseEvent<HTMLButtonElement, MouseEvent>)
    {
        event.preventDefault();

        this.setState({isSending: true,})
    
        // Send request to AWS service
        fetch(BMStyle.EBAliasUrl,
        {
            method: "POST",
            body: JSON.stringify(this.state),
            headers:
            {
                    'Accept': 'text/plain',
                    'Content-Type': 'text/plain'
            },
        })
        .then((response) =>
        {
            if (response.status == 200)
            {
                //TODO: Replace alerts with more pleasing UI feedback
                alert("Message sent successfully!");
                this.resetForm()
            }
            else
            {
                alert("Error: something went wrong with my mailer server. Email me the old-fashioned way (click the envelope in the top bar) and let me know what happened.");
            }
        })
        .catch(() =>
        {
            alert("Error: email server not reachable. Email me the old-fashioned way (click the envelope in the top bar) and let me know what happened.");
        })
    }

    resetForm()
    {
        this.setState(
            {
                name: "",
                email: "",
                message: "",
                isSendable: false,
                isSending: false,
            }
        )
    }

    checkIfSendable()
    {
        var isSendable = this.state.name !== "" && this.isEmailValid() && this.state.message !== "" && !this.state.isSending;
        this.setState(
            {
                isSendable: isSendable,
            }
        )
    }

    isEmailValid()
    {
        const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        return emailRegex.test(this.state.email);
    }

    render()
    {
        return (
            <BMStyle.ThemeContext.Consumer>
            {theme => (
                <BMStyle.LanguageContext.Consumer>
                {language => (
                    <BMStyle.StateContext.Consumer>
                    {({IsMobileWidth}) => (
                        <div
                            className = "contact_widget"
                            style = 
                            {{
                                padding: IsMobileWidth? "100px 8px 150px" : "100px 24vw 150px",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <h1
                                className = "contact_widget_header"
                                style =
                                {{
                                    margin: "20px",
                                    fontFamily: BMStyle.UITitleFont,
                                    fontSize: IsMobileWidth? "15vw" : "64px",
                                    color: theme.colors.UIMainColor,
                                    textAlign: "center",
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
                                    width: "100%",
                                    margin: "4px 0",
                                    padding: "12px 20px",
                                    fontSize: "24px",
                                    color: theme.colors.ContactTextColor,
                                    backgroundColor: theme.colors.ContactBackgroundColor,
                                    outlineWidth: "0px",
                                    border: "none",
                                    boxSizing: "border-box",
                                    fontFamily: BMStyle.UITextEntryFont,
                                    height: "60px"
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
                                    width: "100%",
                                    margin: "4px 0",
                                    padding: "12px 20px",
                                    fontSize: "24px",
                                    color: theme.colors.ContactTextColor,
                                    backgroundColor: theme.colors.ContactBackgroundColor,
                                    outlineWidth: "0px",
                                    border: "none",
                                    boxSizing: "border-box",
                                    fontFamily: BMStyle.UITextEntryFont,
                                    height: "60px"
                                }}
                            ></input>
                            <textarea
                                className = "message_field"
                                placeholder = {language.YourMessage}
                                value = {this.state.message}
                                onChange = {this.handleMessageFieldChange.bind(this)}
                                style =
                                {{
                                    width: "100%",
                                    margin: "4px 0",
                                    padding: "12px 20px",
                                    fontSize: "24px",
                                    color: theme.colors.ContactTextColor,
                                    backgroundColor: theme.colors.ContactBackgroundColor,
                                    outlineWidth: "0px",
                                    border: "none",
                                    boxSizing: "border-box",
                                    fontFamily: BMStyle.UITextEntryFont,
                                    height: "250px",
                                    resize: "none",
                                }}
                            >
                            </textarea>

                            <button
                                className = "submit_button"
                                onClick = {this.state.isSendable? this.handleSubmitButtonClicked.bind(this) : (() => {this.setState({showTestButtonsClickCount: this.state.showTestButtonsClickCount + 1})})}
                                style = 
                                {{
                                    width: IsMobileWidth? "100%" : "200px",
                                    height: "64px",
                                    marginTop: "4px",
                                    marginLeft: "auto",
                                    marginRight: "0",
                                    display: "block",
                                    padding: "4px",
                                    border: "none",
                                    outlineWidth: "0px",
                                    fontSize: "36px",
                                    fontFamily: BMStyle.UITitleFont,
                                    color: "white",
                                    cursor: this.state.isSendable? "pointer" : "auto",
                                    backgroundColor: this.state.isSendable? (this.state.isSending? theme.colors.UIButtonIndentedColor : theme.colors.UIMainColor) : theme.colors.UIDisabledColor,
                                }}
                            >
                                {language.Submit}
                            </button>

                            <button
                                className = "test submit button"
                                onClick = {this.state.isSendable? this.handleTestSubmitButtonClicked.bind(this) : (() => {return null})}
                                style = 
                                {{
                                    display: this.state.showTestButtonsClickCount > 2? "block" : "none",
                                }}
                            >
                                Send message to alias
                            </button>
                        </div>
                    )}
                    </BMStyle.StateContext.Consumer>
                )}
                </BMStyle.LanguageContext.Consumer>
            )}
            </BMStyle.ThemeContext.Consumer>
        )
    }
}
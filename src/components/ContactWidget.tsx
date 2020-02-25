import * as React from "react";
import { BMInput } from './BMInput';
import { BMStyle } from '../BMStyle';

/*
 * A collection of elements that makes up the "contact me" section of the site. Includes title, input fields for name, email address, message, and submit button
 */

interface ContactWidgetProps
{
    isMobileWidth: boolean,
}

interface ContactWidgetState
{
    name: string,
    email: string,
    message: string,
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
        }
    }

    
    // Collection of styles used in each input field. Height and resize properties will need to be added for each individual element to complete the styling
    static inputFieldStyle = 
    {
        width: "100%",
        margin: "4px 0",
        padding: "12px 20px",
        fontSize: "24px",
        color: "#090909",
        backgroundColor: "#dddddd",
        outlineWidth: "0px",
        border: "none",
        boxSizing: "border-box",
    } as React.CSSProperties;

    handleNameFieldChange(event: React.ChangeEvent<HTMLInputElement>)
    {
        this.setState(
        {
            name: event.target.value
        });
    }

    handleEmailFieldChange(event: React.ChangeEvent<HTMLInputElement>)
    {
        this.setState(
        {
            email: event.target.value
        });
    }

    handleMessageFieldChange(event: React.ChangeEvent<HTMLTextAreaElement>)
    {
        this.setState(
        {
            message: event.target.value
        });
    }

    handleSubmitButtonClicked(event: React.MouseEvent<HTMLButtonElement, MouseEvent>)
    {
        event.preventDefault();
    
        fetch('http://localhost:3002/send',
        {
            method: "POST",
            body: JSON.stringify(this.state),
            headers:
            {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
            },
        })
        .then((response) => (response.json()))
        .then((response) =>
        {
            if (response.status === 'success'){
                alert("Message Sent."); 
                this.resetForm()
            }else if(response.status === 'fail'){
                alert("Message failed to send.")
            }
        })
        .catch(() =>
        {
            alert("Error: email server not reachable.")
        })
    }

    resetForm()
    {
        this.setState(
            {
                name: "",
                email: "",
                message: "",
            }
        )
    }

    checkIfSendable()
    {
        var isSendable = this.state.name !== "" && this.isEmailValid() && this.state.message !== "";
        return isSendable;
    }

    isEmailValid()
    {
        const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        return emailRegex.test(this.state.email);
    }

    render()
    {
        var isSendable = this.checkIfSendable();

        return (
            <div
                className = "contact_widget"
                style = 
                {{
                    margin: this.props.isMobileWidth? "100px 8px" : "100px 24vw",
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
                        fontSize: this.props.isMobileWidth? "15vw" : "64px",
                        color: BMStyle.UIMainColor,
                        textAlign: "center",
                    }}
                >
                    CONTACT
                </h1>

                <input
                    className = "name_field"
                    type = "text"
                    placeholder = "Name"
                    value = {this.state.name}
                    onChange = {this.handleNameFieldChange.bind(this)}
                    style = {Object.assign({}, ContactWidget.inputFieldStyle, {height: "60px"})}
                ></input>
                <input
                    className = "email_field"
                    type = "text"
                    placeholder = "Email"
                    value = {this.state.email}
                    onChange = {this.handleEmailFieldChange.bind(this)}
                    style = {Object.assign({}, ContactWidget.inputFieldStyle, {height: "60px"})}
                ></input>
                <textarea
                    className = "message_field"
                    placeholder = "Your Message"
                    value = {this.state.message}
                    onChange = {this.handleMessageFieldChange.bind(this)}
                    style = {Object.assign({}, ContactWidget.inputFieldStyle, {height: "250px", resize: "none"})}
                >
                </textarea>

                <button
                    className = "submit_button"
                    onClick = {isSendable? this.handleSubmitButtonClicked.bind(this) : (() => {return null})}
                    style = 
                    {{
                        width: this.props.isMobileWidth? "100%" : "200px",
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
                        cursor: isSendable? "pointer" : "auto",
                        backgroundColor: isSendable? BMStyle.UIMainColor : BMStyle.UIDisabledColor,
                    }}
                >
                    SUBMIT
                </button>
            </div>
        )
    }
}
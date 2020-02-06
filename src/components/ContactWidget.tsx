import * as React from "react";
import { BMInput } from './BMInput';

/*
 * A collection of elements that makes up the "contact me" section of the site. Includes title, input fields for name, email address, message, and submit button
 */

interface ContactWidgetProps
{
}

interface ContactWidgetState
{
}

export class ContactWidget extends React.Component<ContactWidgetProps, ContactWidgetState>
{
    constructor(props: ContactWidgetProps)
    {
        super(props);
    }

    render()
    {
        return (
            <div
                className = "contact_widget"
            >
                <h1
                    className = "contact_widget_header"
                    style =
                    {{
                        margin: "20px",
                        fontFamily: "Raleway",
                        fontSize: "64px",
                        color: "#ffa000",
                        textAlign: "center",
                    }}
                >
                    CONTACT
                </h1>

                <BMInput className = "name_field"  type = "text" height = "36px" placeholderText = "Name"></BMInput>
                <BMInput className = "email_field" type = "text" height = "36px" placeholderText = "Email"></BMInput>
                <textarea
                    className = "message_field"
                    placeholder = "Your Message"
                    style =
                    {{
                        width: "calc(100% - 40vw)",
                        height: "250px",
                        margin: "4px 20vw",
                        padding: "12px 20px",
                        fontSize: "24px",
                        color: "#090909",
                        backgroundColor: "#dddddd",
                        outlineWidth: "0px",
                        border: "none",
                        resize: "none",
                    }}
                >
                </textarea>
                <button
                    className = "submit_button"
                    style = 
                    {{
                        width: "200px",
                        height: "48px",
                        margin: "4px 20vw",
                        padding: "0px",
                        fontSize: "40px",
                        fontFamily: "Raleway",
                        border: "none",
                        color: "white",
                        backgroundColor: "#ffa000",
                    }}
                >
                    SUBMIT
                </button>
            </div>
        )
    }
}
import * as React from "react";

/*
 * Returns an <input> element with appropriate styling
 */

interface BMInputProps
{
    className: string
    type: string
    height: string
    placeholderText: string
}

interface BMInputState
{
}

export class BMInput extends React.Component<BMInputProps, BMInputState>
{
    constructor(props: BMInputProps)
    {
        super(props);
    }

    render()
    {
        return (
            <input
                className = {this.props.className}
                type = {this.props.type}
                placeholder = {this.props.placeholderText}
                style =
                {{
                    width: "100%",
                    height: this.props.height,
                    margin: "4px 0",
                    padding: "12px 20px",
                    fontSize: "24px",
                    color: "#090909",
                    backgroundColor: "#dddddd",
                    outlineWidth: "0px",
                    border: "none",
                    boxSizing: "border-box",
                }}
            >
            </input>
        )
    }
}
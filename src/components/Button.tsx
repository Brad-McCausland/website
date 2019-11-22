import * as React from "react";

interface ButtonProps
{
    value: string,
    onClick: () => void,
}

interface ButtonState
{
}

export class Button extends React.Component<ButtonProps, ButtonState>
{
    constructor(props: ButtonProps)
    {
        super(props);
    }

    render ()
    {
        return (
            <button
                className="reset_button"
                onClick={this.props.onClick}
            >
                {this.props.value}
            </button>
        )
    }
}
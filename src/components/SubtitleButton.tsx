import * as React from "react";

interface SubtitleButtonProps
{
    text: string,
    className?: string,
    style?: React.CSSProperties,
    onClick?: () => void,
}

interface SubtitleButtonState
{
}

export class SubtitleButton extends React.Component<SubtitleButtonProps, SubtitleButtonState>
{
    constructor(props: SubtitleButtonProps)
    {
        super(props);
    }

    render ()
    {
        const style = this.props.style

        console.log(this.props.text);
        return (
            <h1
                style = {{
                    color: 'white',
                    fontSize: '2vw',
                    fontFamily: 'Raleway',
                    textAlign: 'center',
                    display: 'inline',
                    marginLeft: '1.5vw',
                    marginRight: '1.5vw'
                }}
                className = {this.props.className || "SubtitleButton"}
                onClick = {this.props.onClick}
            >
                {this.props.text}
            </h1>
        )
    }
}
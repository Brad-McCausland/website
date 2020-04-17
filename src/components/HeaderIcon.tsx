import * as React from "react";
import "../styles/HeaderIcon.less";

/*
 * Returns a span object containing a single glyph from the icons font. The icon is determined by the class name, as specified in index.css.
 * Can be given an optional onClick prop, which takes a callback. Instances with callbacks will have their cursor style set to display a pointer when hovered.
 */

interface HeaderIconProps
{
    className: string,
    onClick?: (() => void),
}

interface HeaderIconState
{
}

export class HeaderIcon extends React.Component<HeaderIconProps, HeaderIconState>
{
    constructor(props: HeaderIconProps)
    {
        super(props);
    }

    render ()
    {
        return (
            <span
                className = {this.props.className}
                style = {{cursor: this.props.onClick? "pointer" : "auto"}}
                onClick = {this.props.onClick || (() =>
                {
                    return null;
                })}
            />
        );
    }
}
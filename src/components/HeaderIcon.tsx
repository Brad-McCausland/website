import * as React from "react";
import { BMStyle } from '../BMStyle';

/*
 * Returns a span object containing a single glypg from the icons font. The icon is determined by the class name, as specified in index.css
 */

interface HeaderIconProps
{
    className: string,
    style?: React.CSSProperties,
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
                style = 
                {{
                    alignItems: "center",
                    color: "#ffffff",
                    fontSize: "40px",
                    fontFamily: BMStyle.UIIconFont,
                    marginLeft: "5px",
                    marginRight: "5px",
                }}>
            </span>
        )
    }
}
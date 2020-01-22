import * as React from "react";
import { Gradient } from "./Gradient";
import { HeaderIcon } from "./HeaderIcon";

/*
 * Header object which contains menu and link buttons. When above the fold, will display a black gradient as a background. When below, will switch to an orange background and display my name as well.
 */

interface HeaderProps
{
    style?: React.CSSProperties,
}

interface HeaderState
{
}

export class Header extends React.Component<HeaderProps, HeaderState>
{
    constructor(props: HeaderProps)
    {
        super(props);
    }

    render ()
    {
        return (
            <div className = "header" style = {this.props.style}>
                <Gradient></Gradient>

                <div 
                    className = "left_buttons"
                    style = 
                    {{
                        marginTop: "26px",
                        marginLeft: "160px",
                        marginRight: "auto",
                        flexDirection: "row",
                        zIndex: 1,
                    }}
                >
                    <HeaderIcon className = "icon-menu"></HeaderIcon>
                </div>

                <div 
                    className = "right_buttons"
                    style = 
                    {{
                        marginTop: "26px",
                        marginLeft: "auto",
                        marginRight: "160px",
                        flexDirection: "row",
                        zIndex: 1,
                    }}
                >
                    <HeaderIcon className = "icon-envelope"></HeaderIcon>
                    <HeaderIcon className = "icon-github"></HeaderIcon>
                    <HeaderIcon className = "icon-linkedin"></HeaderIcon>
                </div>
            </div>
        )
    }
}
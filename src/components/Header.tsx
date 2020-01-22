import * as React from "react";
import { Gradient } from "./Gradient";

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
                <span className="icon-github" style = {{height: "100%", position: "absolute", justifyContent: "center", alignItems: "center", display: "flex"}}></span>
            </div>
        )
    }
}
import * as React from "react";
import { Gradient } from "./Gradient";

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
            <div className = "header" style = {{minHeight: this.props.style?.minHeight}}>
                <Gradient></Gradient>
                <span className="icon-github" style = {{position: "absolute", display: "flex", minHeight: "100px"}}></span>
            </div>
        )
    }
}
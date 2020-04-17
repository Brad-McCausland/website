import * as React from "react";
import "../styles/Gradient.less";

/*
 * Returns en empty div styled to fill it's parent with a black -> alpha gradient from top to bottom.
 */

interface GradientProps
{
    style?: React.CSSProperties,
}

interface GradientState
{
}

export class Gradient extends React.Component<GradientProps, GradientState>
{
    constructor(props: GradientProps)
    {
        super(props);
    }

    render ()
    {
        return (<div className = "gradient"/>);
    }
}
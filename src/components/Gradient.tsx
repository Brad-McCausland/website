import * as React from "react";

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
        return (
            <div
                className = "gradient"
                style =
                {{
                    height: "100%",
                    width: "100%",
                    position: "absolute",
                    background: "linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%, rgba(0,0,0,0) 100%)",
                }}
            >
            </div>
        )
    }
}
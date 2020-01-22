import * as React from "react";

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
                    boxSizing: "border-box",
                    bottom: "100px",
                    width: "100%",
                    flex: "1",
                    position: "absolute",
                    background: "linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%, rgba(0,0,0,0) 100%)",
                }}
            >
            </div>
        )
    }
}
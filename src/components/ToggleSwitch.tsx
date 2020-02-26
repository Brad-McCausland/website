import * as React from "react";
import { BMStyle } from '../BMStyle';

/*
 * Custom toggle switch element
 */

interface ToggleSwitchProps
{
    width: number,
    height: number,
    toggleAction?: () => void,
}

interface ToggleSwitchState
{
    toggled: boolean,
}

export class ToggleSwitch extends React.Component<ToggleSwitchProps, ToggleSwitchState>
{
    constructor(props: ToggleSwitchProps)
    {
        super(props);
        this.state = 
        {
            toggled: false,
        }
    }

    toggle()
    {
        this.setState(
            {
                toggled: !this.state.toggled,
            }
        )
    }

    render ()
    {
        let minDimension = Math.min(this.props.width, this.props.height);
        let margin = 4;
        return (
            <div
                className = "toggle_outer_element"
                onClick = {this.toggle.bind(this)}
                style = 
                {{
                    width: this.props.width + "px",
                    height: this.props.height + "px",
                    borderRadius: minDimension/2 + "px",
                    backgroundColor: this.state.toggled? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.2)",
                }}
            >
                <div
                    className = "toggle_inner_element"
                    style = 
                    {{
                        // TODO: How to set width to parent's or (self's) height to create a squared element dynamically???
                        width: (minDimension - (2 * margin)) + "px",
                        height: (minDimension - (2 * margin)) + "px",
                        borderRadius: "20px",
                        margin: margin + "px",
                        float: this.state.toggled? "right" : "left",
                        backgroundColor: BMStyle.UIMainColor,
                        boxSizing: "content-box",
                        position: "relative",
                    }}
                >
                </div>
            </div>
        )
    }
}
import * as React from "react";
import { BMStyle } from '../BMStyle';

/*
 * Custom toggle switch element
 */

interface ToggleSwitchProps
{
    width: number,
    height: number,
    toggleAction?: (isToggled: boolean) => void,
}

interface ToggleSwitchState
{
    isToggled: boolean,
}

export class ToggleSwitch extends React.Component<ToggleSwitchProps, ToggleSwitchState>
{
    constructor(props: ToggleSwitchProps)
    {
        super(props);
        this.state = 
        {
            isToggled: false,
        }
    }

    toggle()
    {
        this.setState(
            {
                isToggled: !this.state.isToggled,
            },
            
            // Perform the toggle action only after state has been updated
            () => {
                if (this.props.toggleAction)
                {
                    this.props.toggleAction(this.state.isToggled);
                }
            }
        )
    }

    render ()
    {
        let margin = 4;
        let minDimension = Math.min(this.props.width, this.props.height);
        let sliderRadius = minDimension - (2 * margin);
        let inverseMargin = this.props.width - margin;
        return (
            <div
                className = "toggle_outer_element"
                onClick = {this.toggle.bind(this)}
                style = 
                {{
                    width: this.props.width + "px",
                    height: this.props.height + "px",
                    borderRadius: minDimension + "px",
                    backgroundColor: this.state.isToggled? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.2)",
                    position: "relative",
                    transition: "background-color 0.3s",
                }}
            >
                <div
                    className = "toggle_inner_element"
                    style = 
                    {{
                        position: "absolute",
                        top: `0`,
                        bottom: `0`,
                        right: "auto",
                        left: this.state.isToggled? `${inverseMargin - sliderRadius}px` : `${margin}px`,
                        width: `${sliderRadius}px`,
                        height: `${sliderRadius}px`,
                        transition: "left 0.3s",
                        borderRadius: `${sliderRadius}px`,
                        margin: "auto",
                        backgroundColor: BMStyle.sharedInstance.colors().UIMainColor,
                    }}
                >
                </div>
            </div>
        )
    }
}
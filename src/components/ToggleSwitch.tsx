import * as React from "react";
import { BMStyle } from "../BMStyle";
import "../styles/components/ToggleSwitch.less";

/*
 * Custom toggle switch element
 */

interface ToggleSwitchProps
{
    width: number,
    height: number,
    isToggled: boolean
    toggleAction?: (isToggled: boolean) => void,
    toggledOffText?: string,
    toggledOnText?: string,
}

interface ToggleSwitchState
{
}

export class ToggleSwitch extends React.Component<ToggleSwitchProps, ToggleSwitchState>
{
    constructor(props: ToggleSwitchProps)
    {
        super(props);
    }

    toggle()
    {
        if (this.props.toggleAction)
        {
            this.props.toggleAction(!this.props.isToggled);
        }
    }

    render ()
    {
        let margin = 4;
        let minDimension = Math.min(this.props.width, this.props.height);
        let sliderRadius = minDimension - (2 * margin);
        let inverseMargin = this.props.width - margin;
        
        return (
            <BMStyle.ThemeContext.Consumer>
                {theme => (
                    <div
                        className = "toggle_outer_element"
                        onClick = {this.toggle.bind(this)}
                        style = 
                            {{
                                width: `${this.props.width}px`,
                                height: `${this.props.height}px`,
                                borderRadius: `${minDimension}px`,
                                backgroundColor: this.props.isToggled? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.2)",
                            }}
                    >
                        <text className = "text_toggled_on">
                            {this.props.toggledOnText}
                        </text>
                        <text className = "text_toggled_off">
                            {this.props.toggledOffText}
                        </text>
                        <div
                            className = "toggle_inner_element"
                            style = 
                                {{
                                    left: this.props.isToggled? `${inverseMargin - sliderRadius}px` : `${margin}px`,
                                    width: `${sliderRadius}px`,
                                    height: `${sliderRadius}px`,
                                    borderRadius: `${sliderRadius}px`,
                                    backgroundColor: theme.colors.UIMainColor,
                                }}
                        >
                        </div>
                    </div>
                )}
            </BMStyle.ThemeContext.Consumer>
        );
    }
}
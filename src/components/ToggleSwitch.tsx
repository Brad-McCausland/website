import * as React from "react";
import { BMStyle } from '../BMStyle';

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
                            position: "relative",
                            transition: "background-color 0.3s",
                        }}
                    >
                        <text
                            className = "toggled_on_text"
                            style = 
                            {{
                                height: "100%",
                                fontSize: "125%",
                                color: "white",
                                paddingLeft: "9px",
                                float: "left",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                userSelect: "none",
                            }}
                        >
                            {this.props.toggledOnText}
                        </text>
                        <text
                            className = "toggled_off_text"
                            style = 
                            {{
                                height: "100%",
                                fontSize: "125%",
                                color: "white",
                                paddingRight: "9px",
                                float: "right",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                userSelect: "none",
                            }}
                        >
                            {this.props.toggledOffText}
                        </text>
                        <div
                            className = "toggle_inner_element"
                            style = 
                            {{
                                position: "absolute",
                                top: `0`,
                                bottom: `0`,
                                right: "auto",
                                left: this.props.isToggled? `${inverseMargin - sliderRadius}px` : `${margin}px`,
                                width: `${sliderRadius}px`,
                                height: `${sliderRadius}px`,
                                transition: "left 0.3s",
                                borderRadius: `${sliderRadius}px`,
                                margin: "auto",
                                backgroundColor: theme.colors.UIMainColor,
                            }}
                        >
                        </div>
                    </div>
                )}
            </BMStyle.ThemeContext.Consumer>
        )
    }
}
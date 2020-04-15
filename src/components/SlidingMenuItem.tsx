import * as React from "react";
import { BMStyle } from "../BMStyle";

/*
 * Parent class for different elements that can be displayed in the slide out menu.
 */

interface SlidingMenuItemProps
{
    text: string,
    textClickableLink?: string,
    controller?: React.Component,
}

interface SlidingMenuItemState
{
}

export class SlidingMenuItem extends React.Component<SlidingMenuItemProps, SlidingMenuItemState>
{
    constructor(props: SlidingMenuItemProps)
    {
        super(props);
    }

    render()
    {
        return (
            <div
                className = "menu_item"
                style = 
                {{
                    width: "100%",
                    height: BMStyle.MenuItemHeightString,
                    alignItems: "center",
                }}>
                <text
                    className = "menu_item_text"
                    style = 
                    {{
                        flex: "1",
                        height: "100%",
                        fontSize: "28px",
                        color: "white",
                        paddingLeft: "16px",
                        float: "left",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    {this.props.text}
                </text>
                <div
                    className = "menu_item_controller"
                    style =
                    {{
                        flex: "1",
                        height: "100%",
                        paddingRight: "16px",
                        float: "right",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    {this.props.children}
                </div>
            </div>
        )
    }
}
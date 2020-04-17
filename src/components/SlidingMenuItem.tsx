import * as React from "react";
import { BMStyle } from "../BMStyle";
import "../css/SlidingMenuItem.less";

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
            <div className = "sliding_menu_item">
                <text className = "menu_item_text">
                    {this.props.text}
                </text>
                <div className = "menu_item_controller">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
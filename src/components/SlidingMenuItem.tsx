import * as React from "react";
import { BMStyle } from '../BMStyle';
import { HeaderIcon } from "./HeaderIcon";

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
            <div>
                {this.props.children}
            </div>
        )
    }
}
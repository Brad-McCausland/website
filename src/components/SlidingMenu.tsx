import * as React from "react";
import { BMStyle } from '../BMStyle';
import { HeaderIcon } from "./HeaderIcon";

/*
 * Returns a drop down menu which contains language and display options. Controllers are passed to the menu object as menuItems, a dictionary of arbitrary length which pair the text to be displayed
 * with the controller (such as a toggle button). The controller object will need to have it's onClick method determined in the context which creates the menu.
 */

interface SlidingMenuProps
{
    menuItems: {},
}

interface SlidingMenuState
{
    isExtended: boolean,
}

export class SlidingMenu extends React.Component<SlidingMenuProps, SlidingMenuState>
{
    constructor(props: SlidingMenuProps)
    {
        super(props);
        this.state = 
        {
            isExtended: false
        }
    }

    toggleMenuIsExtended()
    {
        this.setState(
        {
            isExtended: !this.state.isExtended
        })
    }

    render()
    {
        return (
            <div
                className = "drop_down_menu"
                style = 
                {{
                    position: "absolute",
                    width: "100px",
                    height: "100vh",
                    left: this.state.isExtended ? "0px" : "-100px",
                    transition: "left 1s",
                    backgroundColor: BMStyle.UIMainColor,
                }}
            >
            </div>
        )
    }
}
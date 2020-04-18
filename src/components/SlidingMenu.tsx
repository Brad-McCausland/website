import * as React from "react";
import { BMStyle } from "../BMStyle";
import "../styles/components/SlidingMenu.less";

/*
 * Returns a drop down menu which contains language and display options. Controllers are passed to the menu object as menuItems, a dictionary of arbitrary length which pair the text to be displayed
 * with the controller (such as a toggle button). The controller object will need to have it's onClick method determined in the context which creates the menu.
 */

interface SlidingMenuProps
{
    menuItems?: {},
    crossButtonAction: () => void,
    isExtended: boolean,
    isAboveFold: boolean,
}

interface SlidingMenuState
{
}

export class SlidingMenu extends React.Component<SlidingMenuProps, SlidingMenuState>
{
    constructor(props: SlidingMenuProps)
    {
        super(props);
        this.state = 
        {
            isExtended: false
        };
    }

    render()
    {
        //var isFirefox = navigator.userAgent.indexOf("Firefox") !== -1;
        //console.log("Is firefox: ", isFirefox);
        //console.log("Is extended: ", this.props.isExtended);

        return (
            <BMStyle.ThemeContext.Consumer>
                {theme => (
                    <div
                        className = "sliding_menu"
                        style = 
                            {{
                                backgroundColor: theme.colors.UIDarkColor,
                                zIndex: this.props.isAboveFold ? 1 : 4,
                                top: this.props.isAboveFold ? BMStyle.HeaderHeight : "0px",
                                left: this.props.isExtended ? "0px" : /*(isFirefox? "-moz-calc(-300px -12vw)" : "min(-300px, -12vw)")*/ "-300px",
                            }}
                    >
                        <div className = "menu_header">
                            <span className = "icon_cross" onClick = {this.props.crossButtonAction}/>
                        </div>
                        {this.props.children}
                    </div>
                )}
            </BMStyle.ThemeContext.Consumer>
        );
    }
}
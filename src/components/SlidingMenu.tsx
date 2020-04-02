import * as React from "react";
import { BMStyle } from '../BMStyle';

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
        }
    }

    render()
    {
        //var isFirefox = navigator.userAgent.indexOf("Firefox") !== -1;
        //console.log("Is firefox: ", isFirefox);
        //console.log("Is extended: ", this.props.isExtended);

        return (
            <BMStyle.ThemeContext.Consumer>
            {theme => (
                <BMStyle.StateContext.Consumer>
                {({IsMobileWidth}) => (
                    <div
                        className = "sliding_menu"
                        style = 
                        {{
                            position: "absolute",
                            //width: "12vw",
                            minWidth: "300px",
                            height: "100vh",
                            top: this.props.isAboveFold ? BMStyle.HeaderHeight : "0px",
                            left: this.props.isExtended ? "0px" : /*(isFirefox? "-moz-calc(-300px -12vw)" : "min(-300px, -12vw)")*/ "-300px",
                            transition: "left 1s" + ", " + `top ${BMStyle.HeaderSlideTransitionTime}`,
                            backgroundColor: theme.colors.UIDarkColor,
                            zIndex: this.props.isAboveFold ? 1 : 4,
                        }}
                    >
                        <div
                            className = "menu_header"
                            style = 
                            {{
                                width: "100%",
                                height: BMStyle.HeaderHeight,
                            }}
                        >
                            <span
                                className = "icon-cross"
                                onClick = {this.props.crossButtonAction}
                                style = 
                                {{
                                    textAlign: "center",
                                    color: "#ffffff",
                                    height: "20px",
                                    fontSize: "20px",
                                    fontFamily: BMStyle.UIIconFont,
                                    padding: "25px",
                                    float: "right",
                                    cursor: "pointer",
                                }}
                            >
                            </span>
                        </div>
                        {this.props.children}
                    </div>
                )}
                </BMStyle.StateContext.Consumer>
            )}
            </BMStyle.ThemeContext.Consumer>
        )
    }
}
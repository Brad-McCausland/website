import * as React from "react";
import { HeaderIcon } from "./HeaderIcon";
import { BMStyle } from '../BMStyle';

/*
 * Footer object which contains copyright info and link buttons.
 */

interface FooterProps
{
}

interface FooterState
{
}

export class Footer extends React.Component<FooterProps, FooterState>
{
    constructor(props: FooterProps)
    {
        super(props);
    }

    render ()
    {
        const Footer_ICON_MARGIN = "10px"; //10px = ((Footer height (70) - text element height (40)) / 2) - icon margin (5) Replace with calculated value

        return (
            <BMStyle.ThemeContext.Consumer>
            {theme => (
                <BMStyle.StateContext.Consumer>
                {({IsMobileWidth}) => (
                    <div className = "Footer" style =
                    {{
                        position: "relative",
                        bottom: BMStyle.HeaderHeightString,
                        width: "100%",
                        height: BMStyle.HeaderHeightString,
                        display: "flex",
                        zIndex: 3,
                        alignItems: "center",
                        backgroundColor: theme.colors.UIMainColor,
                    }}>
                        <div 
                            className = "left_justified_elements"
                            style = 
                            {{
                                marginLeft: IsMobileWidth? Footer_ICON_MARGIN : "8.3333vw",
                                marginRight: "auto",
                                flexDirection: "row",
                            }}
                        >
                            <h1 
                                className = "name_in_Footer"
                                style =
                                {{
                                    color: "white",
                                    fontSize: "24px",
                                    fontFamily: BMStyle.UITitleFont,
                                    display: IsMobileWidth? "none" : "inline",
                                    margin: "5px",
                                    transition: "opacity 0.7s",
                                }}
                            >
                                Brad McCausland ©2020
                            </h1>
                        </div>

                        <div 
                            className = "right_justified_elements"
                            style = 
                            {{
                                marginLeft: "auto",
                                marginRight: IsMobileWidth? Footer_ICON_MARGIN : "8.3333vw",
                                flexDirection: "row",
                            }}
                        >
                            <HeaderIcon className = "icon-aws"></HeaderIcon>
                            <HeaderIcon className = "icon-nodejs"></HeaderIcon>
                            <HeaderIcon className = "icon-react"></HeaderIcon>
                            <HeaderIcon className = "icon-typescript"></HeaderIcon>
                        </div>
                    </div>
                )}
                </BMStyle.StateContext.Consumer>
            )}
            </BMStyle.ThemeContext.Consumer>
        )
    }
}
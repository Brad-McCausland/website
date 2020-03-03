import * as React from "react";
import { HeaderIcon } from "./HeaderIcon";
import { BMStyle } from '../BMStyle';

/*
 * Footer object which contains copyright info and link buttons.
 */

interface FooterProps
{
    isMobileWidth: boolean,
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
                    <div className = "Footer" style =
                    {{
                        position: "relative",
                        top: "0",
                        width: "100%",
                        height: "70px",
                        display: "flex",
                        zIndex: 3,
                        alignItems: "center",
                        backgroundColor: theme.colors.UIMainColor,
                    }}>
                        <div 
                            className = "left_justified_elements"
                            style = 
                            {{
                                marginLeft: this.props.isMobileWidth ? Footer_ICON_MARGIN : "8.3333vw",
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
                                    display: this.props.isMobileWidth ? "none" : "inline",
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
                                marginRight: this.props.isMobileWidth ? Footer_ICON_MARGIN : "8.3333vw",
                                flexDirection: "row",
                            }}
                        >
                            <HeaderIcon className = "icon-envelope" onClick = {() => window.open(BMStyle.MailToUrl, "_blank")}></HeaderIcon>
                            <HeaderIcon className = "icon-github" onClick = {() => window.open(BMStyle.GithubUrl, "_blank")}></HeaderIcon>
                            <HeaderIcon className = "icon-linkedin" onClick = {() => window.open(BMStyle.LinkedInUrl, "_blank")}></HeaderIcon>
                        </div>
                    </div>
                    
                )}
            </BMStyle.ThemeContext.Consumer>
        )
    }
}
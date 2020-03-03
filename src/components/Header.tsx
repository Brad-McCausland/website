import * as React from "react";
import { Gradient } from "./Gradient";
import { HeaderIcon } from "./HeaderIcon";
import { BMStyle } from '../BMStyle';
import { SlidingMenu } from './SlidingMenu';
import { ToggleSwitch } from "./ToggleSwitch";
import { SlidingMenuItem } from './SlidingMenuItem';

/*
 * Header object which contains menu and link buttons. When above the fold, will display a black gradient as a background. When below, will switch to an orange background and display my name as well.
 */

interface HeaderProps
{
    isAboveFold: boolean,
    isMobileWidth: boolean,
}

interface HeaderState
{
    isMenuExtended: boolean,
}

export class Header extends React.Component<HeaderProps, HeaderState>
{
    constructor(props: HeaderProps)
    {
        super(props);
        this.state = 
        {
            isMenuExtended: false,
        }
    }

    toggleExtendMenu()
    {
        this.setState(
            {
                isMenuExtended: !this.state.isMenuExtended,
            }
        )
    }

    render ()
    {
        // Problem: I need to set side margins of the header icons to match the space between the tops of the icons and the top of the header
        // I could pass the height as a number, do all the math manually, and then convert them all to strings, but that feels hacky.
        // Side margins = (parent height - icon height) / 2
        const HEADER_ICON_FULL_WIDTH_MARGIN = "8.3333vw";
        const HEADER_ICON_MOBILE_WIDTH_MARGIN = "10px"; //10px = ((header height (70) - text element height (40)) / 2) - icon margin (5) Replace with calculated value
        let ThemeContext = BMStyle.ThemeContext;
        let LanguageContext = BMStyle.LanguageContext

        return (
            <ThemeContext.Consumer>
            {theme => (
                <LanguageContext.Consumer>
                {language => (
                    <div className = "header" style =
                        {{
                            position: "fixed",
                            top: "0",
                            width: "100%",
                            height: BMStyle.HeaderHeight,
                            display: "flex",
                            zIndex: 3,
                            alignItems: "center",
                        }}
                    >
                        <Gradient></Gradient>

                        <SlidingMenu isAboveFold = {this.props.isAboveFold} isExtended = {this.state.isMenuExtended} crossButtonAction = {this.toggleExtendMenu.bind(this)}>
                            <SlidingMenuItem text = {language.DarkMode}>
                                <ToggleSwitch width = {80} height = {40} toggleAction = {
                                    (value: boolean) => theme.toggleTheme()}
                                >
                                </ToggleSwitch>
                            </SlidingMenuItem>
                            <SlidingMenuItem text = {language.Language}>
                                <ToggleSwitch width = {80} height = {40} toggledOffText = {"EN"} toggledOnText = {"DE"} toggleAction = {
                                    (value: boolean) =>
                                    {
                                        language.toggleLanguage();
                                    }}
                                >
                                </ToggleSwitch>
                            </SlidingMenuItem>
                        </SlidingMenu>

                        <div>
                            <div
                                className = "orange_slider"
                                style = 
                                {{
                                    backgroundColor: theme.colors.UIMainColor,
                                    height: "100%",
                                    width: "100%",
                                    position: "absolute",
                                    zIndex: 1,
                                    top: this.props.isAboveFold ? "-100%" : "0px",
                                    transition: `top ${BMStyle.HeaderSlideTransitionTime}`,
                                }}
                            >
                            </div>
                        </div>

                        <div 
                            className = "left_justified_elements"
                            style = 
                            {{
                                marginLeft: this.props.isMobileWidth ? HEADER_ICON_MOBILE_WIDTH_MARGIN : HEADER_ICON_FULL_WIDTH_MARGIN,
                                marginRight: "auto",
                                flexDirection: "row",
                                zIndex: 3,
                            }}
                        >
                            <HeaderIcon className = "icon-menu" onClick = {() => this.toggleExtendMenu()}></HeaderIcon>
                            <h1 
                                className = "name_in_header"
                                style =
                                {{
                                    color: "white",
                                    fontSize: "40px",
                                    fontFamily: BMStyle.UITitleFont,
                                    display: this.props.isMobileWidth ? "none" : "inline",
                                    margin: "5px",
                                    opacity: this.props.isAboveFold ? "0" : "1",
                                    transition: "opacity 0.7s",
                                }}
                            >
                                Brad McCausland
                            </h1>
                        </div>

                        <div 
                            className = "right_justified_elements"
                            style = 
                            {{
                                marginLeft: "auto",
                                marginRight: this.props.isMobileWidth ? HEADER_ICON_MOBILE_WIDTH_MARGIN : HEADER_ICON_FULL_WIDTH_MARGIN,
                                flexDirection: "row",
                                zIndex: 3,
                            }}
                        >
                            <HeaderIcon className = "icon-envelope" onClick = {() => window.open(BMStyle.MailToUrl, "_blank")}></HeaderIcon>
                            <HeaderIcon className = "icon-github" onClick = {() => window.open(BMStyle.GithubUrl, "_blank")}></HeaderIcon>
                            <HeaderIcon className = "icon-linkedin" onClick = {() => window.open(BMStyle.LinkedInUrl, "_blank")}></HeaderIcon>
                        </div>
                    </div>
                )}
                </LanguageContext.Consumer>
            )}
            </ThemeContext.Consumer>
        )
    }
}
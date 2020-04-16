import * as React from "react";
import { Gradient } from "./Gradient";
import { HeaderIcon } from "./HeaderIcon";
import { BMStyle } from "../BMStyle";
import { SlidingMenu } from "./SlidingMenu";
import { ToggleSwitch } from "./ToggleSwitch";
import { SlidingMenuItem } from "./SlidingMenuItem";
import { Link } from "react-router-dom";

import "../css/Header.less";

/*
 * Header object which contains menu and link buttons. When above the fold, will display a black gradient as a background. When below, will switch to an orange background and display my name as well.
 */

interface HeaderProps
{
    // Setting isShowingSlidingBackdrop true will cause the header's orange background to appear. Will show the gradient background if false. Should only be set to false when above the fold on a hero image.
    isShowingSlidingBackdrop: boolean
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
        return (
            <BMStyle.ThemeContext.Consumer>
                {theme => (
                    <BMStyle.LanguageContext.Consumer>
                        {language => (
                            <BMStyle.StateContext.Consumer>
                                {({IsMobileWidth}) => (
                                    <div className = "header">
                                        <Gradient></Gradient>

                                        <SlidingMenu isExtended = {this.state.isMenuExtended} crossButtonAction = {this.toggleExtendMenu.bind(this)} isAboveFold = {this.props.isShowingSlidingBackdrop}>
                                            <SlidingMenuItem text = {language.DarkMode}>
                                                <ToggleSwitch width = {80} height = {40} isToggled = {theme.name === "dark"} toggleAction = {
                                                    (value: boolean) => theme.toggleTheme(value)}
                                                >
                                                </ToggleSwitch>
                                            </SlidingMenuItem>
                                            <SlidingMenuItem text = {language.Language}>
                                                <ToggleSwitch width = {80} height = {40} isToggled = {language.LangCode === "DE"} toggledOffText = {"EN"} toggledOnText = {"DE"} toggleAction = {
                                                    (value: boolean) =>
                                                    {
                                                        language.toggleLanguage(value);
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
                                                        top: this.props.isShowingSlidingBackdrop ?  "0px" : "-100%",
                                                    }}
                                            >
                                            </div>
                                        </div>

                                        <div 
                                            className = "left_justified_elements"
                                            style = {{marginLeft: IsMobileWidth ? BMStyle.HeaderIconMobileWidthSideMarginString : BMStyle.HeaderIconSideMarginString }}
                                        >
                                            <HeaderIcon className = "icon-menu" onClick = {() => this.toggleExtendMenu()}></HeaderIcon>

                                            <Link to={BMStyle.HomePageLink}>
                                                <h1 
                                                    className = "name_in_header"
                                                    style =
                                                        {{
                                                            opacity: this.props.isShowingSlidingBackdrop ? "1" : "0",
                                                            display: IsMobileWidth ? "none" : "inline",
                                                        }}
                                                >
                                                    Brad McCausland
                                                </h1>
                                            </Link>
                                        </div>

                                        <div 
                                            className = "right_justified_elements"
                                            style = {{marginRight: IsMobileWidth ? BMStyle.HeaderIconMobileWidthSideMarginString : BMStyle.HeaderIconSideMarginString}}
                                        >
                                            <HeaderIcon className = "icon-envelope" onClick = {() => window.open(BMStyle.MailToUrl, "_blank")}></HeaderIcon>
                                            <HeaderIcon className = "icon-github" onClick = {() => window.open(BMStyle.GithubUrl, "_blank")}></HeaderIcon>
                                            <HeaderIcon className = "icon-linkedin" onClick = {() => window.open(BMStyle.LinkedInUrl, "_blank")}></HeaderIcon>
                                        </div>
                                    </div>
                                )}
                            </BMStyle.StateContext.Consumer>
                        )}
                    </BMStyle.LanguageContext.Consumer>
                )}
            </BMStyle.ThemeContext.Consumer>
        )
    }
}
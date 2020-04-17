import * as React from "react";
import { HeaderIcon } from "./HeaderIcon";
import { BMStyle } from "../BMStyle";
import "../css/Footer.less";

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
        return (
            <BMStyle.ThemeContext.Consumer>
                {theme => (
                    <BMStyle.StateContext.Consumer>
                        {({IsMobileWidth}) => (
                            <div className = {"footer"} style = {{backgroundColor: theme.colors.UIMainColor}}>
                                <div className = {"left_justified_elements"} style = {{ marginLeft: IsMobileWidth? BMStyle.HeaderIconMobileWidthSideMarginString : "8.3333vw"}}>
                                    <h1 className = {"name_in_footer"} style = {{display: IsMobileWidth? "none" : "inline"}}>
                                        Brad McCausland ©2020
                                    </h1>
                                </div>

                                <div className = {"right_justified_elements"} style = {{marginRight: IsMobileWidth? BMStyle.HeaderIconMobileWidthSideMarginString : "8.3333vw"}}>
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
        );
    }
}
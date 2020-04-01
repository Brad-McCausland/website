import * as React from "react";

import { BMStyle, BMThemeContextInterface, BMLanguageContextInterface } from '../BMStyle';
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import Cookies from 'js-cookie';

interface BMWebPageProps
{
    headerIsDynamic: boolean,
}

interface BMWebPageState
{
    isMobileWidth: boolean,
    isAboveFold: boolean,
    theme: BMThemeContextInterface,
    language: BMLanguageContextInterface,
}

export class BMWebPage extends React.Component<BMWebPageProps, BMWebPageState>
{
    constructor(props: BMWebPageProps)
    {
        super(props);

        this.state =
        {
            isMobileWidth: this.isMobileWidth(),
            isAboveFold: false,
            theme: Cookies.get(BMStyle.DarkModeCookie) === 'true'? BMStyle.DarkTheme : BMStyle.LightTheme,
            language: Cookies.get(BMStyle.LanguageCookie) === 'DE'? BMStyle.GermanText : BMStyle.EnglishText,
        };
    }
    
    componentDidMount()
    {
        window.addEventListener('resize', this.handleWindowResize.bind(this), true);
    }

    handleWindowResize()
    {
        this.setState
        ({
            isMobileWidth: this.isMobileWidth(),
        })
    }

    isMobileWidth()
    {
        return window.innerWidth < 675;
    }

    toggleDarkMode(toggled: boolean)
    {
        this.setState
        ({
            theme: toggled? BMStyle.DarkTheme : BMStyle.LightTheme
        }, () => {
            Cookies.set(BMStyle.DarkModeCookie, (this.state.theme === BMStyle.DarkTheme)? "true" : "false");
        });
    }

    toggleLanguage(toggled: boolean)
    {
        this.setState
        ({
            language: toggled? BMStyle.GermanText : BMStyle.EnglishText
        }, () => {
            Cookies.set(BMStyle.LanguageCookie, this.state.language.LangCode);
        });
    }

    setIsAboveFold(isAboveFold: boolean)
    {
        console.log("Set above fold to " + isAboveFold)
        this.setState
        ({
            isAboveFold: isAboveFold,
        })
    }

    render ()
    {
        return (
            <BMStyle.ThemeContext.Provider value = {{...this.state.theme, ...{toggleTheme: this.toggleDarkMode.bind(this)}}}>
            <BMStyle.LanguageContext.Provider value = {{...this.state.language, ...{toggleLanguage: this.toggleLanguage.bind(this)}}}>
            <BMStyle.StateContext.Provider value = {{IsMobileWidth: this.state.isMobileWidth, IsAboveFold: false, ...{setIsAboveFold: this.setIsAboveFold.bind(this)}}}>
                {<div
                    className = "BM_Web_Page"
                    style = 
                    {{
                        display: "block",
                        position: "relative",
                        height: "100vh",
                        margin: "0px",
                        overflowX: "hidden",
                        backgroundColor: this.state.theme.colors.BackgroundColor,
                        fontFamily: BMStyle.UITitleFont,
                    }}
                >
                    <Header isDynamic={this.props.headerIsDynamic}/>
                    {this.props.children}
                    <Footer/>
                </div>}
            </BMStyle.StateContext.Provider>
            </BMStyle.LanguageContext.Provider>
            </BMStyle.ThemeContext.Provider>
        )
    }
}
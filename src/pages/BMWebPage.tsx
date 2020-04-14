import * as React from "react";

import { BMStyle, BMThemeContextInterface, BMLanguageContextInterface } from '../BMStyle';
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import Cookies from 'js-cookie';

interface BMWebPageProps
{
    headerIsExtended: boolean,
}

interface BMWebPageState
{
    isMobileWidth: boolean,
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

    setDarkMode(value: boolean)
    {
        this.setState
        ({
            theme: value? BMStyle.DarkTheme : BMStyle.LightTheme
        }, () => {
            Cookies.set(BMStyle.DarkModeCookie, (this.state.theme === BMStyle.DarkTheme)? "true" : "false");
        });
    }

    setLanguage(value: boolean)
    {
        this.setState
        ({
            language: value? BMStyle.GermanText : BMStyle.EnglishText
        }, () => {
            Cookies.set(BMStyle.LanguageCookie, this.state.language.LangCode);
        });
    }

    render ()
    {
        return (
            <BMStyle.ThemeContext.Provider value = {{...this.state.theme, ...{toggleTheme: this.setDarkMode.bind(this)}}}>
            <BMStyle.LanguageContext.Provider value = {{...this.state.language, ...{toggleLanguage: this.setLanguage.bind(this)}}}>
            <BMStyle.StateContext.Provider value = {{IsMobileWidth: this.state.isMobileWidth}}>
                {<div
                    className = "BM_Web_Page"
                    style = 
                    {{
                        display: "block",
                        position: "relative",
                        height: "100vh",
                        margin: "0px",
                        backgroundColor: this.state.theme.colors.BackgroundColor,
                        fontFamily: BMStyle.UITitleFont,
                    }}
                >
                    <Header isShowingSlidingBackdrop = {this.props.headerIsExtended}/>
                    {this.props.children}
                    <Footer/>
                </div>}
            </BMStyle.StateContext.Provider>
            </BMStyle.LanguageContext.Provider>
            </BMStyle.ThemeContext.Provider>
        )
    }
}
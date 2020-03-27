import * as React from "react";

import { BMStyle, BMThemeContext, BMLanguageContext } from '../BMStyle';
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Linkify } from '../utils/Linkify';
import ReactFitText = require("react-fittext");

interface UnderConstructionPageProps
{
}

interface UnderConstructionPageState
{
    isMobileWidth: boolean,
    theme: BMThemeContext,
    language: BMLanguageContext,
}

export class UnderConstructionPage extends React.Component<UnderConstructionPageProps, UnderConstructionPageState>
{
    constructor(props: UnderConstructionPageProps)
    {
        super(props);

        // TODO: Init with info from browser cookies
        this.state =
        {
            isMobileWidth: this.isMobileWidth(),
            theme: BMStyle.LightTheme,
            language: BMStyle.EnglishText
        };
    }
    
    componentDidMount()
    {
        window.addEventListener('resize', this.handleWindowResize.bind(this), true);
    }

    //////////////////// TODO: Place the methods in a class that all pages can inherit from
    // Recalculate hero image height in case window resized
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

    toggleDarkMode()
    {
        this.setState
        ({
            theme: this.state.theme == BMStyle.LightTheme ? BMStyle.DarkTheme : BMStyle.LightTheme
        });
    }

    toggleLanguage()
    {
        this.setState
        ({
            language: this.state.language == BMStyle.EnglishText ? BMStyle.GermanText : BMStyle.EnglishText
        });
    }
    //////////////

    render ()
    {
        return (
            <BMStyle.ThemeContext.Provider value = {{...this.state.theme, ...{toggleTheme: this.toggleDarkMode.bind(this)}}}>
            <BMStyle.LanguageContext.Provider value = {{...this.state.language, ...{toggleLanguage: this.toggleLanguage.bind(this)}}}>
            <BMStyle.StateContext.Provider value = {{IsAboveFold: false, IsMobileWidth: this.state.isMobileWidth}}>
                <div
                    className = "Under_Construction_Page"
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
                    <Header isDynamic={false}/>
                    <ReactFitText compressor={1.1} maxFontSize={64}>
                        <h1
                            className = "UnderConstructionTitle"
                            style = 
                            {{
                                width: "100%",
                                paddingTop: "30vh",
                                paddingBottom: "5vh",
                                fontFamily: BMStyle.UITitleFont,
                                color: this.state.theme.colors.UIMainColor,
                                textAlign: "center",
                            }}
                        >
                            {this.state.language.UnderConstruction}
                        </h1>
                    </ReactFitText>
                    <ReactFitText compressor={1.5} maxFontSize={36}>
                        <p
                            style = 
                            {{
                                fontFamily: BMStyle.UIContentFont,
                                fontSize: "36px",
                                color: this.state.theme.colors.BodyTextColor,
                                padding: "24px 8vw",
                                textAlign: "justify",
                                textAlignLast: "center",
                            }}
                        >
                            {Linkify(this.state.language.UnderConstructionSubtitle, this.state.language.WebsiteGitubTextLinkPair)}
                        </p>
                    </ReactFitText>
                    <Footer/>
                </div>
            </BMStyle.StateContext.Provider>
            </BMStyle.LanguageContext.Provider>
            </BMStyle.ThemeContext.Provider>
        )
    }
}
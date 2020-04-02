import * as React from "react";

import { BMStyle, BMThemeContextInterface, BMLanguageContextInterface } from '../BMStyle';
import { Linkify } from '../utils/Linkify';
import { BMWebPage } from './BMWebPage';
import ReactFitText = require("react-fittext");

interface UnderConstructionPageProps
{
}

interface UnderConstructionPageState
{
}

export class UnderConstructionPage extends React.Component<UnderConstructionPageProps, UnderConstructionPageState>
{
    constructor(props: UnderConstructionPageProps)
    {
        super(props);
    }
    
    render ()
    {
        return (
            <BMWebPage headerIsExtended = {true}>
                <BMStyle.ThemeContext.Consumer>
                {theme => (
                <BMStyle.LanguageContext.Consumer>
                {language => (
                    <div
                        className = "Under_Construction_Page"
                        style = 
                        {{
                            display: "block",
                            position: "relative",
                            height: "100vh",
                            margin: "0px",
                            overflowX: "hidden",
                            backgroundColor: theme.colors.BackgroundColor,
                            fontFamily: BMStyle.UITitleFont,
                        }}
                    >
                        <ReactFitText compressor={1.1} maxFontSize={64}>
                            <h1
                                className = "UnderConstructionTitle"
                                style = 
                                {{
                                    width: "100%",
                                    paddingTop: "30vh",
                                    paddingBottom: "5vh",
                                    fontFamily: BMStyle.UITitleFont,
                                    color: theme.colors.UIMainColor,
                                    textAlign: "center",
                                }}
                            >
                                {language.UnderConstruction}
                            </h1>
                        </ReactFitText>
                        <ReactFitText compressor={1.5} maxFontSize={36}>
                            <p
                                style = 
                                {{
                                    fontFamily: BMStyle.UIContentFont,
                                    fontSize: "36px",
                                    color: theme.colors.BodyTextColor,
                                    padding: "24px 8vw",
                                    textAlign: "justify",
                                    textAlignLast: "center",
                                }}
                            >
                                {Linkify(language.UnderConstructionSubtitle, language.WebsiteGitubTextLinkPair)}
                            </p>
                        </ReactFitText>
                    </div>
                )}
                </BMStyle.LanguageContext.Consumer>
                )}
                </BMStyle.ThemeContext.Consumer>
            </BMWebPage>
        )
    }
}
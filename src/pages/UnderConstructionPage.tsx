import * as React from "react";

import { BMStyle } from "../BMStyle";
import { Linkify } from "../utils/Linkify";
import { BMWebPage } from "./BMWebPage";
import ReactFitText = require("react-fittext");

import "../styles/pages/UnderConstructionPage.less";

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
                                <div className = "under_construction_page">
                                    <ReactFitText compressor={1.1} maxFontSize={64}>
                                        <h1
                                            className = "under_construction_title"
                                            style = {{color: theme.colors.UIMainColor}}
                                        >
                                            {language.UnderConstruction}
                                        </h1>
                                    </ReactFitText>
                                    <ReactFitText compressor={1.5} maxFontSize={36}>
                                        <p
                                            className = "under_construction_text"
                                            style = {{color: theme.colors.BodyTextColor}}
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
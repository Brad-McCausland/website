import * as React from "react";

import { BMStyle} from '../BMStyle';
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Linkify } from '../utils/Linkify';

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
            <BMStyle.ThemeContext.Consumer>
            {theme => (
                <BMStyle.StateContext.Consumer>
                {({IsAboveFold, IsMobileWidth}) => (
                    <BMStyle.LanguageContext.Consumer>
                        {language => (
                        <div
                            className = "Under_Construction_Page"
                        >
                            <Footer/>
                            <h1
                                className = "UnderConstructionTitle"
                                style = 
                                {{
                                    width: "100%",
                                    height: "100%",
                                    paddingTop: "30vh",
                                    paddingBottom: "5vh",
                                    fontFamily: BMStyle.UITitleFont,
                                    fontSize: "64px",
                                    color: theme.colors.UIMainColor,
                                    textAlign: "center",
                                }}
                            >
                                {language.UnderConstruction}
                            </h1>
                            {Linkify(language.UnderConstructionSubtitle, language.WebsiteGitubTextLinkPair)}
                        </div>
                    )}
                    </BMStyle.LanguageContext.Consumer>
                )}
                </BMStyle.StateContext.Consumer>
            )}
            </BMStyle.ThemeContext.Consumer>
        )
    }
}
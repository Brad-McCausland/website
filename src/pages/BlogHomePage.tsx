import * as React from "react";

import { BMStyle } from "../BMStyle";
import { BlogEntryCell } from "../components/BlogEntryCell"
import { BMWebPage } from "./BMWebPage";
import { SmartImg } from "../components/SmartImg";
import ReactFitText = require("react-fittext");

import "../styles/pages/BlogHomePage.less";

interface BlogHomePageProps
{
}

interface BlogHomePageState
{
    isAboveFold: boolean
}

export class BlogHomePage extends React.Component<BlogHomePageProps, BlogHomePageState>
{
    constructor(props: BlogHomePageProps)
    {
        super(props);
        this.state = {isAboveFold: this.isAboveFold()};
    }

    // TODO: componentDidMount() through handleScroll are practically identical except for the difference in hero image height. Consider rolling into BMWebPage.
    componentDidMount()
    {
        window.addEventListener("scroll", this.handleScroll.bind(this));
    }

    componentWillUnmount()
    {
        window.removeEventListener("scroll", this.handleScroll.bind(this));
    }

    isAboveFold(): boolean
    {
        // Hard coded to 240 to match dark blog hero. TODO: calculate dynamically
        var fold = (240 - BMStyle.HeaderHeight);
        return window.pageYOffset < fold;
    }

    handleScroll()
    {
        const isAboveFold = this.isAboveFold()
        if (isAboveFold !== this.state.isAboveFold)
        {
            this.setState({isAboveFold: isAboveFold});
        }
    }
    
    render ()
    {
        return (
            <BMWebPage headerIsExtended = {!this.state.isAboveFold}>
                <BMStyle.ThemeContext.Consumer>
                    {theme => (
                        <BMStyle.LanguageContext.Consumer>
                            {language => (
                                <BMStyle.StateContext.Consumer>
                                    {({IsMobileWidth}) => (
                                        <div className = "blog_home_page">
                                            <div className = "hero_image">
                                                <SmartImg fullUrl = {theme.images.BlogHeroImage} thumbnailUrl = {theme.images.BlogHeroImageThumbnail}/>
                                            </div>
                                            <ReactFitText compressor={1.1} maxFontSize={128}>
                                                <h1
                                                    className = "blog_title"
                                                    style = {{color: theme.colors.BodyTextColor}}
                                                >
                                                    <i>
                                                        {language.Blog}
                                                    </i>
                                                </h1>
                                            </ReactFitText>
                                            <div 
                                                className = "blog_entries"
                                                style = 
                                                {{
                                                    margin: IsMobileWidth? "100px 10px" : "100px 10vw",
                                                    backgroundColor: theme.colors.ContactBackgroundColor,
                                                }}
                                            >
                                                {/*TODO: Load entries from server and display them all*/}
                                                <BlogEntryCell
                                                    image = "./src/images/blog_post_example_img.png"
                                                    title = "Sample Blog Entry"
                                                    date = "5/14/2020"
                                                />
                                            </div>
                                            <div className = "spacer"/>
                                        </div>
                                    )}
                                </BMStyle.StateContext.Consumer>
                            )}
                        </BMStyle.LanguageContext.Consumer>
                    )}
                </BMStyle.ThemeContext.Consumer>
            </BMWebPage>
        )
    }
}

/*

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
*/
import * as React from "react";
import { scroller as Scroller, Element as ScrollElement } from "react-scroll";

import "../../index.css";
import "../styles/pages/HomePage.less";
import { BMStyle } from "../BMStyle";
import { SubtitleButton } from "../components/SubtitleButton";
import { Body5050Section } from "../components/Body5050Section";
import { ContactWidget } from "../components/ContactWidget";
import { Linkify } from "../utils/Linkify";
import { BMWebPage } from "./BMWebPage";
import { SmartImg } from "../components/SmartImg";

enum scrollableSectionNames
{
    developerSectionName = "DeveloperScrollElement",
    educatorSectionName = "EducatorScrollElement",
    travellerSectionName = "TravellerScrollElement",
}

interface HomePageProps
{

}

/* TODO:
 * Get more photos
 */

// State defines all private properties
interface HomePageState
{
    isAboveFold: boolean,
    heroImageHeight: number,
    heroImageIsLoaded: boolean,
}


export class HomePage extends React.Component<HomePageProps, HomePageState>
{
    constructor(props: HomePageProps)
    {
        super(props);

        this.state =
        {
            isAboveFold: true,
            heroImageHeight: window.innerHeight,
            heroImageIsLoaded: false,
        };
    }
    
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
        var fold = (this.state.heroImageHeight - BMStyle.HeaderHeight);
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

    scrollToSection(section: scrollableSectionNames)
    {
        Scroller.scrollTo(section, 
            {
                duration: 1000,
                delay: 0,
                offset: (-1 * BMStyle.HeaderHeight) + 1, //Offset scroll by header height to account for sliding header, plus one pixel to handle off-by-one error
                smooth: "easeInOutQuart"
            });
    }

    render()
    {
        const {isAboveFold} = this.state;
        
        return (
            <BMWebPage headerIsExtended = {!isAboveFold}>
                <BMStyle.ThemeContext.Consumer>
                    {theme => (
                        <BMStyle.LanguageContext.Consumer>
                            {language => (
                                <BMStyle.StateContext.Consumer>
                                    {({IsMobileWidth}) => (
                                        <div className = "home_page">
                                            <div className = "hero_image">
                                                <SmartImg fullUrl = {theme.images.HeroImage} thumbnailUrl = {theme.images.HeroImageThumbnail}/>

                                                <div className = "hero_image_text_elements">
                                                    <div className = "name_title">
                                                        <h1 style = {{fontSize: IsMobileWidth ? "10vw" : "5vw"}}>
                                                                Brad McCausland
                                                        </h1>
                                                    </div>
                                                    <div
                                                        className = "subtitle_buttons"
                                                    >
                                                        <SubtitleButton text = {language.Educator}  onClick = {() => this.scrollToSection(scrollableSectionNames.educatorSectionName)}></SubtitleButton>
                                                        <SubtitleButton text = {language.Traveller}  onClick = {() => this.scrollToSection(scrollableSectionNames.travellerSectionName)}></SubtitleButton>
                                                        <SubtitleButton text = {language.Developer}  onClick = {() => this.scrollToSection(scrollableSectionNames.developerSectionName)}></SubtitleButton>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className = "webpage_body">
                                                <ScrollElement name = {scrollableSectionNames.developerSectionName}>
                                                    <Body5050Section fullImageSrc = {theme.images.DeveloperPortrait} thumbnailImageSrc = {theme.images.DeveloperPortraitThumbnail} height="600px" reverse = {false}>
                                                        {Linkify(language.DeveloperParagraph, language.DeveloperResumeTextLinkPair, language.DeveloperBlogTextLinkPair)}
                                                    </Body5050Section>
                                                </ScrollElement>
                                                <ScrollElement name = {scrollableSectionNames.educatorSectionName}>
                                                    <Body5050Section fullImageSrc = {theme.images.EducatorPortrait} thumbnailImageSrc = {theme.images.EducatorPortraitThumbnail} height="600px" reverse = {true}>
                                                        {Linkify(language.EducatorParagraph)}
                                                    </Body5050Section>
                                                </ScrollElement>
                                                <ScrollElement name = {scrollableSectionNames.travellerSectionName}>
                                                    <Body5050Section fullImageSrc = {theme.images.TravellerPortrait} thumbnailImageSrc = {theme.images.TravellerPortraitThumbnail} height="600px" reverse = {false}>
                                                        {Linkify(language.TravellerParagraph)}
                                                    </Body5050Section>
                                                </ScrollElement>
                                            </div>

                                            <ContactWidget></ContactWidget>
                                        </div>
                                    )}
                                </BMStyle.StateContext.Consumer>
                            )}
                        </BMStyle.LanguageContext.Consumer>
                    )}
                </BMStyle.ThemeContext.Consumer>
            </BMWebPage>
        );
    }
}
HomePage.contextType = BMStyle.ThemeContext;
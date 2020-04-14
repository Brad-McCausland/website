import * as React from "react";
import { scroller as Scroller, Element as ScrollElement } from "react-scroll"

import "../../index.css"
import { BMStyle } from '../BMStyle';
import { SubtitleButton } from "../components/SubtitleButton";
import { Body5050Section } from "../components/Body5050Section"
import { ContactWidget } from "../components/ContactWidget"
import { Linkify } from '../utils/Linkify';
import { BMWebPage } from './BMWebPage';

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
        window.addEventListener('scroll', this.handleScroll.bind(this));
        this.lazyLoadHeroImage();
    }

    componentWillUnmount()
    {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    lazyLoadHeroImage()
    {
        // Initialize hero image with smaller placeholder and replace with full res version when loaded
        const theme = this.context;

        const imageLoader = new Image()
        imageLoader.src = theme.images.HeroImage;

        imageLoader.onload = () =>
        {
            this.setState
            ({
                heroImageIsLoaded: true,
            })
        }
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
            this.setState(
            {
                isAboveFold: isAboveFold,
            })
        }
    }

    scrollToSection(section: scrollableSectionNames)
    {
        Scroller.scrollTo(section, 
        {
            duration: 1000,
            delay: 0,
            offset: (-1 * BMStyle.HeaderHeight) + 1, //Offset scroll by header height to account for sliding header, plus one pixel to handle off-by-one error
            smooth: 'easeInOutQuart'
        });
    }

    render()
    {
        const {isAboveFold, heroImageIsLoaded} = this.state;

        return (
            <BMWebPage headerIsExtended = {!isAboveFold}>
                <BMStyle.ThemeContext.Consumer>
                {theme => (
                <BMStyle.LanguageContext.Consumer>
                {language => (
                <BMStyle.StateContext.Consumer>
                {({IsMobileWidth}) => (
                    <div
                        className = "web_page"
                        style = 
                        {{
                            display: "block",
                            position: "relative",
                            margin: "0px",
                            backgroundColor: theme.colors.BackgroundColor,
                            fontFamily: BMStyle.UITitleFont,
                        }}
                    >
                        <div
                            className = "hero_image"
                            style =
                            {{
                                width: "100%",
                                height: "100vh",
                                backgroundImage: "url(" + (heroImageIsLoaded? theme.images.HeroImage : theme.images.HeroImagePlaceholder) + ")",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                position: "relative",
                                display: "flex",
                                flexDirection: "column",
                                zIndex: 2,
                            }}
                        >

                            <div className = "name_title">
                                <h1 style =
                                {{
                                    color: "white",
                                    fontSize: IsMobileWidth ? "10vw" : "5vw",
                                    fontFamily: BMStyle.UITitleFont,
                                    textAlign: 'center',
                                    marginTop: '20vh',
                                    marginBottom: '2vw'
                                }}>
                                        Brad McCausland
                                </h1>
                            </div>
                            <div
                                className = "subtitle_buttons"
                                style =
                                {{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <SubtitleButton text = {language.Educator}  onClick = {() => this.scrollToSection(scrollableSectionNames.educatorSectionName)}></SubtitleButton>
                                <SubtitleButton text = {language.Traveller}  onClick = {() => this.scrollToSection(scrollableSectionNames.travellerSectionName)}></SubtitleButton>
                                <SubtitleButton text = {language.Developer}  onClick = {() => this.scrollToSection(scrollableSectionNames.developerSectionName)}></SubtitleButton>
                            </div>
                        </div>

                        <div
                            className = "body"
                            style = 
                            {{
                                zIndex: 1,
                                position: "relative",
                                display: "flex",
                                flexDirection: "column",
                                marginBottom: "50px",
                            }}
                        >
                            <ScrollElement name = {scrollableSectionNames.developerSectionName}>
                                <Body5050Section imageSrc = {theme.images.DeveloperPortrait} height="600px" reverse = {false}>
                                    {Linkify(language.DeveloperParagraph, language.DeveloperResumeTextLinkPair, language.DeveloperBlogTextLinkPair)}
                                </Body5050Section>
                            </ScrollElement>
                            <ScrollElement name = {scrollableSectionNames.educatorSectionName}>
                                <Body5050Section imageSrc = {theme.images.EducatorPortrait} height="600px" reverse = {true}>
                                    {Linkify(language.EducatorParagraph)}
                                </Body5050Section>
                            </ScrollElement>
                            <ScrollElement name = {scrollableSectionNames.travellerSectionName}>
                                <Body5050Section imageSrc = {theme.images.TravellerPortrait} height="600px" reverse = {false}>
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
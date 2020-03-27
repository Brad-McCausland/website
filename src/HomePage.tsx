import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Scroll from "react-scroll";

import "../index.css"
import { BMStyle, BMThemeContext, BMLanguageContext } from './BMStyle';
import { SubtitleButton } from "./components/SubtitleButton";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Body5050Section } from "./components/Body5050Section"
import { ContactWidget } from "./components/ContactWidget"
import { UnderConstructionPane } from './components/UnderConstructionPane';
import { Linkify } from './utils/Linkify';

const scrollableSectionNames = 
{
    developerSectionName: "DeveloperScrollElement",
    educatorSectionName: "EducatorScrollElement",
    travellerSectionName: "TravellerScrollElement",
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
    isMobileWidth: boolean,
    heroImageHeight: number,
    heroImageSrc?: string,
    isUnderConstruction: boolean,
    theme: BMThemeContext,
    language: BMLanguageContext,
}


export class HomePage extends React.Component<HomePageProps, HomePageState>
{
    constructor(props: HomePageProps)
    {
        super(props);

        // TODO: Init with info from browser cookies
        this.state =
        {
            isAboveFold: true,
            isMobileWidth: this.isMobileWidth(),
            heroImageHeight: window.innerHeight,
            heroImageSrc: undefined,
            isUnderConstruction: false,
            theme: BMStyle.LightTheme,
            language: BMStyle.EnglishText
        };
    }
    
    componentDidMount()
    {
        window.addEventListener('scroll', this.handleScroll.bind(this), true);
        window.addEventListener('resize', this.handleWindowResize.bind(this), true);

        this.lazyLoadHeroImage();
    }

    lazyLoadHeroImage()
    {
        // Initialize hero image with smaller placeholder and replace with full res version when loaded
        this.setState
        ({
            heroImageSrc: this.state.theme.images.HeroImagePlaceholder,
        })
        const imageLoader = new Image()
        imageLoader.src = this.state.theme.images.HeroImage;
        imageLoader.onload = () =>
        {
            this.setState
            ({
                heroImageSrc: this.state.theme.images.HeroImage,
            })
        }
    }

    // Recalculate hero image height in case window resized
    handleWindowResize()
    {
        this.setState
        ({
            isMobileWidth: this.isMobileWidth(),
            heroImageHeight: window.innerHeight,
        })
    }

    isMobileWidth()
    {
        return window.innerWidth < 675;
    }

    isAboveFold(): boolean
    {
        var fold = (this.state.heroImageHeight - BMStyle.HeaderHeight);
        return window.pageYOffset < fold;
    }

    handleScroll()
    {
        if (this.isAboveFold() && !this.state.isAboveFold)
        {
            this.setState
            ({
                isAboveFold: true,
            })
        }
        else if (!this.isAboveFold() && this.state.isAboveFold)
        {
            this.setState
            ({
                isAboveFold: false,
            })
        }
    }

    toggleDarkMode()
    {
        this.setState
        ({
            theme: this.state.theme == BMStyle.LightTheme ? BMStyle.DarkTheme : BMStyle.LightTheme
        });

        this.lazyLoadHeroImage();
    }

    toggleLanguage()
    {
        this.setState
        ({
            language: this.state.language == BMStyle.EnglishText ? BMStyle.GermanText : BMStyle.EnglishText
        });
    }

    scrollToSection(section: string)
    {
        Scroll.scroller.scrollTo(section, 
        {
            duration: 1000,
            delay: 0,
            offset: (-1 * BMStyle.HeaderHeight) + 1, //Offset scroll by header height to account for sliding header, plus one pixel to handle off-by-one error
            smooth: 'easeInOutQuart'
        });
    }

    render()
    {
        var ScrollElement = Scroll.Element;
        return (
            <BMStyle.ThemeContext.Provider value = {{...this.state.theme, ...{toggleTheme: this.toggleDarkMode.bind(this)}}}>
            <BMStyle.LanguageContext.Provider value = {{...this.state.language, ...{toggleLanguage: this.toggleLanguage.bind(this)}}}>
            <BMStyle.StateContext.Provider value = {{IsAboveFold: this.state.isAboveFold, IsMobileWidth: this.state.isMobileWidth}}>
                <div 
                    className = "web_page"
                    style = 
                    {{
                        display: "block",
                        position: "relative",
                        margin: "0px",
                        backgroundColor: this.state.theme.colors.BackgroundColor,
                        fontFamily: BMStyle.UITitleFont,
                        overflowX: "hidden",
                    }}
                >
                    <Header isDynamic={true}/>

                    <div
                        className = "hero_image"
                        style =
                        {{
                            width: "100%",
                            height: "100vh",
                            backgroundImage: "url(" + this.state.heroImageSrc + ")",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            position: this.state.isUnderConstruction? "absolute" : "relative",
                            display: "flex",
                            flexDirection: "column",
                            zIndex: 2,
                        }}
                    >

                        <div className = "name_title">
                            <h1 style =
                            {{
                                color: "white",
                                fontSize: this.state.isMobileWidth ? "10vw" : "5vw",
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
                            <SubtitleButton text = {this.state.language.Educator}  onClick = {() => this.scrollToSection(scrollableSectionNames.educatorSectionName)}></SubtitleButton>
                            <SubtitleButton text = {this.state.language.Traveller}  onClick = {() => this.scrollToSection(scrollableSectionNames.travellerSectionName)}></SubtitleButton>
                            <SubtitleButton text = {this.state.language.Developer}  onClick = {() => this.scrollToSection(scrollableSectionNames.developerSectionName)}></SubtitleButton>
                        </div>
                    </div>

                    {this.state.isUnderConstruction &&
                        <UnderConstructionPane onThreeClicks = {() => this.setState({isUnderConstruction: false})}></UnderConstructionPane>
                    }

                    {!this.state.isUnderConstruction &&
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
                            <Body5050Section imageSrc = {this.state.theme.images.DeveloperPortrait} height="600px" reverse = {false}>
                                {Linkify(this.state.language.DeveloperParagraph, this.state.language.DeveloperResumeTextLinkPair, this.state.language.DeveloperBlogTextLinkPair)}
                            </Body5050Section>
                        </ScrollElement>
                        <ScrollElement name = {scrollableSectionNames.educatorSectionName}>
                            <Body5050Section imageSrc = {this.state.theme.images.EducatorPortrait} height="600px" reverse = {true}>
                                {Linkify(this.state.language.EducatorParagraph)}
                            </Body5050Section>
                        </ScrollElement>
                        <ScrollElement name = {scrollableSectionNames.travellerSectionName}>
                            <Body5050Section imageSrc = {this.state.theme.images.TravellerPortrait} height="600px" reverse = {false}>
                                {Linkify(this.state.language.TravellerParagraph, this.state.language.TravellerPhotoTextLinkPair)}
                            </Body5050Section>
                        </ScrollElement>
                    </div>
                    }

                    {!this.state.isUnderConstruction &&
                        <ContactWidget></ContactWidget>
                    }
                    
                    
                    {!this.state.isUnderConstruction &&
                        <Footer></Footer>
                    }
                </div>
            </BMStyle.StateContext.Provider>
            </BMStyle.LanguageContext.Provider>
            </BMStyle.ThemeContext.Provider>
        );
    }

}
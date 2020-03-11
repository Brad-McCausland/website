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

const scrollableSectionNames = 
{
    developerSectionName: "DeveloperScrollElement",
    educatorSectionName: "EducatorScrollElement",
    travellerSectionName: "TravellerScrollElement",
}

interface WebPageProps
{

}

/* TODO:
 * Set up emailer on live server
 * Write content
 * Get more photos
 */

// State defines all private properties
interface WebPageState
{
    windowWidth: number;
    images: HTMLImageElement[],
    isAboveFold: boolean,
    isMobileWidth: boolean,
    heroImageHeight: number,
    heroImageSrc?: string,
    isUnderConstruction: boolean,
    theme: BMThemeContext,
    language: BMLanguageContext,
}


class WebPage extends React.Component<WebPageProps, WebPageState>
{
    constructor(props: WebPageProps)
    {
        super(props);

        this.state =
        {
            windowWidth: window.innerWidth,
            images: [],
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

    handleScroll()
    {
        var fold = (this.state.heroImageHeight - BMStyle.HeaderHeight)
        if ((window.pageYOffset > fold) && this.state.isAboveFold)
        {
            this.setState({isAboveFold: false});
        }
        else if ((window.pageYOffset < fold) && !this.state.isAboveFold)
        {
            this.setState({isAboveFold: true});
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
                <div 
                    className = "web_page"
                    style = 
                    {{
                        display: "block",
                        margin: "0px",
                        backgroundColor: this.state.theme.colors.BackgroundColor,
                        fontFamily: BMStyle.UITitleFont,
                        overflowX: "hidden",
                    }}
                >
                    <Header
                        isAboveFold = {this.state.isAboveFold}
                        isMobileWidth = {this.state.isMobileWidth}
                    >
                    </Header>

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
                            <SubtitleButton text = {this.state.language.Educator}  isMobileWidth = {this.state.isMobileWidth} onClick = {() => this.scrollToSection(scrollableSectionNames.educatorSectionName)}></SubtitleButton>
                            <SubtitleButton text = {this.state.language.Traveller}  isMobileWidth = {this.state.isMobileWidth} onClick = {() => this.scrollToSection(scrollableSectionNames.travellerSectionName)}></SubtitleButton>
                            <SubtitleButton text = {this.state.language.Developer}  isMobileWidth = {this.state.isMobileWidth} onClick = {() => this.scrollToSection(scrollableSectionNames.developerSectionName)}></SubtitleButton>
                        </div>
                    </div>

                    {this.state.isUnderConstruction &&
                        <UnderConstructionPane isMobileWidth = {this.state.isMobileWidth} onThreeClicks = {() => this.setState({isUnderConstruction: false})}></UnderConstructionPane>
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
                            <Body5050Section imageSrc = {this.state.theme.images.DeveloperPortrait} text = {this.state.language.DeveloperParagraphText} height="600px" reverse = {false} isMobileWidth = {this.state.isMobileWidth}></Body5050Section>
                        </ScrollElement>
                        <ScrollElement name = {scrollableSectionNames.educatorSectionName}>
                            <Body5050Section imageSrc = {this.state.theme.images.EducatorPortrait} text = {this.state.language.EducatorParagraphText} height="600px" reverse = {true} isMobileWidth = {this.state.isMobileWidth}></Body5050Section>
                        </ScrollElement>
                        <ScrollElement name = {scrollableSectionNames.travellerSectionName}>
                            <Body5050Section imageSrc = {this.state.theme.images.TravellerPortrait} text = {this.state.language.TravellerParagraphText} height="600px" reverse = {false} isMobileWidth = {this.state.isMobileWidth}></Body5050Section>
                        </ScrollElement>
                    </div>
                    }

                    {!this.state.isUnderConstruction &&
                        <ContactWidget isMobileWidth = {this.state.isMobileWidth}></ContactWidget>
                    }
                    
                    
                    {!this.state.isUnderConstruction &&
                        <Footer isMobileWidth = {this.state.isMobileWidth}></Footer>
                    }
                </div>
            </BMStyle.LanguageContext.Provider>
            </BMStyle.ThemeContext.Provider>
        );
    }

}

ReactDOM.render (
    <WebPage />,
    document.getElementById("webpage_wrapper")
);
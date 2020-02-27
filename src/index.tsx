import * as React from "react";
import * as ReactDOM from "react-dom";

import "../index.css"
import { BMStyle } from './BMStyle';
import { SubtitleButton } from "./components/SubtitleButton";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Body5050Section } from "./components/Body5050Section"
import { ContactWidget } from "./components/ContactWidget"
import { UnderConstructionPane } from './components/UnderConstructionPane';

interface WebPageProps
{

}

// State defines all private properties
interface WebPageState
{
    windowWidth: number;
    images: HTMLImageElement[],
    isAboveFold: boolean,
    isMobileWidth: boolean,
    heroImageHeight: number,
    isUnderConstruction: boolean,
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
            isUnderConstruction: false,
        };
    }
    
    componentDidMount()
    {
        window.addEventListener('scroll', this.handleScroll.bind(this), true);
        window.addEventListener('resize', this.handleWindowResize.bind(this), true);
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
        if ((window.pageYOffset > this.state.heroImageHeight) && this.state.isAboveFold)
        {
            this.setState({isAboveFold: false});
        }
        else if ((window.pageYOffset < this.state.heroImageHeight) && !this.state.isAboveFold)
        {
            this.setState({isAboveFold: true});
        }
    }

    render()
    {
        return (
            <div 
                className = "web_page"
                style = 
                {{
                    display: "block",
                    margin: "0px",
                    backgroundColor: BMStyle.sharedInstance.colors().BackgroundColor,
                    fontFamily: BMStyle.UITitleFont,
                    overflowX: "hidden",
                }}
            >
                <Header
                    style =
                    {{
                        position: "fixed",
                        top: "0",
                        width: "100%",
                        height: BMStyle.HeaderHeight,
                        display: "flex",
                        zIndex: 3,
                    }}
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
                        backgroundImage: "url(" + BMStyle.sharedInstance.images().HeroImage + ")",
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
                        <SubtitleButton text = {BMStyle.sharedInstance.text().Educator}  isMobileWidth = {this.state.isMobileWidth}></SubtitleButton>
                        <SubtitleButton text = {BMStyle.sharedInstance.text().Traveller}  isMobileWidth = {this.state.isMobileWidth}></SubtitleButton>
                        <SubtitleButton text = {BMStyle.sharedInstance.text().Developer}  isMobileWidth = {this.state.isMobileWidth}></SubtitleButton>
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
                    <Body5050Section imageSrc = {BMStyle.sharedInstance.images().DeveloperPortrait} text = {BMStyle.sharedInstance.text().DeveloperParagraphText} height="600px" reverse = {false} isMobileWidth = {this.state.isMobileWidth}></Body5050Section>
                    <Body5050Section imageSrc = {BMStyle.sharedInstance.images().EducatorPortrait} text = {BMStyle.sharedInstance.text().EducatorParagraphText} height="600px" reverse = {true} isMobileWidth = {this.state.isMobileWidth}></Body5050Section>
                    <Body5050Section imageSrc = {BMStyle.sharedInstance.images().TravellerPortrait} text = {BMStyle.sharedInstance.text().TravellerParagraphText} height="600px" reverse = {false} isMobileWidth = {this.state.isMobileWidth}></Body5050Section>
                </div>
                }

                {!this.state.isUnderConstruction &&
                    <ContactWidget isMobileWidth = {this.state.isMobileWidth}></ContactWidget>
                }
                
                
                {!this.state.isUnderConstruction &&
                    <Footer
                        style =
                        {{
                            position: "relative",
                            top: "0",
                            width: "100%",
                            height: "70px",
                            display: "flex",
                            zIndex: 3,
                        }}
                        isMobileWidth = {this.state.isMobileWidth}
                    >
                    </Footer>
                }
            </div>
        );
    }

}

ReactDOM.render (
    <WebPage />,
    document.getElementById("webpage_wrapper")
);
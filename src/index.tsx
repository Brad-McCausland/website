import * as React from "react";
import * as ReactDOM from "react-dom";

import "../index.css"
import { SlideShowView } from "./components/SlideShowView";
import { fetchImages } from "./utils/ImageLoader";
import { SubtitleButton } from "./components/SubtitleButton";
import { Header } from "./components/Header";
import { Body5050Section } from "./components/Body5050Section"
import { ContactWidget } from "./components/ContactWidget"
import { Button } from "./components/Button";
import { RoundedImage } from "./components/RoundedImage";

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
        var sampleText = "Someone once told me that time is a predator that stalks us all our lives, but I rather believe that time is a companion who goes with us on the journey, reminds us to cherish every moment, because they’ll never come again."

        return (
            <div className = "web_page">
                <Header
                    style =
                    {{
                        position: "fixed",
                        top: "0",
                        width: "100%",
                        height: "70px",
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
                        backgroundImage: "url(./src/images/hero_road_400_off.png)",
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
                            fontSize: this.state.isMobileWidth ? "10vw" : "5vw",
                            fontFamily: "Raleway",
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
                        <SubtitleButton text = "Educator"  isMobileWidth = {this.state.isMobileWidth}></SubtitleButton>
                        <SubtitleButton text = "Traveller" isMobileWidth = {this.state.isMobileWidth}></SubtitleButton>
                        <SubtitleButton text = "Developer" isMobileWidth = {this.state.isMobileWidth}></SubtitleButton>
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
                    <Body5050Section imageSrc = "./src/images/traveller_portrait.JPG" text = {sampleText} height="600px" reverse = {false} isMobileWidth = {this.state.isMobileWidth}></Body5050Section>
                    <Body5050Section imageSrc = "./src/images/educator_portrait2.jpg" text = "Flexbox is a one-dimensional layout method for laying out items in rows or columns. Items flex to fill additional space and shrink to fit into smaller spaces. This article explains all the fundamentals. Prerequisites: HTML basics (study Introduction to HTML)" height="600px" reverse = {true} isMobileWidth = {this.state.isMobileWidth}></Body5050Section>
                    <Body5050Section imageSrc = "./src/images/traveller_portrait.JPG" text = {sampleText} height="600px" reverse = {false} isMobileWidth = {this.state.isMobileWidth}></Body5050Section>
                </div>

                <ContactWidget></ContactWidget>
                
                <Header
                    style =
                    {{
                        position: "relative",
                        top: "0",
                        width: "100%",
                        height: "70px",
                        display: "flex",
                        zIndex: 3,
                    }}
                    isAboveFold = {this.state.isAboveFold}
                    isMobileWidth = {this.state.isMobileWidth}
                >
                </Header>
            </div>
        );
    }

    loadImages()
    {
        this.clearImages();
        const imageLoadPromise = fetchImages("http://localhost:8001/", 3000);
        imageLoadPromise.then((result: HTMLImageElement[]) =>
        {
            this.setState (
                {
                    images: result,
                }
            );
        }).catch((error: string) =>
        {
            console.log(error);
            var errorImage = new Image();
            errorImage.src = SlideShowView.ERROR_IMAGE_SRC;

            this.setState (
                {
                    images: [errorImage],
                }
            );
        });
    }
    
    clearImages()
    {
        this.setState (
            {
                images: [],
            }
        );
    }
}

ReactDOM.render (
    <WebPage />,
    document.getElementById("webpage_wrapper")
);
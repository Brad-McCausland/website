import * as React from "react";
import * as ReactDOM from "react-dom";

import { SlideShowView } from "./components/SlideShowView";
import { fetchImages } from "./utils/ImageLoader";
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
        };

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount()
    {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions()
    {
        this.setState({ windowWidth: window.outerWidth});
        
        console.log(this.state.windowWidth);
    }

    render()
    {
        const images = this.state.images;

        const windowWidth = window.innerWidth;
        const offsetToCenter = (1920 - windowWidth)/2;

        return (
            <div className = "web_page">
                <div className = "hero_image" style = {{
                    width: this.state.windowWidth,
                    height: this.state.windowWidth*.5625,
                    backgroundImage: "url(./src/images/hero_road.jpg)",
                    backgroundSize: "cover",
                    display: "flex",
                    flex: "1",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "auto"
                }}>
                    <div>
                        <h1 style = {{ color: "white", fontSize: "96px", fontFamily: "Raleway", textAlign: 'center'}}> Brad McCausland </h1>
                    </div>
                </div>

                <div className = "body" >
                    {/*
                    <SlideShowView width={600} height={600} images={images} showLoadingAnimationWhenEmpty={true}/>

                    <Button
                        value="load images"
                        onClick={() => this.loadImages()}
                    />
                    <Button
                        value="clear images"
                        onClick={() => this.clearImages()}
                    />
                    */}
                    <div className = "paragraph"
                         style = 
                         {{
                             backgroundColor: "white",
                             marginTop: "20px",
                             marginLeft: "20vw",
                             marginRight: "20vw",
                             maxWidth: "1080px",
                             minWidth: "400px",
                             height: "1000px",
                             display: "flex",
                             justifyContent: "center",
                             alignItems: "center"
                         }}>
                        <p>
                            This is a paragraph
                        </p>
                    </div>
                </div>
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
    document.getElementById("example")
);
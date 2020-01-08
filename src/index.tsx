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
    images: HTMLImageElement[],
}


class WebPage extends React.Component<WebPageProps, WebPageState>
{
    constructor(props: WebPageProps)
    {
        super(props);

        this.state =
        {
            images: [],
        };
    }

    render()
    {
        const headerStyle =
        {
            width: "100%",
            height: "300px",
            backgroundImage: "url(./src/images/pano.jpg)",
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        };

        const images = this.state.images;
        return (
            <div className = "web_page">

                <div className = "header" style = {headerStyle}>
                    <div>
                        <RoundedImage
                            src = "./src/images/portrait_square_right.png"
                            width = "200"
                            style =
                            {{
                                border: "7px solid white",
                                borderRadius: "50%",
                                display: "block",
                                marginLeft: "auto",
                                marginRight: "auto"
                            }}
                        />
                        <h1 style = {{ color: "white"}}> Brad McCausland </h1>
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
                             maxWidth: "1400px",
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
import * as React from "react";
import * as ReactDOM from "react-dom";

import { SlideShowView } from "./components/SlideShowView";
import { fetchImages } from "./utils/ImageLoader";
import { Button } from "./components/Button";

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
        const images = this.state.images;
        return (
            <div>
                <SlideShowView width={600} height={600} images={images} showLoadingAnimationWhenEmpty={true}/>

                <Button
                    value="load images"
                    onClick={() => this.loadImages()}
                />
                <Button
                    value="clear images"
                    onClick={() => this.clearImages()}
                />
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
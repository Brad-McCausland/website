import * as React from "react";
import * as ReactDOM from "react-dom";

import { SlideShowView } from "./components/SlideShowView";

interface WebPageProps
{

}

// State defines all private properties
interface WebPageState
{
    images: HTMLImageElement[],
    reserve: HTMLImageElement[],
}


class WebPage extends React.Component<WebPageProps, WebPageState>
{
    constructor(props: WebPageProps)
    {
        super(props);
        
        var image1 = new Image()
        var image2 = new Image()
        var image3 = new Image()

        image1.src = "src/images/portrait.png"
        image2.src = "src/images/pano.jpg"
        image3.src = "src/images/background.jpg"

        this.state =
        {
            images: [],
            reserve: [image1, image2, image3],
        };
    }

    render()
    {
        const images = this.state.images;
        return (
            <div>
                <SlideShowView width={600} height={600} images={images} initWithLoadingAnimation={true}/>

                <Button
                    value="load images"
                    onClick={() => this.setImages()}
                />
                <Button
                value="clear images"
                onClick={() => this.clearImages()}
            />
            </div>
        );
    }

    setImages()
    {
        let newImages = this.state.reserve;
        this.setState (
            {
                images: newImages,
            }
        );
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

interface ButtonProps
{
    value: string,
    onClick: () => void,
}

function Button(props: ButtonProps)
{
    return (
        <button
            className="reset_button"
            onClick={props.onClick}
        >
            {props.value}
        </button>
    )
}

ReactDOM.render (
    <WebPage />,
    document.getElementById("example")
);
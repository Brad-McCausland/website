// Smart image is an img element that takes two src urls: one to a full-sized asset and one to a smaller, 'thumbnail' asset. The element will display the smaller asset until the full-sized
// one has finished loading, then will rerender to display it. The Element is designed to be dynamic, and be re-rendered with new url sets, as in a swtich between light and dark mode. The
// element will store all sets of urls given to it, and whether or not it's full size version has been loaded. This allows the element to flip back to a previous src without having to reload
// the full asset.

import * as React from "react";
import "../styles/components/SmartImg.less";

interface SmartImgProps
{
    fullUrl: string,
    thumbnailUrl: string,
}

interface SmartImgState
{
    storedImages: {[key: string]: {thumbnailUrl: string, isLoaded: boolean}}
}

export class SmartImg extends React.Component<SmartImgProps, SmartImgState>
{
    constructor(props: SmartImgProps)
    {
        super(props);
        this.state = {storedImages: {}};
        
        this.addNewImage(this.props.fullUrl, this.props.thumbnailUrl);
    }

    // Object needs to rerender both on prop changes (changes to image by client) and internally motivated state changes (changing to full version when fully loaded)
    addNewImage(fullUrl: string, thumbnailUrl: string)
    {
        if (!(fullUrl in this.state.storedImages))
        {
            // Create entry
            var newStoredImages = this.state.storedImages;
            newStoredImages[fullUrl] = {thumbnailUrl: thumbnailUrl, isLoaded: false};
            this.setState({storedImages: newStoredImages});

            // Begin loading full image. Set 'isLoaded' to true when finished
            const imageLoader = new Image();
            imageLoader.src = fullUrl;
            imageLoader.onload = () =>
            {
                var newStoredImages = this.state.storedImages;
                newStoredImages[fullUrl] = {thumbnailUrl: thumbnailUrl, isLoaded: true};
                this.setState({storedImages: newStoredImages});
            };
        }
    }

    render ()
    {
        // Add new image being set through props by client code
        this.addNewImage(this.props.fullUrl, this.props.thumbnailUrl);

        const image = this.state.storedImages[this.props.fullUrl];
        const imgSrc = image.isLoaded? this.props.fullUrl : image.thumbnailUrl;

        return (
            <img className = "smart_img" src = {imgSrc}/>
        );
    }

    /*
    Sleep function for slowing down image load when testing locally
    sleep = (milliseconds: number) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    
    this.sleep(1000).then((() => {}
    */
}
import * as React from "react";

// Props define elements required to instantiate
interface SlideShowProps
{
    width: number,
    height: number,
    images: HTMLImageElement[],
    showLoadingAnimationWhenEmpty: boolean,
}

// State defines all private properties
interface SlideShowState
{
    currentImageIndex: number,
}

export class SlideShowView extends React.Component<SlideShowProps, SlideShowState>
{
    // TODO: Should the slideshowview own the error image?
    static ERROR_IMAGE_SRC = "./src/images/image_load_error.png";
    private LOADING_ANIMATION_SRC = "./src/images/loading.gif";

    constructor(props: SlideShowProps)
    {
        super(props);
        this.state = {currentImageIndex: 0}
    }

    render()
    {
        var currentImageSrc;
        var style = {};

        if (this.props.images.length)
        {
            // Display current image if images are loaded
            currentImageSrc = this.props.images[this.state.currentImageIndex].src;
        }
        else
        {
            // Display spinner gif if no images
            currentImageSrc = this.LOADING_ANIMATION_SRC;

            // Hide element if specified in props
            style = this.props.showLoadingAnimationWhenEmpty ? {} : {display: 'none'};
        }

        return (
            <div>
                <img
                    src         = {currentImageSrc}
                    style       = {style}
                    width       = {this.props.width}
                    height      = {this.props.height}
                    onMouseDown = {this.advanceImagePointer.bind(this)}
                />
            </div>
        );
    }

    advanceImagePointer(): void
    {
        var newIndex = (this.state.currentImageIndex + 1) % (this.props.images.length || 1); // mod by length of images OR 1 if length is zero
        this.setState( {currentImageIndex: newIndex} );
    }
}
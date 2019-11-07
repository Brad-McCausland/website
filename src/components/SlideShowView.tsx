import * as React from "react";

/* 
 * Class SlideShowView encapsulates properties/behaviors that allow for a group of images to be displayed in a
 * single element, and to be cycled through by click. The constructor takes a dictionary of values in order to
 * provide flexibility when creating the object. Any value not given when instantiating is replaced
 * with a default value. To display a SlideShowView, client code must add the SlideShowView's canvas property to the
 * document body.
 */

var stateEnum =
{
    EMPTY: 0,
    LOADING: 1,
    COMPLETE: 2,
    ERROR: 3
};

interface SlideShowProps
{
    width: number,
    height: number,
}

interface SlideShowState
{
    width: number,
    height: number,
    readyState: number,
    currentImageIndex: number,
    intervalID: number,
    errorImage: HTMLImageElement,
    images: HTMLImageElement[],
}

export class SlideShowView extends React.Component<SlideShowProps, SlideShowState>
{
    private canvasRef = React.createRef<HTMLCanvasElement>();

    constructor(props: SlideShowProps)
    {
        super(props);

        var errorImage = new Image()
        errorImage.src = "./src/images/image_load_error.png";

        errorImage.onload = () =>
        {
            this.displayError();
        }

        this.state = 
        {
            width: props.width,
            height: props.height,
            readyState: stateEnum.EMPTY,
            images: [],
            currentImageIndex: 0,
            intervalID: 0,
            errorImage: errorImage,
        }
    }

    render()
    {
        return (
            <div>
                <canvas ref={this.canvasRef} width={this.state.width} height={this.state.height} style={{backgroundColor: "#EEEEEE"}}/>
            </div>
        );
    }

    isEmpty(): boolean
    {
        return this.state.readyState === stateEnum.EMPTY;
    }

    isLoading(): boolean
    {
        return this.state.readyState === stateEnum.LOADING;
    }

    isComplete(): boolean
    {
        return this.state.readyState === stateEnum.COMPLETE;
    }

    isError(): boolean
    {
        return this.state.readyState === stateEnum.ERROR;
    }

    addImage(image: HTMLImageElement): void
    {
        if (!this.state.images.length)
        {
            // Remove loading animation if this is the first time an image is added
            if (this.state.intervalID)
            {
                clearInterval(this.state.intervalID);
            }
        }
        this.state.images.unshift(image);
    }

    // Loads error image from local storage, pushes it into the slideshow, and displays it
    displayError(callback?: () => void): void
    {
        const canvas = this.canvasRef.current;
        if (canvas)
        {
            const context = canvas.getContext("2d");
            if (context)
            {
                // Remove loading animation
                if (this.state.intervalID)
                {
                    clearInterval(this.state.intervalID);
                }

                // Clear slideshow
                this.clearImages();

                // Display error image
                context.drawImage(this.state.errorImage, 0, 0);
                
                this.setState (
                    {
                        readyState: stateEnum.ERROR,
                    }
                )

                if (callback)
                {
                    callback();
                }
            }
        }
    }


    clearImages(): void
    {
        this.setState (
            {
                images: [],
            }
        )
    }
/*
    // Loads loading animation from local storage and displays it in photo view
    addLoadingAnimation(): void
    {
        this.images = [];
        this.state = stateEnum.LOADING;

        let loadingImage = new Image();
        loadingImage.src = "services/image_service/other_images/loading.png";

        var loadingAnimation = new AnimatableImage(loadingImage, 0, 12, 256, 256);

        if (!this.images.length)
        {
            // Center loading image in the loading view
            let width = (this.canvas.width - 256)/2;
            let height = (this.canvas.height - 256)/2;

            this.intervalID = window.setInterval(this.animateImageInCanvas, 100, this.canvas.getContext("2d"), width, height, loadingAnimation);
        }
    }

    animateImageInCanvas(context: CanvasRenderingContext2D, x: number, y: number, iobj: AnimatableImage): void
    {
        if (iobj.source != null)
        {
            context.drawImage
            (
                iobj.source,                    // Image object
                iobj.currentFrame * iobj.width, 0,   // Coordinates of top left corner of sub-rectangle (multiply frame count by width to get current frame)
                iobj.width, iobj.height,        // Width and height of sub-rectangle
                x, y,                           // Destination in target canvas
                iobj.width, iobj.height         // Width and height to draw the source at
            );
            // Iterate one frame in image
            iobj.currentFrame = (iobj.currentFrame + 1) % iobj.totalFrames;
        }
    }*/
}

class AnimatableImage
{
    source: HTMLImageElement;
    currentFrame: number;
    totalFrames: number;
    width: number;
    height: number;

    constructor(source: HTMLImageElement, currentFrame: number, totalFrames: number, width: number, height: number)
    {
        this.source = source;
        this.currentFrame = currentFrame;
        this.totalFrames = totalFrames;
        this.width = width;
        this.height = height;
    }
}
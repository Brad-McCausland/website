import * as React from "react";

// Enum for defining Slideshow's states
var stateEnum =
{
    EMPTY: 0,
    LOADING: 1,
    READY: 2,
    ERROR: 3
};

// Props define elements required to instantiate
interface SlideShowProps
{
    width: number,
    height: number,
    images: HTMLImageElement[],
    initWithLoadingAnimation: boolean,
}

// State defines all private properties
interface SlideShowState
{
    readyState: number,
    currentImageIndex: number,
    intervalID: number,
}

export class SlideShowView extends React.Component<SlideShowProps, SlideShowState>
{
    private canvasRef = React.createRef<HTMLCanvasElement>();
    private errorImage = new Image()
    private loadingAnimation = new Image();

    render()
    {
        return (
            <div>
                <canvas
                    ref={this.canvasRef}
                    width={this.props.width}
                    height={this.props.height}
                    style={{backgroundColor: "#EEEEEE"}} 
                    onClick={() => this.displayNextImage()}
                />
            </div>
        );
    }

    constructor(props: SlideShowProps)
    {
        super(props);

        this.errorImage.src = "./src/images/image_load_error.png";
        this.loadingAnimation.src = "./src/images/loading.png";

        this.state = 
        {
            readyState: stateEnum.EMPTY,
            currentImageIndex: -1,
            intervalID: 0
        }
    }

    componentDidMount()
    {
        // Display first photo when it loads
        if (this.props.images.length)
        {
            this.props.images[0].onload = this.setReady.bind(this);
        }

        // Set to loading state if specified by caller
        if (this.props.initWithLoadingAnimation)
        {
            this.setLoading();
        }
    }

    isEmpty(): boolean
    {
        return this.state.readyState === stateEnum.EMPTY;
    }

    isLoading(): boolean
    {
        return this.state.readyState === stateEnum.LOADING;
    }

    isReady(): boolean
    {
        return this.state.readyState === stateEnum.READY;
    }

    isError(): boolean
    {
        return this.state.readyState === stateEnum.ERROR;
    }

    setEmpty(): void
    {
        this.setState(
            {
                readyState: stateEnum.EMPTY,
            }
        )
        this.endLoadingAnimation();
    }

    setLoading(): void
    {
        this.setState(
            {
                readyState: stateEnum.LOADING,
            }
        )
        this.displayLoadingAnimation()
    }

    setReady(): void
    {
        this.setState(
            {
                readyState: stateEnum.READY,
            }
        )
        this.endLoadingAnimation();
        this.displayNextImage();
    }

    setError(): void
    {
        this.setState(
            {
                readyState: stateEnum.ERROR,
            }
        )
        this.endLoadingAnimation();
        this.displayError();
    }

    addImage(image: HTMLImageElement): void
    {
        this.props.images.unshift(image);

        // If the component is not already displaying images, display the new image when it's loaded and set state accordingly. TODO: Reconsider if this is a good idea
        if (!this.isReady())
        {
            image.onload = () =>
            {
                this.setReady();
            }
        }
    }

    displayNextImage(): void
    {
        if (this.props.images.length && this.isReady())
        {
            var newIndex = (this.state.currentImageIndex + 1) % this.props.images.length;

            this.displayImage(this.props.images[newIndex]);
            this.setState (
            {
                currentImageIndex: newIndex,
            });
        }
        else
        {
            console.log("Attempted to display next image when no images are loaded!")
        }
    }

    // Loads error image from local storage, pushes it into the slideshow, and displays it
    displayError(callback?: () => void): void
    {
        this.displayImage(this.errorImage);
        if (callback)
        {
            callback();
        }
    }

    displayImage(image: HTMLImageElement): void
    {
        const canvas = this.canvasRef.current;
        if (canvas)
        {
            const context = canvas.getContext("2d");
            if (context)
            {
                // Clear previous image
                this.clearCanvas();

                // Display image
                context.drawImage(image, 0, 0, canvas.width, canvas.height);
            }
        }
    }

    // Loads loading animation from local storage and displays it in photo view
    displayLoadingAnimation(): void
    {
        var loadingAnimation = new AnimatableImage(this.loadingAnimation, 0, 12, 256, 256);

        // Center loading image in the loading view
        let width = (this.props.width - 256)/2;
        let height = (this.props.height - 256)/2;
        
        const canvas = this.canvasRef.current;
        if (canvas)
        {
            const context = canvas.getContext("2d");
            if (context)
            {
                this.clearCanvas();

                this.setState(
                    {
                        intervalID: window.setInterval(this.animateImageInCanvas, 100, canvas.getContext("2d"), width, height, loadingAnimation)
                    }
                )
            }
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
    }

    endLoadingAnimation()
    {
        if (this.state.intervalID)
        {
            clearInterval(this.state.intervalID);
        }
        this.clearCanvas();
    }

    clearCanvas()
    {
        const canvas = this.canvasRef.current;
        if (canvas)
        {
            const context = canvas.getContext("2d");
            if (context)
            {
                context.clearRect(0, 0, canvas.width, canvas.height)
            }
        }
    }
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
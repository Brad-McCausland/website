import * as React from "react";

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
    currentImageIndex: number,
    intervalID: number,
}

export class SlideShowView extends React.Component<SlideShowProps, SlideShowState>
{
    private canvasRef = React.createRef<HTMLCanvasElement>();
    private errorImage = new Image();
    private loadingAnimation = new Image();

    render()
    {
        console.log("render");

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

    componentDidUpdate(prevProps: SlideShowProps)
    {
        console.log("component update");
        if (prevProps.images !== this.props.images)
        {

            if (this.props.images.length)
            {
                console.log("has images, should end animation");
                this.endLoadingAnimation();
            }
            else
            {
                console.log("does not have images, should display animation");
                this.displayLoadingAnimation();
            }

            if (this.props.images.length)
            {
                console.log("images prop not equal, displaying next image");
                this.displayNextImage();
            }
        }
    }

    constructor(props: SlideShowProps)
    {
        super(props);

        this.errorImage.src = "./src/images/image_load_error.png";
        this.loadingAnimation.src = "./src/images/loading.png";

        this.state = 
        {
            currentImageIndex: -1,
            intervalID: 0
        }
    }

    componentDidMount()
    {
        console.log("component mount");
        // Set to loading state if specified by caller
        if (this.props.initWithLoadingAnimation && !this.props.images.length)
        {
            this.displayLoadingAnimation();
        }
    }

    displayNextImage(): void
    {
        if (this.props.images.length)
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

    // TODO: Replace with something more 'reacty'. Display the current image in a div in render()
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
            console.log("cleared interval");
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
                console.log("canvas cleared");
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
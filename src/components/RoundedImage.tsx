import * as React from "react";

// Wrapper around img component to make rounded images. Defaults to circular images with no border and no onClick.
// Height parameter is optional, component will use width value for both dimensions if not supplied
// Note: should be used only with a square image if the intention is to create circular images

interface RoundedImageProps
{
    src: string,
    className?: string,
    radius?: string,
    border?: string,
    width: string,
    height?: string,
    onClick?: () => void,
}

interface RoundedImageState
{
}

export class RoundedImage extends React.Component<RoundedImageProps, RoundedImageState>
{
    constructor(props: RoundedImageProps)
    {
        super(props);
    }

    render ()
    {
        const style = 
        {
            borderRadius: this.props.radius || "50%",
            border: this.props.border || ""
        };

        return (
            <img
                src = {this.props.src}
                className = {this.props.className || "rounded_image"}
                width = {this.props.width}
                height = {this.props.height || this.props.width}
                onClick = {this.props.onClick}
                style = {style}
            />
        )
    }
}
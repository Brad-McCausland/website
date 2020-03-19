import * as React from "react";
import { BMStyle } from '../BMStyle';

export enum BodySectionType
{
    developer,
    educator,
    traveller
}

/*
 * A body 50/50 object displays two elements, an image and a body of text. Elements are arranged side by side when in desktop mode, and overlaid in mobile mode
 */

interface Body5050SectionProps
{
    imageSrc: string,
    height: string,
    reverse: boolean,
}

interface Body5050SectionState
{
}

export class Body5050Section extends React.Component<Body5050SectionProps, Body5050SectionState>
{
    constructor(props: Body5050SectionProps)
    {
        super(props);
    }

    render()
    {
        //Alternative solution: create a 'stringify' utility that takes a string and an arbitrary number of substring/url pairs. Will return a text object with each substring in the input string replaced with a link to the corresponding url.
            return (
                <BMStyle.StateContext.Consumer>
                {({IsAboveFold, IsMobileWidth}) => (
                    <div
                        className = "body_5050_section"
                        style = 
                        {{
                            height: this.props.height,
                            width: "100%",
                            position: "relative",
                            display: IsMobileWidth ? "block" : "flex",
                            flexDirection: this.props.reverse ? "row-reverse" : "row",
                            alignItems: "center",
                        }}
                    >
                        <div
                            className = "image_div"
                            style = 
                            {{
                                position: IsMobileWidth ? "absolute" : "relative",
                                flex: "50%",
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            
                            <div
                                className = "image_shader"
                                style = 
                                {{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: "#000000",
                                    opacity: 0.3,
                                    display: IsMobileWidth ? "flex" : "none",
                                }}
                            >
                            </div>
                            <img
                                src = {this.props.imageSrc}
                                style = 
                                {{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            >
                            </img>
                        </div>

                        <div
                            className = "text_div"
                            style = 
                            {{
                                position: IsMobileWidth ? "absolute" : "relative",
                                display: "flex",
                                flex: "50%",
                                width: "100%",
                                height: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {this.props.children}
                        </div>
                    </div>
                )}
            </BMStyle.StateContext.Consumer>
        );
    }
}
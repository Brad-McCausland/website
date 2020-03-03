import * as React from "react";
import { BMStyle } from '../BMStyle';

/*
 * A body 50/50 object displays two elements, an image and a body of text. Elements are arranged side by side when in desktop mode, and overlaid in mobile mode
 */

interface Body5050SectionProps
{
    imageSrc: string,
    text: string,
    height: string,
    reverse: boolean,
    isMobileWidth: boolean,
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
        return (
            <div
                className = "body_5050_section"
                style = 
                {{
                    height: this.props.height,
                    width: "100%",
                    position: "relative",
                    display: this.props.isMobileWidth ? "block" : "flex",
                    flexDirection: this.props.reverse ? "row-reverse" : "row",
                    alignItems: "center",
                }}
            >
                <div
                    className = "image_div"
                    style = 
                    {{
                        position: this.props.isMobileWidth ? "absolute" : "relative",
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
                            display: this.props.isMobileWidth ? "flex" : "none",
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
                        position: this.props.isMobileWidth ? "absolute" : "relative",
                        display: "flex",
                        flex: "50%",
                        width: "100%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <BMStyle.ThemeContext.Consumer>
                        {theme => (
                            <p
                                style = 
                                {{
                                    fontSize: this.props.isMobileWidth? "7vw" : "3vw",
                                    fontFamily: BMStyle.UIContentFont,
                                    color: this.props.isMobileWidth ? theme.colors.BodyTextMobileWidthColor : theme.colors.BodyTextColor,
                                    margin: "0px",
                                    padding: "2vw",
                                    textAlign: "justify",
                                    textAlignLast: "center",
                                }}
                            >
                                {this.props.text}
                            </p>
                        )}
                    </BMStyle.ThemeContext.Consumer>
                </div>
            </div>
        )
    }
}
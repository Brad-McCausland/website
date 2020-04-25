import * as React from "react";
import { BMStyle } from "../BMStyle";
import "../styles/components/Body5050Section.less";
import { SmartImg } from "./SmartImg";
import ReactFitText = require("react-fittext");

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
        return (
            <BMStyle.ThemeContext.Consumer>
                {theme => (
                    <BMStyle.StateContext.Consumer>
                        {({IsMobileWidth}) => (
                            <BMStyle.LanguageContext.Consumer>
                                {language => (
                                    <div
                                        className = "body_5050_section"
                                        style = 
                                            {{
                                                height: this.props.height,
                                                display: IsMobileWidth ? "block" : "flex",
                                                flexDirection: this.props.reverse ? "row-reverse" : "row",
                                            }}
                                    >
                                        <div
                                            className = "image_div"
                                            style = {{position: IsMobileWidth ? "absolute" : "relative"}}
                                        >
                                            
                                            <div
                                                className = "image_shader"
                                                style =  {{display: IsMobileWidth ? "flex" : "none",}}
                                            >
                                            </div>
                                            <SmartImg
                                                fullUrl = {this.props.imageSrc}
                                                thumbnailUrl = "../images/mag.png" //TODO: create thumbnails for body images
                                            />
                                        </div>

                                        <div
                                            className = "text_div"
                                            style = 
                                                {{
                                                    position: IsMobileWidth ? "absolute" : "relative",
                                                }}
                                        >
                                            <ReactFitText compressor={2.1} minFontSize={language.LangCode === "EN"? 26 : 22} maxFontSize={language.LangCode === "EN"? 48 : 40}>
                                                <p
                                                    style = 
                                                        {{
                                                            color: IsMobileWidth ? theme.colors.BodyTextMobileWidthColor : theme.colors.BodyTextColor,
                                                            padding: IsMobileWidth? "5vw" : "2vw"
                                                        }}
                                                >
                                                    {this.props.children}
                                                </p>
                                            </ReactFitText>
                                        </div>
                                    </div>
                                )}
                            </BMStyle.LanguageContext.Consumer>
                        )}
                    </BMStyle.StateContext.Consumer>
                )}
            </BMStyle.ThemeContext.Consumer>
        );
    }
}
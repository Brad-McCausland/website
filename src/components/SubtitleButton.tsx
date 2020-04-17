import * as React from "react";
import { BMStyle } from "../BMStyle";
import "../styles/SubtitleButton.less";

interface SubtitleButtonProps
{
    text: string,
    className?: string,
    onClick?: () => void,
}

interface SubtitleButtonState
{
    wrapperRef: React.RefObject<HTMLDivElement>,
    hovered: Boolean
}

export class SubtitleButton extends React.Component<SubtitleButtonProps, SubtitleButtonState>
{
    constructor(props: SubtitleButtonProps)
    {
        super(props);
        this.state = {
            wrapperRef: React.createRef(),
            hovered: false
        };
    }

    render ()
    {
        return (
            <BMStyle.ThemeContext.Consumer>
                {theme => (
                    <BMStyle.StateContext.Consumer>
                        {({IsMobileWidth}) => (
                            <div ref = {this.state.wrapperRef} className = "wrapper">
                                <h1
                                    className = {this.props.className || "subtitle_button"}
                                    onClick = {this.props.onClick}
                                    onMouseEnter = {this.mouseEnter.bind(this)}
                                    onMouseLeave = {this.mouseLeave.bind(this)}
                                    style =
                                        {{
                                            color: this.state.hovered ? theme.colors.HeroTitleHoveredColor : theme.colors.HeroTitleColor,
                                            fontSize: this.state.hovered ? (IsMobileWidth? "5.4vw" : "2.7vw") : (IsMobileWidth? "5vw" : "2.5vw"),
                                            cursor: this.props.onClick? "pointer" : "auto",
                                        }}
                                >
                                    {this.props.text}
                                </h1>
                            </div>
                        )}
                    </BMStyle.StateContext.Consumer>
                )}
            </BMStyle.ThemeContext.Consumer>
        );
    }

    mouseEnter()
    {
        this.setState({hovered: true});
    }

    mouseLeave()
    {
        this.setState({hovered: false});
    }
}
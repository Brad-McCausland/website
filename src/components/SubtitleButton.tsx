import * as React from "react";
import { BMStyle } from '../BMStyle';

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
                {({IsAboveFold, IsMobileWidth}) => (
                    <div ref = {this.state.wrapperRef} className="wrapper">
                        <h1
                            className = {this.props.className || "SubtitleButton"}
                            onClick = {this.props.onClick}
                            onMouseEnter = {this.mouseEnter.bind(this)}
                            onMouseLeave = {this.mouseLeave.bind(this)}
                            style = {{
                                color: this.state.hovered ? theme.colors.HeroTitleHoveredColor : theme.colors.HeroTitleColor,
                                fontSize: this.state.hovered ? (IsMobileWidth? '5.4vw' : '2.7vw') : (IsMobileWidth? '5vw' : '2.5vw'),
                                fontFamily: BMStyle.UITitleFont,
                                display: 'inline',
                                marginLeft: '1.5vw',
                                marginRight: '1.5vw',
                                transition: "color 0.7s, font-size 0.7s",
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
        )
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
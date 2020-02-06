import * as React from "react";
import { BMStyle } from '../BMStyle';

interface SubtitleButtonProps
{
    text: string,
    isMobileWidth: boolean,
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
        const fontSize = this.props.isMobileWidth ? '5vw' : '2.5vw';
        const hoveredFontSize = this.props.isMobileWidth ? '5.4 vw' : '2.7vw';

        const defaultStyle = {
            color: this.state.hovered ? '#ffa000' : 'white',
            fontSize: this.state.hovered ? hoveredFontSize : fontSize,
            fontFamily: BMStyle.UITitleFont,
            display: 'inline',
            marginLeft: '1.5vw',
            marginRight: '1.5vw',
            transition: "color 0.7s, font-size 0.7s",
        };

        return (
            <div ref = {this.state.wrapperRef} className="wrapper">
                <h1
                    style = {defaultStyle}
                    className = {this.props.className || "SubtitleButton"}
                    onClick = {this.props.onClick}
                    onMouseEnter = {this.mouseEnter.bind(this)}
                    onMouseLeave = {this.mouseLeave.bind(this)}
                >
                    {this.props.text}
                </h1>
            </div>
            
        )
    }

    mouseEnter()
    {
        /*
        const wrapper = this.state.wrapperRef.current;
        if (wrapper)
        {
            wrapper.classList.toggle("is-text-hovered");
        }
        */
       this.setState({hovered: true});
    }

    mouseLeave()
    {
        //this.mouseEnter();
        this.setState({hovered: false});
    }
}
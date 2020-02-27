import * as React from "react";
import { BMStyle } from '../BMStyle';

/*
 * A semi-transparent 'under construction' pane to cover the hero image while then site is under construction
 */

interface UnderConstructionPaneProps
{
    isMobileWidth: boolean,
    onThreeClicks?: () => void,
}

interface UnderConstructionPaneState
{
    hiddenButtonClickCount: number,
}

export class UnderConstructionPane extends React.Component<UnderConstructionPaneProps, UnderConstructionPaneState>
{
    constructor(props: UnderConstructionPaneProps)
    {
        super(props);
        this.state =
        {
            hiddenButtonClickCount: 4,
        }
    }

    // The hidden button, when clicked three times, will remove the under construction pane and unlock the full site.
    handleHiddenButtonClicked()
    {
        this.setState
        ({
            hiddenButtonClickCount: this.state.hiddenButtonClickCount - 1,
        })

        if (this.state.hiddenButtonClickCount === 1 && this.props.onThreeClicks)
        {
            this.props.onThreeClicks();
        }
    }

    render ()
    {
        var githubLink = <a href={BMStyle.GithubUrl} target="_blank" style = {{color: BMStyle.sharedInstance.colors().UIMainColor}}>Github</a>;
        var linkedinLink = <a href={BMStyle.LinkedInUrl} target="_blank" style = {{color: BMStyle.sharedInstance.colors().UIMainColor}}>Linkedin</a>;
        return (
            <div
            className = "under_construction_pane"
            style =
            {{
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                zIndex: 3,
            }}
            >
                <div
                    className = "under_construction_text"
                    style = 
                    {{
                        width: this.props.isMobileWidth ? "80vw" : "50vw",
                        height: this.props.isMobileWidth ? "80vh" : "50vh",
                        position: "relative",
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        borderRadius: "16px",
                        justifyContent: "center",
                        textAlign: "center",
                        overflow: "auto",
                    }}
                >
                    <button
                        className = "hidden_button"
                        onClick = {() => this.handleHiddenButtonClicked()}
                        style = 
                        {{
                            position: "relative",
                            width: "40px",
                            height: "40px",
                            marginLeft: "0px",
                            color: "white",
                            backgroundColor: "rgba(0, 0, 0, 0.0)",
                            border: "none",
                            outline: "none",
                        }}
                    >
                        {this.state.hiddenButtonClickCount < 4 ? this.state.hiddenButtonClickCount : ""}
                    </button>
                    <h1
                        style = 
                        {{
                            color: "#ffffff",
                            position: "relative",
                            fontFamily: BMStyle.UITitleFont,
                            textAlign: "center",
                            fontSize: "40px",
                        }}
                    >
                        Under Construction!
                    </h1>
                    <text
                        style =
                        {{
                            color: "#ffffff",
                            position: "relative",
                            fontFamily: BMStyle.UIContentFont,
                            fontSize: "24px",
                            textAlign: "center",
                            display: "inline-block",
                            padding: "24px",
                        }}
                    >
                        Building a website is slow work, especially when it's your first one! I'm developing this site as part of my quest to learn web development technologies, ReactJs in particular, and one day soon will host my blog, resumé, portfolio (of which this site will be a part), and whatever else strikes my fancy. In the meantime, you can track my progress on my {githubLink}, or get in touch with me on {linkedinLink}!
                    </text>
                </div>
            </div>
        )
    }
}
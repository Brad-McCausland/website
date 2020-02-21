import * as React from "react";
import { BMStyle } from '../BMStyle';

/*
 * A semi-transparent 'under construction' pane to cover the hero image while then site is under construction
 */

interface UnderConstructionPaneProps
{
}

interface UnderConstructionPaneState
{
}

export class UnderConstructionPane extends React.Component<UnderConstructionPaneProps, UnderConstructionPaneState>
{
    constructor(props: UnderConstructionPaneProps)
    {
        super(props);
    }

    render ()
    {
        var githubLink = <a href={BMStyle.GithubUrl} target="_blank" style = {{color: BMStyle.UIMainColor}}>Github</a>;
        var linkedinLink = <a href={BMStyle.LinkedInUrl} target="_blank" style = {{color: BMStyle.UIMainColor}}>Linkedin</a>;
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
                        width: "40vw",
                        height: "40vh",
                        position: "relative",
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        borderRadius: "16px",
                        justifyContent: "center",
                        textAlign: "center",
                    }}
                >
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
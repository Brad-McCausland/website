import * as React from "react";
import { BMStyle } from "../BMStyle";
import ReactFitText = require("react-fittext");
import "../styles/components/BlogEntryCell.less";

/*
 * Advertises a single blog entry in the blog home page
 */

interface BlogEntryCellProps
{
    image: string,
    title: string,
    date: string,
    link: string
}

interface BlogEntryCellState
{
}

export class BlogEntryCell extends React.Component<BlogEntryCellProps, BlogEntryCellState>
{
    constructor(props: BlogEntryCellProps)
    {
        super(props);
    }

    render ()
    {
        return (
            <BMStyle.ThemeContext.Consumer>
                {theme => (
                    <div
                        className = "blog_entry_cell"
                        style = 
                        {{
                            backgroundColor: theme.colors.BackgroundColor
                        }}
                    >
                        <img
                            className = "blog_entry_img"
                            src = {this.props.image}
                        />

                        <div className = "blog_entry_text_elements">
                            
                            <ReactFitText compressor={1.1} maxFontSize={48}>
                                <h1
                                    className = "blog_entry_title"
                                    style =
                                    {{
                                        color: theme.colors.BodyTextColor
                                    }}
                                >
                                    {this.props.title}
                                </h1>
                            </ReactFitText>


                            <ReactFitText compressor={1.1} maxFontSize={24}>
                                <h2
                                    className = "blog_entry_date"
                                    style =
                                    {{
                                        color: theme.colors.BodyTextColor
                                    }}
                                >
                                    {this.props.date}
                                </h2>
                            </ReactFitText>
                        </div>
                    </div>
                )}
            </BMStyle.ThemeContext.Consumer>
        )
    }
}
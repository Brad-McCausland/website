import * as React from 'react';
import { BMStyle, inLineTextLinkPair } from '../BMStyle';

/*
 * Function clickableTextLink takes a text/link pair and returns an <a> component with it's href set to the supplied url
 */
function clickableTextLink(link: inLineTextLinkPair)
{
    return (
        <BMStyle.ThemeContext.Consumer>
        {theme => (
            <a
                href = {link.url}
                style = 
                {{
                    color: theme.colors.UIMainColor,
                    textDecoration: "none",
                }}
            > {link.text} </a>
        )}
        </BMStyle.ThemeContext.Consumer>
    )
}

/*
 * Function clickableTextLink takes a text/link pair and returns an <a> component with it's href set to the supplied url
 */
function recursiveSplicer(input: any[], ...linkWords: inLineTextLinkPair[])
{
    var returnText: any[] = [];

    for (var element of input)
    {
        if (typeof element === "string")
        {
            if (linkWords.length > 0)
            {
                //TODO: Handle keywords in first, last position. Handle when keywords occur more than once
                var link = clickableTextLink(linkWords[0]);
                var substringPosition = element.indexOf(linkWords[0].text);
                if (substringPosition > -1)
                {
                    returnText.push(...[element.slice(0, substringPosition), link, element.slice(substringPosition + linkWords[0].text.length)]);
                    returnText.push(...recursiveSplicer(returnText, ...linkWords.slice(1)));
                }
            }
        }
    }
    return returnText;
}

/*
 * Function Linkify takes a string and an arbitrary number of substring/link pairs, and returns a paragraph object containing the first string with each instance of
 * a supplied substring replaced with a link to the corresponding url
 * Input
 *     - text: a string which contains substrings that need to be converted into links.
 *     - substrings: an arbitrary amount of substring/url pairs to be inserted into the text.
 */
export function Linkify(text: string, ...linkWords: inLineTextLinkPair[])
{
    var content = recursiveSplicer([text], ...linkWords);
    console.log("huehue: " + content);
    return (
        <BMStyle.ThemeContext.Consumer>
        {theme => (
            <BMStyle.StateContext.Consumer>
            {({IsAboveFold, IsMobileWidth}) => (
                <p
                    style = 
                    {{
                        fontSize: IsMobileWidth? "5vw" : "2vw",
                        fontFamily: BMStyle.UIContentFont,
                        color: IsMobileWidth ? theme.colors.BodyTextMobileWidthColor : theme.colors.BodyTextColor,
                        margin: "0px",
                        padding: IsMobileWidth? "5vw" : "2vw",
                        textAlign: "justify",
                        textAlignLast: "center",
                    }}
                >
                    {content}
                </p>
            )}
            </BMStyle.StateContext.Consumer>
        )}
        </BMStyle.ThemeContext.Consumer>
    )
}
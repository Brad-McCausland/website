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
 * Function clickableTextLink identifies a linkWord in the given string and splits the string into the text before the link word, a linkified link word, and the remaining text after the link word.
 * The preceding and trailing substrings are recursed upon to find more key words. The function returns the concatenation of the link with the text on either side.
 */
function recursiveSplicer(input: string, ...linkWords: inLineTextLinkPair[])
{
    var returnText: any = input;

    var substringStart = -1;
    var currentLinkWord = null;

    // Find the first occurance of any link word and set substringStart, currentLinkWord
    for (currentLinkWord of linkWords)
    {
        substringStart = input.toLowerCase().indexOf(currentLinkWord.text.toLowerCase());
        if (substringStart > -1)
        {
            // No need to continue if a match is found
            break;
        }
    }

    // If linkword found, split input into two substrings on either side of the linkword, recurse on both substrings, then set returnText equal to the combined result
    if (substringStart > -1 && currentLinkWord !== null)
    {
        const substringEnd = substringStart + currentLinkWord.text.length;

        var firstSubstring = input.slice(0, substringStart);
        var link = clickableTextLink(
        {
            // Create new text/url pair with text from input to preserve capitalization
            text: input.slice(substringStart, substringEnd),
            url: currentLinkWord.url
        });
        var secondSubstring = input.slice(substringEnd);

        returnText = [recursiveSplicer(firstSubstring, ...linkWords), link, recursiveSplicer(secondSubstring, ...linkWords)];
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
    var content = recursiveSplicer(text, ...linkWords);
    
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
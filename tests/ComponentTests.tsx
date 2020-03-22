import * as React from 'react';
import { Linkify } from '../src/utils/Linkify';
import { expect } from 'chai';
import { BMStyle } from '../src/BMStyle';
import 'mocha';


describe('Test Functions', () =>
{
    it("Tautological test function to verify tests are working as expected. Should always be true.", () =>
    {
        const val = true;
        expect(val).to.equal(true);
    });

    /*
    it("Should return a <p> component with all keywords replaced with <a> components with the same text and an href", () =>
    {
        //TODO: Ask Ryan how to provide context for consumer components in unit test
        <BMStyle.ThemeContext.Provider value = {...BMStyle.LightTheme, ...{toggleTheme: () => console.log("Toggle!")}}>

        const result = Linkify("Please replace this text!", {text: "this text", url: "www.testurl.com"});
        expect(result).to.equal(
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
                        Please replace <a href = "www.testurl.com">this text</a>!
                    </p>
                )}
                </BMStyle.StateContext.Consumer>
            )}
            </BMStyle.ThemeContext.Consumer>
        )
        </BMStyle.ThemeContext.Provider>
    });
    */
});
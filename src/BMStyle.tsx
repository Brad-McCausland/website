import * as React from "react";

// This file acts as a centralized location to store all style elements that are used more than once throughout the site

export interface BMThemeContext
{
    // Constants
    colors:
    {
        UIMainColor: string,
        UIDarkColor: string,
        UIDisabledColor: string,
        
        BackgroundColor: string,
        BodyTextColor: string,
        BodyTextMobileWidthColor: string,
    
        HeroTitleColor: string,
        HeroTitleHoveredColor: string,

        ContactBackgroundColor: string,
        ContactTextColor: string,
    },
    images:
    {
        HeroImage: string,
        HeroImagePlaceholder: string,
        DeveloperPortrait: string,
        EducatorPortrait: string,
        TravellerPortrait: string,
    },

    // Function given and implemented by provider objects and called by consumers to handle theme switching.
    toggleTheme: () => void,
}

export interface BMLanguageContext
{
    Educator: string,
    Traveller: string,
    Developer: string,
    DarkMode: string,
    Language: string,
    Contact: string,
    Name: string,
    Email: string,
    YourMessage: string,
    Submit: string,
    DeveloperParagraphText: string,
    EducatorParagraphText: string,
    TravellerParagraphText: string,

    // Function given and implemented by provider objects and called by consumers to handle language switching.
    toggleLanguage: () => void,
}

export class BMStyle
{
    static LightTheme = 
    {
        colors:
        {
            UIMainColor: "#ffa000",
            UIDarkColor: "#d17627", //"#ff7700";
            UIDisabledColor: "#aaaaaa",
            
            BackgroundColor: "#eeeeee",
            BodyTextColor: "#666666",
            BodyTextMobileWidthColor: "#eeeeee",
        
            HeroTitleColor: "#ffffff",
            HeroTitleHoveredColor: "#ffa000",
    
            ContactBackgroundColor: "#dddddd",
        },
        images:
        {
            HeroImage: "./src/images/hero_light.png",
            HeroImagePlaceholder: "./src/images/hero_light_placeholder.png",
            DeveloperPortrait: "./src/images/portrait_light.png",
            EducatorPortrait: "./src/images/educator_portrait2.png",
            TravellerPortrait: "./src/images/traveller_image_light.png"
        }
    } as BMThemeContext

    static DarkTheme = 
    {
        colors:
        {
            UIMainColor: "#ef7e00",
            UIDarkColor: "#d17627",
            UIDisabledColor: "#666666",
            
            BackgroundColor: "#010011",
            BodyTextColor: "#ebebeb",
            BodyTextMobileWidthColor: "#eeeeee",
        
            HeroTitleColor: "#ffffff",
            HeroTitleHoveredColor: "#ef7e00",
    
            ContactBackgroundColor: "#2c2c2c",
            ContactTextColor: "#ebebeb",
        },
        images:
        {
            HeroImage: "./src/images/hero_dark.png",
            HeroImagePlaceholder: "./src/images/hero_dark_placeholder.png",
            DeveloperPortrait: "./src/images/portrait_dark.png",
            EducatorPortrait: "./src/images/educator_portrait2.png",
            TravellerPortrait: "./src/images/traveller_image_dark.png",
        }
    } as BMThemeContext

    // Text
    static EnglishText =
    {
        Educator: "Educator",
        Traveller: "Traveller",
        Developer: "Developer",
        DarkMode: "Dark Mode",
        Language: "Language",
        Contact: "CONTACT",
        Name: "Name",
        Email: "Email",
        YourMessage: "Your Message",
        Submit: "SUBMIT",
        DeveloperParagraphText: "Someone once told me that time is a predator that stalks us all our lives, but I rather believe that time is a companion who goes with us on the journey, reminds us to cherish every moment, because they’ll never come again.",
        EducatorParagraphText: "Someone once told me that time is a predator that stalks us all our lives, but I rather believe that time is a companion who goes with us on the journey, reminds us to cherish every moment, because they’ll never come again.",
        TravellerParagraphText: "Someone once told me that time is a predator that stalks us all our lives, but I rather believe that time is a companion who goes with us on the journey, reminds us to cherish every moment, because they’ll never come again.",  
    } as BMLanguageContext

    static GermanText =
    {
        Educator: "Erzieher",
        Traveller: "Reisender",
        Developer: "Entwickler",
        DarkMode: "Dunkelmodus",
        Language: "Sprache",
        Contact: "KONTAKT",
        Name: "Name",
        Email: "Email",
        YourMessage: "Deine Nachricht",
        Submit: "SENDEN",
        DeveloperParagraphText: "Someone once told me that time is a predator that stalks us all our lives, but I rather believe that time is a companion who goes with us on the journey, reminds us to cherish every moment, because they’ll never come again.",
        EducatorParagraphText: "Someone once told me that time is a predator that stalks us all our lives, but I rather believe that time is a companion who goes with us on the journey, reminds us to cherish every moment, because they’ll never come again.",
        TravellerParagraphText: "Someone once told me that time is a predator that stalks us all our lives, but I rather believe that time is a companion who goes with us on the journey, reminds us to cherish every moment, because they’ll never come again.",  
    } as BMLanguageContext
    
    // Contexts
    static ThemeContext = React.createContext(
        // Default to light theme
        BMStyle.LightTheme
    );

    static LanguageContext = React.createContext(
        // Default to English
        BMStyle.EnglishText
    );

    // Fonts
    static UITitleFont = "Raleway";
    static UIContentFont = "work sans";
    static UITextEntryFont = "Roboto Slab";
    static UIIconFont = "icomoon";

    // Links
    static LinkedInUrl = "https://www.linkedin.com/in/bradleymccausland/";
    static GithubUrl = "https://github.com/bmcc0605";
    static MailToUrl = "mailto:bradmccausland20@gmail.com";

    // Dimensions
    static HeaderHeight = "70px";
    static MenuItemheight = "70px";

    // Durations
    static HeaderSlideTransitionTime = "0.7s";
}
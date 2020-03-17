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
        DeveloperParagraphText: "I'm a Seattle-based software developer with 2.5 years experience in iOS development, and I like to build cool stuff. Any language, stack, or framework. Front-end or back-end. I enjoy building robust applications with an emphasis on secure design and extensibility, especially when working towards a social good. See /my resume/ for more, or check out /my blog/ to see what I've been working on.",
        EducatorParagraphText: "Studying computer science has opened up a world of opportunities to me, and I owe a great deal to the educators who helped me take the first steps into the field. To give back, I've volunteered with a number of educational organizations including ACM mentors, Microsoft TEALS, and Hour of Code over the years, to help expose students to the field and to practice my own communication skills.",
        TravellerParagraphText: "Travel is fatal to prejudice, bigotry, and narrow-mindedness, and many of our people need it sorely on these accounts. Broad, wholesome, charitable views of men and things cannot be acquired by vegetating in one little corner of the earth all one's lifetime. Check out some of my photos in /this stupid photo album component/ I guess or something.",  
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
        DeveloperParagraphText: "Ich bin Softwareentwickler aus Seattle mit 2,5 Jahre in der iOS-Entwicklung, und ich mag cooles Sachen zu bauen. Jede Sprache, Stack, oder Framework. Frontend oder Backend. Ich baue gern robuste Anwendungen mit Schwerpunkt auf Datenschutz und Erweiterbarkeit, besonders wenn Ich für dem Allgemeinwohl Arbeite. Sehen Sie sich /meinen Lebenslauf/ an, um mehr zu sehen. Oder Schauen Sie /meinen Blog/ an, um Einige meiner Projekten zu sehen.",
        EducatorParagraphText: "Das Studium der Computerwissenschaft hat mir viele Chancen eröffnet, und ich schulde die Erzieher viel, die mir geholfen haben, um die ersten Schritte auf dieser Studienrichtung zu machen. Um etwas zurückzugeben, habe ich mich freiwillig bei viele Bildungsorganisationen, darunter ACM Mentoren, Microsoft TEALS, und Hour of Code gemeldet, um den Schülern in der Studienrichtung zu einführen und meine Kommunikationsfähigkeiten zu üben.",
        TravellerParagraphText: "Reisen ist tödlich für Vorurteile, Bigotterie und Engstirnigkeit, und viele unserer Leute brauchen es an diesen Gründen schlecht. Breite, gesunde, und freigebige Meinungen zu Menschen und Dingen kann man durch vegetieren in ihrer Ecke der Welt nicht erhalten. Ich reise sehr gern, und Ich kann auch ein bisschen Deutsch sprechen!",  
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
    static HeaderHeight = 70;
    static HeaderHeightString = BMStyle.HeaderHeight + "px";
    static MenuItemHeight = 70;
    static MenuItemHeightString = BMStyle.MenuItemHeight + "px";

    // Durations
    static HeaderSlideTransitionTime = "0.7s";
}
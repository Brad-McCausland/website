declare module "react-fittext"
{
    import { Component, ComponentState } from "react";

    interface ReactFitTextProps
    {
        compressor?: number,
        minFontSize?: number,
        maxFontSize?: number,
        children: React.ReactElement<any>;
    }

    class ReactFitText extends Component<ReactFitTextProps, ComponentState> {}
    export = ReactFitText;
}
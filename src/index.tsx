import * as React from "react";
import * as ReactDOM from "react-dom";

import { SlideShowView } from "./components/SlideShowView";

ReactDOM.render
(
    <SlideShowView width={600} height={600}/>,
    document.getElementById("example")
);
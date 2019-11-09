import * as React from "react";
import * as ReactDOM from "react-dom";

import { SlideShowView } from "./components/SlideShowView";

var image1 = new Image()
var image2 = new Image()
var image3 = new Image()

image1.src = "src/images/portrait.png"
image2.src = "src/images/pano.jpg"
image3.src = "src/images/background.jpg"

var imageArray = [image1, image2, image3];

ReactDOM.render
(
    <SlideShowView width={600} height={600} images={imageArray} initWithLoadingAnimation={true}/>,
    //<SlideShowView width={600} height={600} images={[]} initWithLoadingAnimation={false}/>,
    document.getElementById("example")
);
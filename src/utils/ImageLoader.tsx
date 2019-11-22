import { httpGet } from "./HttpGet";

// Function fetchImages() takes a url to imageService and a time out duration as arguments, and attempts to retrieve and decode the images.
// Will return a promise that will resolve once the images have finished decoding
export function fetchImages(url: string, timeout: number): Promise<HTMLImageElement[]>
{
    return new Promise (function (resolve, reject)
    {
        const httpPromise = httpGet(url, timeout)
        {
            httpPromise.then(function(result: string)
            {
                if (result)
                {
                    var decodedImages = decodeImages(result);
                    if (decodedImages)
                    {
                        resolve(decodedImages);
                    }
                    else
                    {
                        reject(Error("Error: images could not be decoded"));
                    }
                }
            }).catch(function(error: string)
            {
                console.log(error)
                reject(error);
            })
        }
    });
}

// Takes the result of calling image service, unpacks the data into images, and loads them into the slideshow array
function decodeImages(imageData: string): HTMLImageElement[] | null
{
    try
    {
        // Array of images in Base64 
        var allImages = JSON.parse(imageData);
        allImages = allImages["album_images"];

        // Array to be filled with completed images
        var returnImages = Array<HTMLImageElement>()

        Object.keys(allImages).forEach(function(key)
        {
            let src = "data:image/jpeg;base64,"
            src += allImages[key];
            let image = new Image();
            image.src = src;
            returnImages.unshift(image);
        });

        return returnImages;
    }
    catch (error)
    {
        console.log("Error: could not decode data from image service");
        return null;
    }
}
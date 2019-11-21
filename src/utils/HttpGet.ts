// A simple utility function for performing http get requests. Returns a promise that will
// resolve with the response text on completion, or reject after a user-supplied time out.

export function httpGet(url: string, timeLimit: number): Promise<string>
{
    return new Promise (function(resolve, reject)
    {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", url, true); // false for synchronous request
        xmlHttp.send(null);

        xmlHttp.onreadystatechange = function()
        {
            if (xmlHttp.readyState === 4)
            {
                resolve(xmlHttp.responseText);
            }
        }

        setTimeout(function(){ reject(Error("Timeout after " + timeLimit/1000 + " seconds")) }, timeLimit);
    });
}
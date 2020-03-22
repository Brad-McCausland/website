"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var serverPortNum = 8000;
var htmlFile = path_1["default"].join(__dirname + '/index.html');
console.log(htmlFile);
// Create html server
var app = express_1["default"]();
app.use(express_1["default"].static(__dirname + "/"));
app.get('/*', function (req, res) {
    res.sendFile(htmlFile);
});
app.listen(serverPortNum, function () {
    console.log("Listening! (port " + serverPortNum + ")");
});

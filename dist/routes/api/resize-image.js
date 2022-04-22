"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils = __importStar(require("../../utils/utils"));
const path_1 = __importDefault(require("path"));
const sharp = require('sharp');
const resizeImage = express_1.default.Router();
const resize = (imageFullPath, imageDistPath, h, w) => __awaiter(void 0, void 0, void 0, function* () {
    const reziedImage = yield sharp(imageFullPath)
        .resize(h, w)
        .toFormat('jpeg')
        .toFile(imageDistPath);
    console.log(reziedImage);
});
//resize image
resizeImage.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filename, hieght, width } = req.query;
    const h = Number(hieght);
    const w = Number(width);
    console.log(`Image ${filename} with hieght ${hieght}, width ${width}`);
    //check wether dir or file exists accordingly
    const dirPath = utils.dirExistChecker("full");
    const distDirPath = utils.dirExistChecker("thumb");
    const imageRelativePath = `${dirPath}/${filename}.jpg`;
    if (!utils.fileExistChecker(imageRelativePath)) {
        res.status(400).send("Image Filename Not Found");
        return;
    }
    ;
    try {
        //Retrive Image Full to be used in the resize
        const imageFullPath = path_1.default.resolve(imageRelativePath);
        const imageDistPath = `${distDirPath}/${filename}_${width}_${hieght}.jpg`;
        //create new image only if a we didn't already create it
        if (!utils.fileExistChecker(imageDistPath))
            yield resize(imageFullPath, imageDistPath, h, w);
        // returns the Image
        res.sendFile(path_1.default.resolve(imageDistPath));
    }
    catch (err) {
        const error = err.toString();
        if (error.includes("Input file is missing"))
            res.status(400).send("Filename Not Found");
        else
            res.status(500).send(error);
        console.log("Error", err);
    }
}));
exports.default = resizeImage;

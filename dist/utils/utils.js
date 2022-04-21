"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileExistChecker = exports.dirExistChecker = exports.imageValidator = void 0;
const fs_1 = require("fs");
const imageValidator = (req, res, next) => {
    console.log('validator MIDDLEWARE CALLED!');
    const { filename, hieght, width } = req.query;
    if (filename && hieght && width) {
        if (!Number(hieght))
            return res.status(400).send('Hieght Must enter a number');
        if (!Number(width))
            return res.status(400).send('Width Must enter a number');
    }
    else {
        return res.status(400).send('Must enter value for each filename, width and hieght');
    }
    next();
};
exports.imageValidator = imageValidator;
const dirExistChecker = (resourceName) => {
    const dirPath = `./assets/${resourceName}`;
    if (!(0, fs_1.existsSync)(dirPath)) {
        (0, fs_1.mkdirSync)(dirPath);
        console.log('Directory Created.');
    }
    else {
        console.log('Directory Exists');
    }
    return dirPath;
};
exports.dirExistChecker = dirExistChecker;
const fileExistChecker = (filePath) => {
    if (!(0, fs_1.existsSync)(filePath)) {
        return false;
    }
    else {
        return true;
    }
};
exports.fileExistChecker = fileExistChecker;

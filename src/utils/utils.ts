import express from 'express';
import { existsSync, mkdirSync } from 'fs';


const imageValidator = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  console.log('validator MIDDLEWARE CALLED!');
  const { filename, hieght, width } = req.query;
  if (filename && hieght && width) {
    if (!Number(hieght)) { res.status(400).send('Hieght Must enter a number'); return; }
    if (!Number(width)) { res.status(400).send('Width Must enter a number'); return; }
  } else {
    res.status(400).send('Must enter value for each filename, width and hieght');
    return;
  }
  next();
};

const dirExistChecker = (resourceName: string): string => {
  const dirPath = `./assets/${resourceName}`;

  if (!existsSync(dirPath)) {
    mkdirSync(dirPath);
    console.log('Directory Created.');
  } else {
    console.log('Directory Exists');
  }
  return dirPath;
};

const fileExistChecker = (filePath: string): boolean => {
  if (!existsSync(filePath)) {
    return false;
  } else {
    return true;
  }
};


export { imageValidator, dirExistChecker, fileExistChecker };

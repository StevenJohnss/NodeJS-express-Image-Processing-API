import express from 'express';
import * as utils from '../../utils/utils';
import path from 'path';
const sharp = require('sharp');

const resizeImage = express.Router();


const resize = async (imageFullPath: string, imageDistPath: string, h: number, w: number): Promise<void> => {
  const reziedImage = await sharp(imageFullPath)
    .resize(h, w)
    .toFormat('jpeg')
    .toFile(imageDistPath);
  console.log(reziedImage)
}


//resize image
resizeImage.get('/', async (req: express.Request, res: express.Response): Promise<void> => {
  const { filename, hieght, width } = req.query;
  const h = Number(hieght)
  const w = Number(width)
  console.log(`Image ${filename} with hieght ${hieght}, width ${width}`)

  //check wether dir or file exists accordingly
  const dirPath = utils.dirExistChecker("full")
  const distDirPath = utils.dirExistChecker("thumb")
  const imageRelativePath = `${dirPath}/${filename}.jpg`
  if (!utils.fileExistChecker(imageRelativePath)) { res.status(400).send("Image Filename Not Found"); return; };

  try {
    //Retrive Image Full to be used in the resize
    const imageFullPath = path.resolve(imageRelativePath);
    const imageDistPath = `${distDirPath}/${filename}_${width}_${hieght}.jpg`

    //create new image only if a we didn't already create it
    if (!utils.fileExistChecker(imageDistPath)) await resize(imageFullPath, imageDistPath, h, w)

    // returns the Image
    res.sendFile(path.resolve(imageDistPath));
  } catch (err) {
    const error: string = (err as string).toString()
    if (error.includes("Input file is missing")) res.status(400).send("Filename Not Found");
    else res.status(500).send(error);
    console.log("Error", err);
  }
});

export default resizeImage;

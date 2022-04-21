import express from 'express';
import rezizeImage from './api/resize-image';
import * as utils from '../utils/utils';

const routes = express.Router();

routes.use('/images', utils.imageValidator, rezizeImage);

export default routes;

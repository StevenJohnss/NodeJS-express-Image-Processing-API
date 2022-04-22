import supertest from 'supertest';
import app from '../index';
import { promises as fs } from 'fs';
import path from 'path';

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Test responses from endpoints', (): void => {

  describe('Test Expected Sucess Responses', (): void => {
    it('get home page response /', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/');
      expect(response.status).toBe(200);
    });

    it('resize Iamge and get response /api/images?filename=sky&hieght=50&width=50', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/api/images?filename=fjord&hieght=50&width=50');
      expect(response.status).toBe(200);
    });

    it('succeeds to write resized thumb file with output of existing file and valid size values', async (): Promise<void> => {
      await request.get('/api/images?filename=fjord&width=100&hieght=200');

      const resizedImagePath: string = path.resolve(
        './assets/thumb',
        `fjord_100_200.jpg`
      );
      let errorFile: null | string = '';

      try {
        await fs.access(resizedImagePath);
        errorFile = null;
      } catch {
        errorFile = 'File was not created';
      }

      expect(errorFile).toBeNull();
    });

  });

  describe('Test Expected Error Responses', (): void => {
    it('get unknown endpoint /home', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/home');
      expect(response.status).toBe(404);
    });

    it('test resize Iamge and get response with unknown file name', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/api/images?filename=seven&hieght=50&width=50');
      expect(response.status).toBe(400);
    });

    it('test resize Iamge with height or filename or width missing', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/api/images?hieght=five&width=50');
      expect(response.status).toBe(400);
    });

    it('test resize Iamge with height as string insted of number', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/api/images?filename=fjord&hieght=five&width=50');
      expect(response.status).toBe(400);
    });

    it('test resize Iamge with width as string insted of number', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/api/images?filename=fjord&hieght=50&width=five');
      expect(response.text).toEqual("Width Must enter a number");
    });
  });
})
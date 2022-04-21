import supertest from 'supertest';
import app from '../index';

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

// const numArr = [3, 4, 5, 6];
// const wordArr = ['cat', 'dog', 'rabbit', 'bird'];

// it('should capitalize a string', () => {
//   expect(strings.capitalize('a sentence')).toEqual('A Sentence');
// });

// it('should be a sum greater than 10', () => {
//   expect(numbers.sum(3, 10)).toBeGreaterThan(10);
// });

// it('multiply 3 by 5 and be 15', () => {
//   expect(numbers.multiply(3, 5)).toEqual(15);
// });

// it('should add numbers in array and be truthy', () => {
//   expect(arrays.addArr(numArr)).toBeTruthy();
// });

// it('should concatenate 2 arrays to not equal just 1', () => {
//   expect(arrays.concatArr(numArr, wordArr)).not.toEqual(numArr);
// });

// it('should not contain the third index', () => {
//   expect(arrays.cut3(wordArr)).not.toContain('rabbit');
// });

// it('should not have a large number and be falsy', () => {
//   expect(arrays.lgNum(wordArr)).toBeFalsy();
// });
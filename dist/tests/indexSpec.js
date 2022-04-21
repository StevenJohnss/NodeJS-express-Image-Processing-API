"use strict";
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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const request = (0, supertest_1.default)(index_1.default);
describe('Test responses from endpoints', () => {
    describe('Test Expected Sucess Responses', () => {
        it('get home page response /', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/');
            expect(response.status).toBe(200);
        }));
        it('resize Iamge and get response /api/images?filename=sky&hieght=50&width=50', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/images?filename=fjord&hieght=50&width=50');
            expect(response.status).toBe(200);
        }));
    });
    describe('Test Expected Error Responses', () => {
        it('get unknown endpoint /home', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/home');
            expect(response.status).toBe(404);
        }));
        it('test resize Iamge and get response with unknown file name', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/images?filename=seven&hieght=50&width=50');
            expect(response.status).toBe(400);
        }));
        it('test resize Iamge with height or filename or width missing', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/images?hieght=five&width=50');
            expect(response.status).toBe(400);
        }));
        it('test resize Iamge with height as string insted of number', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/images?filename=fjord&hieght=five&width=50');
            expect(response.status).toBe(400);
        }));
        it('test resize Iamge with width as string insted of number', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/images?filename=fjord&hieght=50&width=five');
            expect(response.text).toEqual("Width Must enter a number");
        }));
    });
});
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

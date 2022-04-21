# NodeJS-express-Image-Processing-API

### Scripts
- Install: ```npm install```
- Build: ```npm run build```
- Lint: ```npm run lint```
- Prettify: ```npm run prettify```
- Run unit tests: ```npm run test```
- Start server: ```npm run start```

### Usage
The server will listen on port 3000:


### Summary
building an API that can be used in two different ways. As a simple placeholder API, the first allows you to place images into your frontend with the size set via URL parameters (and additional stylization if you choose) for rapid prototyping. The second use case is as a library to serve properly scaled versions of your images to the front end to reduce page load size. Rather than needing to resize and upload multiple copies of the same image to be used throughout your site. Also Caching was used to reduce workload 

### Example
To resize Iamge an image to hieght 50 and width 50=> call this url: http://localhost:3000/api/images?filename=sky&hieght=50&width=50
Then you will recive the resized image which will be cached

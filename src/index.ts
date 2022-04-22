import express from 'express';
import routes from './routes/index';
import dotenv from 'dotenv'
dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;

app.get('/', (req: express.Request, res: express.Response): void => {
  res.send('Welcome to my first project');
});

app.use('/api', express.json(), routes);

// App port listener.
app.listen(port, (): void => {
  console.log(`Server started at http://localhost:${port}`);
});

export default app

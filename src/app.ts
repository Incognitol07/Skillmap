import express, { Request, Response } from 'express';
import { AppDataSource } from './config/db';

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  // Send a response to the client
  res.send({message:"Welcome to Skillmap"});
});

AppDataSource.initialize()
.then(() => {
    console.log("SQLite Database connected successfully!");
    app.listen(5500, () => console.log('Server running on http://localhost:5500'));
  })
  .catch((error) => console.log(error));
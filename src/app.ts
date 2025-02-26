import express, { Request, Response } from 'express';
import { AppDataSource } from './config/db';
import { PORT } from './config/env';

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  // Send a response to the client
  res.send({message:"Welcome to Skillmap"});
});

AppDataSource.initialize()
.then(() => {
    console.log("SQLite Database connected successfully!");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((error) => console.log(error));
import express from 'express';
import { AppDataSource } from './config/db';

const app = express();
app.use(express.json());

AppDataSource.initialize()
.then(() => {
    console.log("SQLite Database connected successfully!");
    app.listen(5500, () => console.log('Server running on http://localhost:5500'));
  })
  .catch((error) => console.log(error));
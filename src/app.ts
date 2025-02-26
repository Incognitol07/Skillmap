import { AppDataSource } from "./config/db";

AppDataSource.initialize()
  .then(() => {
    console.log("SQLite Database connected successfully!");
  })
  .catch((error) => console.log("Error connecting to database", error));

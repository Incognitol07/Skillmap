import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../models/user.model"; // Import entity

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite", // SQLite database file
    entities: [User], // Include entities here
    synchronize: true, // Automatically create tables (disable in production)
    logging: true, // Logs SQL queries (optional)
  });
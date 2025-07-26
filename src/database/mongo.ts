import { Db, MongoClient } from "mongodb";
import { logger } from "../utils/logger";

export const mongoClient = {
    client: undefined as unknown as MongoClient,
    db: undefined as unknown as Db,

    async connect(): Promise<void> {
        const url = process.env.MONGO_URL;
        const username = process.env.MONGO_USERNAME;
        const password = process.env.MONGO_PASSWORD;

        const client = new MongoClient(url as string, {
            auth: { username, password },
        });
        const db = client.db("upload-db");

        this.client = client;
        this.db = db;

        console.log("connected successfully to db");
        logger.info("connected successfully to db");
    },
};

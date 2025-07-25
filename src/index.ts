import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { logger } from "./utils/logger";

const main = async () => {
    const app = express();

    app.use(express.json());
    app.use(cors);
    app.use((err: Error, _req: express.Request, res: express.Response) => {
        logger.error(err);
        res.status(500).json({ message: err });
    });

    config();

    process.on("SIGTERM", () => {
        logger.info("closing server...");
        process.exit(0);
    });

    app.get("/", (_req, res) => {
        res.send("Hello World");
    });

    const port = process.env.PORT;

    app.listen(port, () => {
        console.log(`server on!!! port: ${port}`);
        logger.info(`server on!!! port: ${port}`);
    });
};

main().catch((err) => {
    if (err instanceof Error) {
        console.log(err.message);
    }
    console.log(err);

    process.exit(1);
});

import express from "express";
import { config } from "dotenv";
import cors from "cors";
import path from "path";
import { logger } from "./utils/logger";

import uploadRoute from "./routes/upload-routes";

const main = async () => {
    const app = express();

    config();

    app.use(express.json());
    app.use(cors());
    app.use(
        (
            err: Error,
            _req: express.Request,
            res: express.Response,
            _next: express.NextFunction
        ) => {
            logger.error(err.stack || err.message);
            res.status(500).json({ message: err });
        }
    );

    app.use("/api", uploadRoute);

    app.use("/uploads", express.static(path.resolve(process.cwd(), "uploads")));

    app.get("/", (_req, res) => {
        res.send("Hello World");
    });

    const port = process.env.PORT || 3000;

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

import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, iController } from "../protocols";
import { logger } from "../../utils/logger";
import { FileRequest } from "../protocols";
import sharp from "sharp";
import fs from "fs";
import path from "path";

export class postFileController implements iController {
    async handle(
        HttpRequest: HttpRequest<FileRequest>
    ): Promise<HttpResponse<unknown>> {
        try {
            const file = HttpRequest.body?.file;

            if (!file) {
                return badRequest("no file sent");
            }

            if (!file.mimetype.startsWith("image/")) {
                fs.unlinkSync(file.path);
                return badRequest("file sent was not and image");
            }

            const outputPath = path.resolve(
                file.destination,
                `resized ${file.filename}`
            );

            const image = sharp(file.path);
            const metadata = await image.metadata();

            if (metadata.width && metadata.width > 1000) {
                await image.resize(1000).toFile(outputPath);
                fs.unlinkSync(file.path);
            } else if (metadata.height && metadata.height > 1000) {
                await image.resize({ height: 1000 }).toFile(outputPath);
                fs.unlinkSync(file.path);
            }

            logger.info(
                `File Sent, and processed successfully: ${file.filename} (${file.size} bytes)`
            );

            return ok({
                message: "upload done successfully",
                filename: file.originalname,
                path: file.path,
                size: file.size,
            });
        } catch (err) {
            if (err instanceof Error)
                return serverError(err.message || err.stack);
            return serverError("internal server error");
        }
    }
}

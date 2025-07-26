import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, iController } from "../protocols";
import { logger } from "../../utils/logger";
import { FileRequest } from "../protocols";

export class postFileController implements iController {
    async handle(
        HttpRequest: HttpRequest<FileRequest>
    ): Promise<HttpResponse<unknown>> {
        try {
            const file = HttpRequest.body?.file;

            if (!file) {
                return badRequest("no file sent");
            }

            logger.info(
                `File Sent successfully: ${file.originalname} (${file.size} bytes)`
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

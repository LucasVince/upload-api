import fs from "fs";
import path from "path";
import { ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, iController } from "../protocols";
import { IncomingHttpHeaders } from "http";

export class getFileController implements iController {
    async handle(
        HttpRequest: HttpRequest<unknown, unknown, IncomingHttpHeaders>
    ): Promise<HttpResponse<unknown>> {
        try {
            const uploadPath = path.resolve(process.cwd(), "uploads");

            const files = fs.readdirSync(uploadPath);

            const protocol =
                HttpRequest.headers?.["x-forwarded-proto"] || "http";
            const host = HttpRequest.headers?.host;
            const baseUrl = `${protocol}://${host}`;

            const filesUrls = files.map((file) => ({
                serverPath: path.join(uploadPath, file),
                publicUrl: `${baseUrl}/uploads/${file}`,
            }));

            return ok(filesUrls);
        } catch (err) {
            if (err instanceof Error)
                return serverError(err.message || err.stack);
            return serverError("internal server error");
        }
    }
}

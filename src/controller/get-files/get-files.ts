import fs from "fs";
import path from "path";
import { ok, serverError } from "../helpers";
import { HttpResponse, iController } from "../protocols";

export class getFileController implements iController {
    async handle(): Promise<HttpResponse<unknown>> {
        try {
            const uploadPath = path.resolve(process.cwd(), "uploads");

            const files = fs.readdirSync(uploadPath);

            const filePaths = files.map((file) => path.join(uploadPath, file));

            return ok(filePaths);
        } catch (err) {
            if (err instanceof Error)
                return serverError(err.message || err.stack);
            return serverError("internal server error");
        }
    }
}

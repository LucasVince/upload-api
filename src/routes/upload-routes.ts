import { Router } from "express";
import { upload } from "../middleware/multer-midleware";
import { postFileFactory } from "../factories/post-file-factory";
import { getFileFactory } from "../factories/get-file-factory";

const router = Router();

router.post("/uploads", upload.single("file"), async (req, res) => {
    const uploadFile = postFileFactory();

    const HttpRequest = {
        body: { ...req.body, file: req.file },
        params: req.params,
        headers: req.headers,
        query: req.query,
        method: req.method as "POST",
    };

    const response = await uploadFile.handle(HttpRequest);

    res.status(response.statusCode).json(response.body);
});

router.get("/uploads", async (req, res) => {
    const getFiles = getFileFactory();

    const response = await getFiles.handle();

    res.status(response.statusCode).json(response.body);
});

export default router;

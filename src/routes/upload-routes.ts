import { Router } from "express";
import { upload } from "../middleware/multer-midleware";
import { uploadFileFactory } from "../factories/upload-file-factory";

const router = Router();

router.post("/upload", upload.single("file"), async (req, res) => {
    const uploadFile = uploadFileFactory();

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

export default router;

import { UploadFileController } from "../controller/upload-file/upload-file-controller";

export const uploadFileFactory = () => {
    return new UploadFileController();
};

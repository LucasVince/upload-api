import { postFileController } from "../controller/post-file/post-file-controller";

export const postFileFactory = () => {
    return new postFileController();
};

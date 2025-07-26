import { getFileController } from "../controller/get-files/get-files";

export const getFileFactory = () => {
    return new getFileController();
};

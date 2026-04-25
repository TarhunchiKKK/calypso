import axios from "axios";
import { Env } from "../config";

export class S3Service {
    public static async upload(file: File, url: string) {
        await axios.put(url, file, {
            headers: {
                "Content-Type": file.type
            }
        });
    }

    public static getFullUrl(url: string) {
        return `${Env.s3.endpoint}/${Env.s3.bucket}/${url}`;
    }
}

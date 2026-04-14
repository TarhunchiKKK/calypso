import axios from "axios";

export class S3Service {
    public static async upload(file: File, url: string) {
        await axios.put(url, file, {
            headers: {
                "Content-Type": file.type
            }
        });
    }
}

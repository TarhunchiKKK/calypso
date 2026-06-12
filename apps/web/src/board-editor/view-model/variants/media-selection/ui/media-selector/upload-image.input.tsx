import type { ChangeEvent } from "react";
import { toast } from "sonner";
import { MediaApi } from "@/entities/media";
import { S3Service } from "@/shared/lib/s3";
import { Input } from "@/shared/ui/kit";

type Props = {
    onSelect: (url: string) => void;
};

export function UploadImageInput({ onSelect }: Props) {
    const { mutateAsync: getPresignedUrl } = MediaApi.useGetPresignedUrl({
        onError: () => {
            toast.error("Cannot get presigned url");
        },
    });

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) {
            toast.warning("Image not selected");
            return;
        }

        const presignedUrl = await getPresignedUrl({
            fileName: file.name,
            contentType: file.type,
        });

        await S3Service.upload(file, presignedUrl.url);

        onSelect(presignedUrl.key);
    };

    return <Input type="file" onChange={handleChange} />;
}

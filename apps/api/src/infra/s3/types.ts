import type { S3ClientConfig } from "@aws-sdk/client-s3";
import type { ModuleMetadata, Type } from "@nestjs/common";

export type S3ModuleOptions = {
    client: S3ClientConfig;

    bucket: string;

    urlExpiration: number;
};

export type S3OptionsFactory = {
    createS3Options: () => S3ModuleOptions | Promise<S3ModuleOptions>;
};

export type S3ModuleAsyncOptions = Pick<ModuleMetadata, "imports"> & {
    useClass: Type<S3OptionsFactory>;
};

import { Inject, Injectable, type OnModuleInit } from "@nestjs/common";
import type { ClientGrpc } from "@nestjs/microservices";
import { extractGrpcResponsePipe, MEDIA_SERVICE_NAME, type MediaServiceClient } from "@repo/contracts";
import type { FindPresetsDto, GetPresignedUrlDto, MediaDomains } from "@repo/media";
import { map } from "rxjs";
import { MEDIA_GRPC_CLIENT_INJECTION_TOKEN } from "./lib/grpc.constants";

@Injectable()
export class MediaService implements OnModuleInit {
    private mediaClient: MediaServiceClient;

    public constructor(@Inject(MEDIA_GRPC_CLIENT_INJECTION_TOKEN) private readonly grpcClient: ClientGrpc) {}

    public onModuleInit() {
        this.mediaClient = this.grpcClient.getService<MediaServiceClient>(MEDIA_SERVICE_NAME);
    }

    public findPresets(dto: FindPresetsDto) {
        return this.mediaClient
            .findPresets(dto)
            .pipe(extractGrpcResponsePipe())
            .pipe(map((res) => res.media));
    }

    public findGroups(domain: MediaDomains) {
        return this.mediaClient
            .findGroups({ domain: domain })
            .pipe(extractGrpcResponsePipe())
            .pipe(map((res) => res.groups));
    }

    public getPresignedUrl(dto: GetPresignedUrlDto) {
        return this.mediaClient.getPresignedUrl(dto).pipe(extractGrpcResponsePipe());
    }
}

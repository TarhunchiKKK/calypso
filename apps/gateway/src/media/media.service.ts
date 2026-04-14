import { Inject, Injectable, type OnModuleInit } from "@nestjs/common";
import type { ClientGrpc } from "@nestjs/microservices";
import { extractGrpcResponse, MEDIA_SERVICE_NAME, type MediaServiceClient } from "@repo/api";
import type { FindPresetsDto, GetPresignedUrlDto, MediaDomains } from "@repo/common";
import { MEDIA_GRPC_CLIENT_INJECTION_TOKEN } from "./lib/grpc.constants";

@Injectable()
export class MediaService implements OnModuleInit {
    private mediaClient: MediaServiceClient;

    public constructor(@Inject(MEDIA_GRPC_CLIENT_INJECTION_TOKEN) private readonly grpcClient: ClientGrpc) {}

    public onModuleInit() {
        this.mediaClient = this.grpcClient.getService<MediaServiceClient>(MEDIA_SERVICE_NAME);
    }

    public findPresets(dto: FindPresetsDto) {
        const response = this.mediaClient.findPresets(dto);

        return extractGrpcResponse(response);
    }

    public findGroups(domain: MediaDomains) {
        const response = this.mediaClient.findGroups({
            domain: domain
        });

        return extractGrpcResponse(response);
    }

    public getPresignedUrl(dto: GetPresignedUrlDto) {
        const response = this.mediaClient.getPresignedUrl(dto);

        return extractGrpcResponse(response);
    }
}

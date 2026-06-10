export const GrpcProtoRoot = "node_modules/@contracts/grpc/proto";

export const GrpcLoaderOptions = {
    keepCase: false,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
    includeDirs: [GrpcProtoRoot]
};

export const GrpcProtoRoot = "node_modules/@api/contracts/proto";

export const GrpcLoaderOptions = {
    keepCase: false,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
    includeDirs: [GrpcProtoRoot]
};

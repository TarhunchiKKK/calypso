import z from "zod";

export const MediaDomainsZodSchema = z.enum(["project-thumbnails", "board-node-media"]);

export type MediaDomains = z.infer<typeof MediaDomainsZodSchema>;

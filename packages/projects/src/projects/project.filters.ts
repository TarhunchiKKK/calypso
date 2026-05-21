import { IdZodSchema, PaginationOptionsZodSchema } from "@repo/common";
import z from "zod";
import { ProjectTypesZodSchema } from "./project.entity";

export const ProjectsSortOrdersZodSchema = z.enum(["alphabetic", "last-created", "last-modified"]);

export const ProjectFiltersZodSchema = z.object({
    title: z.string().optional(),
    type: ProjectTypesZodSchema,
    creatorId: IdZodSchema,
    sortOrder: ProjectsSortOrdersZodSchema
});

export const FindAllProjectsQueryZodSchema = ProjectFiltersZodSchema.merge(PaginationOptionsZodSchema);

export type ProjectsSortOrders = z.infer<typeof ProjectsSortOrdersZodSchema>;
export type ProjectFilters = z.infer<typeof ProjectFiltersZodSchema>;
export type FindAllProjectsQuery = z.infer<typeof FindAllProjectsQueryZodSchema>;

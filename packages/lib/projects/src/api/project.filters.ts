import { PaginationOptionsZodSchema } from "@lib/common";
import z from "zod";
import { ProjectTypesZodSchema } from "../entities/project.entity";

export const ProjectsSortOrdersZodSchema = z.enum(["alphabetic", "last-created", "last-modified"]);

export const ProjectFiltersZodSchema = z.object({
    type: ProjectTypesZodSchema.optional(),
    own: z.boolean().optional(),
    sortOrder: ProjectsSortOrdersZodSchema
});

export const FindAllProjectsQueryZodSchema = ProjectFiltersZodSchema.merge(PaginationOptionsZodSchema);

export type ProjectsSortOrders = z.infer<typeof ProjectsSortOrdersZodSchema>;
export type ProjectFilters = z.infer<typeof ProjectFiltersZodSchema>;
export type FindAllProjectsQuery = z.infer<typeof FindAllProjectsQueryZodSchema>;

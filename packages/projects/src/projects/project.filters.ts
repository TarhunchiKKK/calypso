import { IdZodSchema, PaginationOptionsZodSchema } from "@repo/common";
import { ProjectTypesZodSchema } from "entry";
import z from "zod";

export const ProjectsSortOrdersZodSchema = z.enum(["alphabetic", "last-created", "last-modified"]);

export const ProjectFiltersZodSchema = z.object({
    title: z.string().optional(),
    type: ProjectTypesZodSchema,
    creatorId: IdZodSchema,
    sortOrder: ProjectsSortOrdersZodSchema
});

export const FindAllProjectsDtoZodSchema = z.object({
    userId: IdZodSchema,
    filters: ProjectFiltersZodSchema,
    pagination: PaginationOptionsZodSchema
});

export type ProjectsSortOrders = z.infer<typeof ProjectsSortOrdersZodSchema>;
export type ProjectFilters = z.infer<typeof ProjectFiltersZodSchema>;
export type FindAllProjectsDto = z.infer<typeof FindAllProjectsDtoZodSchema>;

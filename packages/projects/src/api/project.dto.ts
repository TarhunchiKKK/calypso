import type z from "zod";
import { ProjectWithTypeZodSchema } from "../entities/project.entity";

export const DuplicateProjectDtoZodSchema = ProjectWithTypeZodSchema.pick({
    id: true,
    type: true,
    title: true
});

export const FindOneProjectDtoZodSchema = ProjectWithTypeZodSchema.pick({
    id: true,
    type: true
});

export const UpdateProjectDtoZodSchema = ProjectWithTypeZodSchema.pick({
    type: true,
    title: true,
    thumbnail: true
}).partial({ title: true, thumbnail: true });

export const RemoveProjectDtoZodSchema = ProjectWithTypeZodSchema.pick({
    id: true,
    type: true
});

export type DuplicateProjectDto = z.infer<typeof DuplicateProjectDtoZodSchema>;
export type FindOneProjectDto = z.infer<typeof FindOneProjectDtoZodSchema>;
export type UpdateProjectDto = z.infer<typeof UpdateProjectDtoZodSchema>;
export type RemoveProjectDto = z.infer<typeof RemoveProjectDtoZodSchema>;

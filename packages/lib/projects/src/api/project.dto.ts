import { ProjectZodSchema } from "entry";
import type z from "zod";

export const CreateProjectDtoZodSchema = ProjectZodSchema.pick({
    title: true,
    type: true,
    description: true,
    icon: true,
     
}) 

export const DuplicateProjectDtoZodSchema = ProjectZodSchema.pick({
    id: true,
    type: true,
    title: true
});

export const FindOneProjectDtoZodSchema = ProjectZodSchema.pick({
    id: true,
    type: true
});

export const UpdateProjectDtoZodSchema = ProjectZodSchema.pick({
    type: true,
    title: true,
    icon: true
}).partial({ title: true, icon: true });

export const RemoveProjectDtoZodSchema = ProjectZodSchema.pick({
    id: true,
    type: true
});

export type CreateProjectDto = z.infer<typeof CreateProjectDtoZodSchema>
export type DuplicateProjectDto = z.infer<typeof DuplicateProjectDtoZodSchema>;
export type FindOneProjectDto = z.infer<typeof FindOneProjectDtoZodSchema>;
export type UpdateProjectDto = z.infer<typeof UpdateProjectDtoZodSchema>;
export type RemoveProjectDto = z.infer<typeof RemoveProjectDtoZodSchema>;

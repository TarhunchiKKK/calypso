import { zodResolver } from "@hookform/resolvers/zod";
import { type Profile, type UpdateProfileDto, UpdateProfileDtoZodSchema } from "@lib/auth";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button, Field, FieldError, FieldGroup, FieldLabel, Input } from "@/shared/ui/kit";
import { UsersApi } from "../api";

type Props = {
    profile: Profile;

    afterSubmit?: () => void;
};

export function UpdateProfileForm({ profile, afterSubmit }: Props) {
    const form = useForm<UpdateProfileDto>({
        defaultValues: {
            username: profile.username,
            avatar: profile.avatar
        },
        resolver: zodResolver(UpdateProfileDtoZodSchema)
    });

    const updateProfile = UsersApi.useUpdate({
        onSuccess: () => {
            toast.success("Profile updated");

            afterSubmit?.();
        },
        onError: () => {
            toast.error("Error via sign up");
        }
    });

    const onSubmit = form.handleSubmit(async (data) => {
        await updateProfile.mutateAsync(data);
    });

    return (
        <form onSubmit={onSubmit}>
            <FieldGroup>
                <Controller
                    name="username"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Username</FieldLabel>

                            <Input {...field} aria-invalid={fieldState.invalid} placeholder="Nickname" />

                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
            </FieldGroup>

            <div className="flex flex-row justify-center items-center mt-6">
                <Button type="submit" disabled={updateProfile.isPending}>
                    Update Profile
                </Button>
            </div>
        </form>
    );
}

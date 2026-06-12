import { zodResolver } from "@hookform/resolvers/zod";
import { type UpdatePasswordDto, UpdatePasswordDtoZodSchema } from "@lib/auth";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
    Button,
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
    Input,
} from "@/shared/ui/kit";
import { PasswordRecoveryApi } from "../api";

type Props = {
    token: string;
};

export function UpdatePasswordForm({ token }: Props) {
    const form = useForm<UpdatePasswordDto>({
        defaultValues: {
            password: "",
        },
        resolver: zodResolver(UpdatePasswordDtoZodSchema),
    });

    const updateProfile = PasswordRecoveryApi.useUpdate();

    const onSubmit = form.handleSubmit(async (data) => {
        await updateProfile.mutateAsync({
            ...data,
            token: token,
        });

        if (updateProfile.isError) {
            toast.error("Error via password updating");
        } else {
            toast.success("Password updated");
        }
    });

    return (
        <form onSubmit={onSubmit}>
            <FieldGroup>
                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Username</FieldLabel>

                            <Input
                                {...field}
                                type="password"
                                aria-invalid={fieldState.invalid}
                                placeholder="Nickname"
                            />

                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </FieldGroup>

            <div className="flex flex-row justify-center items-center mt-6">
                <Button type="submit" disabled={updateProfile.isPending}>
                    Update Password
                </Button>
            </div>
        </form>
    );
}

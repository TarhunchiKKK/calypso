import { zodResolver } from "@hookform/resolvers/zod";
import { type SignUpDto, SignUpDtoZodSchema } from "@repo/common";
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
import { AuthApi } from "../model/auth.api";

type Props = {
    afterSubmit?: () => void;
};

export function SignUpForm({ afterSubmit }: Props) {
    const form = useForm<SignUpDto>({
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
        resolver: zodResolver(SignUpDtoZodSchema),
    });

    const signUp = AuthApi.useSignUp();

    const onSubmit = form.handleSubmit(async (data) => {
        await signUp.mutateAsync(data);

        if (signUp.isError) {
            toast.error("Error via sign up");
        } else {
            toast.success("Account created");
            afterSubmit?.();
        }
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

                            <Input
                                {...field}
                                aria-invalid={fieldState.invalid}
                                placeholder="Nickname"
                            />

                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Email</FieldLabel>

                            <Input
                                {...field}
                                aria-invalid={fieldState.invalid}
                                type="email"
                                placeholder="yourname@gmail.com"
                            />

                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Password</FieldLabel>

                            <Input
                                {...field}
                                aria-invalid={fieldState.invalid}
                                type="password"
                                placeholder="********"
                            />

                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </FieldGroup>

            <div className="flex flex-row justify-center items-center mt-6">
                <Button type="submit" disabled={signUp.isPending}>
                    Sign Up
                </Button>
            </div>
        </form>
    );
}

import { zodResolver } from "@hookform/resolvers/zod";
import { type SignInDto, SignInDtoZodSchema } from "@repo/common";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button, Field, FieldError, FieldGroup, FieldLabel, Input } from "@/shared/ui/kit";
import { AuthApi } from "../model/auth.api";

type Props = {
    afterSubmit?: () => void;
};

export function SignInForm({ afterSubmit }: Props) {
    const form = useForm<SignInDto>({
        defaultValues: {
            email: "",
            password: ""
        },
        resolver: zodResolver(SignInDtoZodSchema)
    });

    const signIn = AuthApi.useSignIn();

    const onSubmit = form.handleSubmit(async (data) => {
        await signIn.mutateAsync(data);

        if (signIn.isError) {
            toast.error("Error via sign in");
        } else {
            toast.success("You are signed up");
            afterSubmit?.();
        }
    });

    return (
        <form onSubmit={onSubmit}>
            <FieldGroup>
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Email</FieldLabel>

                            <Input {...field} aria-invalid={fieldState.invalid} type="email" placeholder="yourname@gmail.com" />

                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Password</FieldLabel>

                            <Input {...field} aria-invalid={fieldState.invalid} type="password" placeholder="********" />

                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
            </FieldGroup>

            <div className="flex flex-row justify-center items-center mt-6">
                <Button type="submit" disabled={signIn.isPending}>
                    Sign In
                </Button>
            </div>
        </form>
    );
}

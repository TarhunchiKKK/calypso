import type { UseMutationOptions } from "@tanstack/react-query";

export type CommonMutationOptions<TData = unknown, TError = Error, TVariables = unknown, TResult = unknown> = Partial<Pick<UseMutationOptions<TData, TError, TVariables, TResult>, "onSuccess" | "onSettled" | "onError">>
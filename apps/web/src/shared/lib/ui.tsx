import type { OmitFields } from "@repo/common";
import type { FC } from "react";

export function bindProps<Props extends Record<string, unknown>, Keys extends keyof Props>(Component: FC<Props>, partialProps: Pick<Props, Keys>) {
    return (omittedProps: OmitFields<Props, Exclude<keyof Props, Keys>>) => {
        return <Component {...(partialProps as Props)} {...omittedProps} />;
    };
}

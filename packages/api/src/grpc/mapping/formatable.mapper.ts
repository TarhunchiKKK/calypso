import type { AnyFormatableElement } from "@repo/common";

export class FormatableMapper {
    public static toGrpc(element: AnyFormatableElement): AnyFormatableElementGrpc {
        switch (element.type) {
            case "paragraph": {
                return { paragraph: element };
            }
            case "code": {
                return { code: element };
            }
            default:
                throw new Error(`Unknown element type: ${element}`);
        }
    }

    public static fromGrpc(element: AnyFormatableElementGrpc): AnyFormatableElement {
        if (element.paragraph) {
            return {
                ...element.paragraph,
                type: "paragraph"
            };
        }

        if (element.code) {
            return {
                ...element.code,
                type: "code"
            };
        }

        throw new Error(`Unknown grpc element: ${element} `);
    }
}

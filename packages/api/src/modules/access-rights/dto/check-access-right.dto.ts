export type CheckAccessRightDto<Operation> = {
    resourceId: string;

    userId: string;

    operation: Operation;
};

export type Renderable = {
    get id(): string;

    render(): React.ReactNode;
};

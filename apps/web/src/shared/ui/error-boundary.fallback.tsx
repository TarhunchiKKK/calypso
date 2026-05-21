import { Button } from "./kit";

type Props = {
    onClick: () => void;
};

// STORY
export function ErrorBoundaryFallback({ onClick }: Props) {
    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            There was an error!
            <Button onClick={onClick}>Try again</Button>
        </div>
    );
}

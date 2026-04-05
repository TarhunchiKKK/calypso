export function Logo() {
    return (
        <div className="flex flex-row justify-between items-center gap-2">
            <div className="text-3xl font-bold">Calypso</div>

            <div className="w-max">
                <img src="/logo.svg" alt="Logo" className="w-14 h-14" />
            </div>
        </div>
    );
}

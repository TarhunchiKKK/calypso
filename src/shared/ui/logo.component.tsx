export function Logo() {
    return (
        <div className="flex flex-row justify-between items-center gap-2">
            <div className="text-xl font-bold">Calypso</div>

            <div className="w-max">
                <img src="/logo.svg" alt="Logo" className="w-10 h-10" />
            </div>
        </div>
    );
}

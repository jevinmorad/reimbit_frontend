
export default function LoadingPage() {
    return (
        <div className="flex h-svh w-full items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-4">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                <p className="text-sm font-medium text-muted-foreground animate-pulse">Initializing app...</p>
            </div>
        </div>
    );
}

export function LoadingSpinner() {
    return (
        <div className="flex flex-1 items-center justify-center p-8">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
    );
}

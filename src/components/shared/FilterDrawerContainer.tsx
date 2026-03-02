import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import React from "react";

interface FilterDrawerContainerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: () => void;
    onClearAll: () => void;
    children: React.ReactNode;
    title?: string;
    className?: string;
}

export function FilterDrawerContainer({
    open,
    onOpenChange,
    onSubmit,
    onClearAll,
    children,
    title = "Filter",
    className,
}: FilterDrawerContainerProps) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                className={cn("flex flex-col h-full w-full sm:max-w-md p-0 gap-0 border-l border-primary/10 shadow-2xl rounded-l-3xl", className)}
                side="right"
                showCloseButton={false}
            >
                {/* Header */}
                <SheetHeader className="px-6 py-6 bg-muted/30 border-b flex flex-row items-center justify-between space-y-0">
                    <SheetTitle className="text-xl font-bold tracking-tight">{title}</SheetTitle>
                    <Button
                        variant="ghost"
                        className="text-primary hover:text-primary/80 px-2 h-auto text-sm font-semibold transition-colors bg-primary/5 hover:bg-primary/10"
                        onClick={onClearAll}
                        type="button"
                    >
                        Clear All
                    </Button>
                </SheetHeader>

                {/* Content - Scrollable */}
                <div className="flex-1 overflow-y-auto px-6 py-8">
                    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        {children}
                    </div>
                </div>

                {/* Footer - Fixed */}
                <SheetFooter className="px-6 py-6 border-t bg-muted/50 sm:justify-between flex-row gap-4 items-center rounded-b-none">
                    <Button
                        variant="outline"
                        className="flex-1 mt-0 font-medium hover:bg-muted transition-colors bg-background px-6"
                        onClick={() => onOpenChange(false)}
                        type="button"
                    >
                        Cancel
                    </Button>
                    <Button
                        className="flex-1 px-8 font-semibold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"
                        onClick={onSubmit}
                        type="button"
                    >
                        Apply Filters
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

import { cn } from "@/lib/utils";
import React from "react";

interface SectionBoxProps {
    title: string;
    children: React.ReactNode;
    variant?: "default" | "info";
    className?: string;
}

export function SectionBox({ title, children, variant = "default", className }: SectionBoxProps) {
    return (
        <div className={cn(
            "rounded-2xl border p-6 transition-all duration-300",
            variant === "info" ? "bg-muted/30 border-muted-foreground/10" : "bg-card border-border shadow-sm",
            className
        )}>
            <div className="flex items-center gap-2 mb-6">
                <div className="h-4 w-1 rounded-full bg-primary/60" />
                <h3 className="font-semibold text-sm uppercase tracking-wider text-foreground/80">{title}</h3>
            </div>
            <div className="grid grid-cols-12 gap-x-6 gap-y-3">
                {children}
            </div>
        </div>
    );
}

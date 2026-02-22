import React from "react";

interface SectionBoxProps {
    title: string;
    children: React.ReactNode;
    variant?: "default" | "info";
}

export function SectionBox({ title, children, variant = "default" }: SectionBoxProps) {
    return (
        <div className={`rounded-lg border p-4 ${variant === "info" ? "bg-muted/50" : "bg-card"}`}>
            <h3 className="mb-4 font-semibold leading-none tracking-tight">{title}</h3>
            <div className="grid gap-4 md:grid-cols-2">
                {children}
            </div>
        </div>
    );
}

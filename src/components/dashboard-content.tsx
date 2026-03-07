import { cn } from '@/lib/utils';
import React from 'react';

interface DashboardContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function DashboardContent({ children, className, ...props }: DashboardContentProps) {
    return (
        <div
            className={cn(
                "flex h-full flex-1 flex-col space-y-4 md:space-y-8 p-0 md:p-4 min-h-0 overflow-auto",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

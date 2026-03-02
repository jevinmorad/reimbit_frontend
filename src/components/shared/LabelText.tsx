import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { getGridClasses, type GridProps } from "./GridUtils";

interface LabelTextProps {
    label: string;
    value?: string | number | null;
    className?: string;
    gridProps?: GridProps;
    layout?: "horizontal" | "vertical";
}

export function LabelText({ label, value, className, gridProps, layout = "horizontal" }: LabelTextProps) {
    if (layout === "vertical") {
        return (
            <div className={cn("flex flex-col gap-1.5", getGridClasses(gridProps), className)}>
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 ml-1">
                    {label}
                </Label>
                <div className="text-sm font-medium text-foreground/90 pl-1 break-words leading-relaxed">
                    {value ?? "-"}
                </div>
            </div>
        );
    }

    return (
        <div className={cn("flex items-baseline", getGridClasses(gridProps), className)}>
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 shrink-0 min-w-[100px]">
                {label}:
            </Label>
            <div className="text-sm font-medium text-foreground/90 break-words leading-relaxed flex-1">
                {value ?? "-"}
            </div>
        </div>
    );
}

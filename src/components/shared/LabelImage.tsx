import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ExternalLink, Image as ImageIcon } from "lucide-react";
import { getGridClasses, type GridProps } from "./GridUtils";

interface LabelImageProps {
    label: string;
    src?: string | null;
    alt?: string;
    className?: string;
    gridProps?: GridProps;
}

export function LabelImage({ label, src, alt, className, gridProps }: LabelImageProps) {
    if (!src) {
        return (
            <div className={cn("flex flex-col gap-2", getGridClasses(gridProps), className)}>
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 shrink-0">
                    {label}
                </Label>
                <div className="flex items-center justify-center h-32 rounded-xl border border-dashed border-muted-foreground/20 bg-muted/10">
                    <div className="flex flex-col items-center gap-1.5 text-muted-foreground/40">
                        <ImageIcon className="h-8 w-8" />
                        <span className="text-xs font-medium">No image</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={cn("flex flex-col gap-2", getGridClasses(gridProps), className)}>
            <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
                    {label}
                </Label>
                <a
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
                >
                    <ExternalLink className="h-3 w-3" />
                    Open
                </a>
            </div>
            <div className="relative group rounded-xl overflow-hidden border border-muted-foreground/10 bg-muted/5">
                <img
                    src={src}
                    alt={alt || label}
                    className="w-full h-auto max-h-64 object-contain rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                />
            </div>
        </div>
    );
}

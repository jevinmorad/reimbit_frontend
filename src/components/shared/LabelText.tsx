import { Label } from "@/components/ui/label";

interface LabelTextProps {
    label: string;
    value?: string | number | null;
}

export function LabelText({ label, value }: LabelTextProps) {
    return (
        <div className="flex flex-col gap-1">
            <Label className="text-muted-foreground">{label}</Label>
            <div className="font-medium">{value ?? "-"}</div>
        </div>
    );
}

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";


interface GridProps {
    size?: {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
    };
}

interface BaseFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder?: string;
    gridProps?: GridProps;
    disabled?: boolean;
}

interface SelectOption {
    Label: string;
    Value: string;
}

interface SelectFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
    options: SelectOption[];
}

const getGridClasses = (gridProps?: GridProps) => {
    if (!gridProps?.size) return "col-span-12";
    const { xs, sm, md, lg, xl } = gridProps.size;
    const classes = [];
    if (xs) classes.push(`col-span-${xs}`);
    if (sm) classes.push(`sm:col-span-${sm}`);
    if (md) classes.push(`md:col-span-${md}`);
    if (lg) classes.push(`lg:col-span-${lg}`);
    if (xl) classes.push(`xl:col-span-${xl}`);
    return classes.join(" ");
};

const Text = <T extends FieldValues>({ control, name, label, placeholder, gridProps, disabled }: BaseFieldProps<T>) => {
    return (
        <div className={getGridClasses(gridProps)}>
            <Controller
                control={control}
                name={name}
                render={({ field, fieldState: { error } }) => (
                    <div className="space-y-1.5 flex flex-col">
                        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">{label}</Label>
                        <Input
                            {...field}
                            value={field.value || ''}
                            placeholder={placeholder}
                            disabled={disabled}
                            className="bg-muted/20 border-muted-foreground/10 focus:bg-background transition-all duration-200"
                        />
                        {error && <p className="text-xs font-medium text-destructive ml-1">{error.message}</p>}
                    </div>
                )}
            />
        </div>
    );
};

const NumberField = <T extends FieldValues>({ control, name, label, placeholder, gridProps, disabled }: BaseFieldProps<T>) => {
    return (
        <div className={getGridClasses(gridProps)}>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, ...field }, fieldState: { error } }) => (
                    <div className="space-y-1.5 flex flex-col">
                        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">{label}</Label>
                        <Input
                            type="number"
                            {...field}
                            onChange={(e) => onChange(e.target.valueAsNumber || 0)}
                            value={field.value || 0}
                            placeholder={placeholder}
                            disabled={disabled}
                            className="bg-muted/20 border-muted-foreground/10 focus:bg-background transition-all duration-200"
                        />
                        {error && <p className="text-xs font-medium text-destructive ml-1">{error.message}</p>}
                    </div>
                )}
            />
        </div>
    );
};

const SelectField = <T extends FieldValues>({ control, name, label, placeholder, options, gridProps, disabled }: SelectFieldProps<T>) => {
    return (
        <div className={getGridClasses(gridProps)}>
            <Controller
                control={control}
                name={name}
                render={({ field, fieldState: { error } }) => (
                    <div className="space-y-1.5 flex flex-col">
                        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">{label}</Label>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={disabled}>
                            <SelectTrigger className="bg-muted/20 border-muted-foreground/10 focus:bg-background transition-all duration-200">
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl shadow-xl border-muted-foreground/10">
                                {options.map((option) => (
                                    <SelectItem key={option.Value} value={option.Value}>
                                        {option.Label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {error && <p className="text-xs font-medium text-destructive ml-1">{error.message}</p>}
                    </div>
                )}
            />
        </div>
    );
};

const DateField = <T extends FieldValues>({ control, name, label, placeholder, gridProps, disabled }: BaseFieldProps<T>) => {
    return (
        <div className={getGridClasses(gridProps)}>
            <Controller
                control={control}
                name={name}
                render={({ field, fieldState: { error } }) => (
                    <div className="space-y-1.5 flex flex-col">
                        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">{label}</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full pl-3 text-left font-normal bg-muted/20 border-muted-foreground/10 hover:bg-muted/30 focus-visible:ring-[2px] focus-visible:ring-primary/20 focus-visible:border-primary/50 transition-all duration-200",
                                        !field.value && "text-muted-foreground"
                                    )}
                                    disabled={disabled}
                                >
                                    {field.value ? (
                                        format(new Date(field.value), "PPP")
                                    ) : (
                                        <span>{placeholder || "Pick a date"}</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 rounded-xl shadow-2xl border-muted-foreground/10" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value ? new Date(field.value) : undefined}
                                    onSelect={(date) => field.onChange(date ? date.toISOString() : null)}
                                    disabled={(date) =>
                                        date > new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                    className="rounded-xl"
                                />
                            </PopoverContent>
                        </Popover>
                        {error && <p className="text-xs font-medium text-destructive ml-1">{error.message}</p>}
                    </div>
                )}
            />
        </div>
    );
};

export const Field = {
    Text,
    Number: NumberField,
    Select: SelectField,
    Date: DateField,
};


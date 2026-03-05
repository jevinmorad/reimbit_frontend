import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { uploadToCloudinary } from "@/utils/cloudinary";
import dayjs from "dayjs";
import { CalendarIcon, ImagePlus, Loader2, Trash2, Upload } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";
import { getGridClasses, type GridProps } from "./GridUtils";


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

interface ImageFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
    accept?: string;
    maxSizeMB?: number;
}

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
                            onChange={(e) => onChange(e.target.value === '' ? undefined : (e.target.valueAsNumber || 0))}
                            value={field.value ?? ''}
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
                        <Select onValueChange={field.onChange} value={field.value || ""} disabled={disabled}>
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
                                        dayjs(field.value).format("MMM DD, YYYY")
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

const ImageField = <T extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    gridProps,
    disabled,
    accept = "image/*",
    maxSizeMB = 5,
}: ImageFieldProps<T>) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleUpload = useCallback(
        async (file: File, onChange: (value: string) => void) => {
            setUploadError(null);

            if (!file.type.startsWith("image/")) {
                setUploadError("Please select an image file.");
                return;
            }

            if (file.size > maxSizeMB * 1024 * 1024) {
                setUploadError(`File size must be less than ${maxSizeMB}MB.`);
                return;
            }

            setIsUploading(true);
            try {
                const result = await uploadToCloudinary(file);
                onChange(result.secure_url);
            } catch (err: any) {
                setUploadError(err.message || "Upload failed. Please try again.");
            } finally {
                setIsUploading(false);
            }
        },
        [maxSizeMB]
    );

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled && !isUploading) setIsDragging(true);
    }, [disabled, isUploading]);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent, onChange: (value: string) => void) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);
            if (disabled || isUploading) return;

            const file = e.dataTransfer.files?.[0];
            if (file) handleUpload(file, onChange);
        },
        [disabled, isUploading, handleUpload]
    );

    return (
        <div className={getGridClasses(gridProps)}>
            <Controller
                control={control}
                name={name}
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <div className="space-y-1.5 flex flex-col">
                        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">
                            {label}
                        </Label>

                        {/* Hidden file input */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept={accept}
                            className="hidden"
                            disabled={disabled || isUploading}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleUpload(file, onChange);
                                e.target.value = "";
                            }}
                        />

                        {value ? (
                            /* Preview state */
                            <div className="relative group rounded-xl overflow-hidden border border-muted-foreground/10 bg-muted/5">
                                <img
                                    src={value}
                                    alt={label}
                                    className="w-full h-auto max-h-48 object-contain rounded-xl"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        size="sm"
                                        className="rounded-lg shadow-lg"
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={disabled || isUploading}
                                    >
                                        <Upload className="h-3.5 w-3.5 mr-1.5" />
                                        Replace
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        className="rounded-lg shadow-lg"
                                        onClick={() => onChange("")}
                                        disabled={disabled || isUploading}
                                    >
                                        <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            /* Upload dropzone */
                            <div
                                className={cn(
                                    "flex flex-col items-center justify-center gap-3 h-40 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200",
                                    isDragging
                                        ? "border-primary bg-primary/5 scale-[1.01]"
                                        : "border-muted-foreground/20 bg-muted/10 hover:border-primary/40 hover:bg-muted/20",
                                    (disabled || isUploading) && "cursor-not-allowed opacity-50"
                                )}
                                onClick={() => {
                                    if (!disabled && !isUploading) fileInputRef.current?.click();
                                }}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleDrop(e, onChange)}
                            >
                                {isUploading ? (
                                    <>
                                        <Loader2 className="h-8 w-8 text-primary animate-spin" />
                                        <span className="text-xs font-medium text-muted-foreground">Uploading...</span>
                                    </>
                                ) : (
                                    <>
                                        <ImagePlus className="h-8 w-8 text-muted-foreground/40" />
                                        <div className="text-center">
                                            <span className="text-sm font-medium text-muted-foreground/70">
                                                {placeholder || "Click or drag an image"}
                                            </span>
                                            <p className="text-xs text-muted-foreground/40 mt-0.5">
                                                PNG, JPG, WEBP up to {maxSizeMB}MB
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        {uploadError && (
                            <p className="text-xs font-medium text-destructive ml-1">{uploadError}</p>
                        )}
                        {error && !uploadError && (
                            <p className="text-xs font-medium text-destructive ml-1">{error.message}</p>
                        )}
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
    Image: ImageField,
};

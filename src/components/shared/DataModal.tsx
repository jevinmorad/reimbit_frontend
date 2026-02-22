import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"
import React, { useEffect, useRef } from "react"

export interface DataModalButtons {
    onSubmit: () => void
    isPending: boolean
    isSuccess: boolean
}

export type DataModalComponentProps<TModel> = {
    data?: TModel
    isEditing?: boolean
    onClose?: () => void
}

export type DataModalComponent<TModel> = React.ForwardRefExoticComponent<
    Omit<DataModalComponentProps<TModel>, 'ref'> & React.RefAttributes<DataModalButtons>
>

export type DataModalProps<TModel> = {
    Component: DataModalComponent<TModel>
    data?: TModel
    isLoading?: boolean
    handleClose?: () => void
    modalTitle: string
    open: boolean
    maxWidth?: 'lg' | 'md' | 'sm' | 'xl' | 'xs'
    fullScreen?: boolean
    subTitle?: string | null
    isEditing?: boolean
    mode: 'add' | 'edit' | 'view'
}

export function DataModal<TModel = unknown>(props: DataModalProps<TModel>) {
    const {
        Component,
        data,
        handleClose,
        open,
        modalTitle,
        subTitle,
        isLoading,
        isEditing,
        mode,
        maxWidth,
    } = props

    const formRef = useRef<DataModalButtons>(null)

    useEffect(() => {
        if (formRef.current?.isSuccess) {
            handleClose?.()
        }
    }, [formRef.current?.isSuccess, handleClose]) // dependent on isSuccess value

    const maxWidthMap: Record<string, string> = {
        xs: 'sm:max-w-xs',
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-[600px]',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
    };
    const maxWidthClass = maxWidthMap[maxWidth || 'md'] || 'sm:max-w-[600px]';

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className={`${maxWidthClass} max-h-[90vh] overflow-y-auto flex flex-col gap-0 p-0 rounded-2xl border-none shadow-2xl`}>
                <DialogHeader className="p-6 pb-4 bg-gradient-to-br from-primary/5 via-background to-background border-b rounded-t-2xl">
                    <div className="space-y-1">
                        <DialogTitle className="text-xl font-semibold tracking-tight">{modalTitle}</DialogTitle>
                        {subTitle && (
                            <DialogDescription className="text-muted-foreground/80">
                                {subTitle}
                            </DialogDescription>
                        )}
                    </div>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto p-8 pt-6">
                    {isLoading ? (
                        <div className="flex h-[200px] items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-primary opacity-50" />
                        </div>
                    ) : (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <Component
                                ref={formRef}
                                data={data}
                                isEditing={isEditing}
                                onClose={handleClose}
                            />
                        </div>
                    )}
                </div>

                {mode !== 'view' && (
                    <DialogFooter className="p-6 pt-4 border-t bg-muted/20 rounded-b-2xl flex flex-row justify-end items-center gap-3">
                        <Button
                            variant="outline"
                            onClick={handleClose}
                            className="font-medium transition-colors bg-background px-6 hover:bg-muted/50"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => formRef.current?.onSubmit?.()}
                            type="button"
                            disabled={formRef.current?.isPending}
                            className="px-8 font-semibold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"
                        >
                            {formRef.current?.isPending && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Save Changes
                        </Button>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    )
}

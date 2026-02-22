import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

interface GlobalConfirmDialogProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title: string
    description: string
    variant?: "default" | "destructive"
    confirmText?: string
    cancelText?: string
}

export function GlobalConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    variant = "default",
    confirmText = "Confirm",
    cancelText = "Cancel"
}: GlobalConfirmDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>{cancelText}</Button>
                    <Button variant={variant} onClick={() => {
                        onConfirm()
                        onClose()
                    }}>{confirmText}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

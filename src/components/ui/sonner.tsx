import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      richColors
      icons={{
        success: <CircleCheckIcon className="size-4 text-green-600" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        className: "group font-sans transition-all duration-300",
        style: {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--success-bg": "rgba(246, 255, 249, 1)",
          "--success-text": "rgb(21, 128, 61)",
          "--success-border": "rgba(228, 249, 240, 1)",
          "--error-bg": "rgb(254, 242, 242)",
          "--error-text": "rgb(185, 28, 28)",
          "--error-border": "rgb(254, 202, 202)",
          "--border-radius": "12px",
        } as React.CSSProperties,
      }}
      {...props}
    />
  )
}

export { Toaster }

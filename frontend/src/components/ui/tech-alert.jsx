import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle, Info, X, AlertTriangle, Shield } from "lucide-react";

const alertVariants = cva(
  "relative w-full rounded-lg p-4 [&>svg~*]:pl-7 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "bg-destructive/15 text-destructive dark:bg-destructive/20 border-l-4 border-destructive",
        success: "bg-trust-50 dark:bg-trust-900/20 text-trust-700 dark:text-trust-300 border-l-4 border-trust-500",
        warning: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 border-l-4 border-yellow-500",
        info: "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500",
        // Tech variants
        tech: "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border border-blue-200/50 dark:border-blue-700/30 backdrop-blur-sm shadow-sm",
        glass: "bg-white/10 dark:bg-gray-900/20 backdrop-blur-lg border border-white/20 dark:border-gray-800/30 shadow-lg",
        shield: "bg-shield-50 dark:bg-shield-900/20 text-shield-700 dark:text-shield-300 border-l-4 border-shield-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const iconMap = {
  default: Info,
  destructive: AlertCircle,
  success: CheckCircle,
  warning: AlertTriangle,
  info: Info,
  tech: Info,
  glass: Info,
  shield: Shield
};

function TechAlert({
  className,
  variant = "default",
  title,
  children,
  icon,
  dismissible = false,
  onDismiss,
  ...props
}) {
  const IconComponent = icon || iconMap[variant] || Info;
  const [dismissed, setDismissed] = React.useState(false);

  const handleDismiss = () => {
    setDismissed(true);
    if (onDismiss) onDismiss();
  };

  if (dismissed) return null;

  return (
    <div
      className={cn(
        alertVariants({ variant }),
        "flex flex-col gap-1",
        dismissible && "pr-12",
        className
      )}
      {...props}
    >
      <IconComponent className="h-5 w-5" />
      {title && <h5 className="font-medium [&:not(:first-child)]:pt-2">{title}</h5>}
      <div className="text-sm [&:not(:first-child)]:pt-2">{children}</div>
      
      {dismissible && (
        <button
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-800/50 transition-colors"
          onClick={handleDismiss}
          aria-label="Dismiss alert"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export { TechAlert, alertVariants };

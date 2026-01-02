import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 relative",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",

        // Enhanced custom variants with unique styling
        shield:
          "bg-gradient-to-br from-shield-500 to-shield-600 text-white shadow hover:shadow-xl hover:shadow-shield-500/20 active:translate-y-0.5 transition-all duration-200 overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-0.5 before:bg-white/20 after:absolute after:bottom-0 after:right-0 after:left-8 after:h-0.5 after:bg-black/10",

        trusty:
          "bg-trust-500 text-white shadow hover:bg-trust-600 hover:shadow-lg hover:shadow-trust-500/20 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-trust-400/0 before:via-white/20 before:to-trust-400/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-500",

        alert:
          "bg-amber-500 text-white shadow hover:bg-amber-600 active:translate-y-0.5 transition-all duration-200",

        shieldOutline:
          "border-2 border-shield-500 text-shield-600 dark:text-shield-400 hover:bg-shield-50 dark:hover:bg-shield-950/20 relative hover:shadow-lg hover:shadow-shield-500/10 transition-all duration-200 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-shield-500 hover:after:w-full after:transition-all after:duration-300",

        tech:
          "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/20 active:translate-y-0.5 transition-all duration-300 border border-blue-400/30 overflow-hidden before:absolute before:inset-0 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 before:bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.2),transparent_50%)]",

        techOutline:
          "border border-blue-500/50 text-blue-600 dark:text-blue-400 hover:bg-blue-50/30 dark:hover:bg-blue-900/20 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-blue-500 relative after:absolute after:bottom-0 after:right-0 after:h-full after:w-1 after:bg-gradient-to-b after:from-blue-500/0 after:via-blue-500/50 after:to-blue-500/0 after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300",

        glass:
          "bg-white/10 backdrop-blur-md border border-white/20 shadow hover:bg-white/20 text-foreground dark:border-neutral-700/50 transition-all duration-300 hover:shadow-lg relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-white/20 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",

        // New variants with distinctive styling
        circuit:
          "bg-gradient-to-br from-shield-800 to-shield-900 text-white border border-shield-700/50 relative overflow-hidden shadow-inner shadow-shield-900/50 hover:shadow-shield-500/20 transition-all duration-300 before:absolute before:inset-0 before:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoNjYsIDE1MywgMjI1LCAwLjIpIiBzdHJva2Utd2lkdGg9IjEiPjxwYXRoIGQ9Ik0wIDIwaDQwTTIwIDBoMjAiLz48L2c+PC9zdmc+')] before:bg-[length:20px_20px] before:opacity-30",

        cyberpunk:
          "bg-black text-yellow-400 border-l-4 border-r-0 border-t-0 border-b-0 border-yellow-400 hover:bg-yellow-400/10 transition-colors duration-300 overflow-hidden relative before:absolute before:inset-0 before:border-t before:border-r before:border-yellow-400 before:border-opacity-0 hover:before:border-opacity-100 before:transition-all before:duration-300",

        subtle:
          "bg-transparent hover:bg-shield-100/30 dark:hover:bg-shield-900/20 text-shield-700 dark:text-shield-300 border-b border-shield-300/30 dark:border-shield-700/30 rounded-none hover:border-shield-500 dark:hover:border-shield-500 transition-all duration-200 py-1 px-3",

        hologram:
          "bg-blue-500/10 border border-blue-400/30 text-blue-600 dark:text-blue-400 backdrop-blur-sm shadow-inner shadow-blue-400/5 hover:bg-blue-500/20 transition-all duration-300 relative overflow-hidden before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.2),transparent_70%)] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        xl: "h-12 rounded-md px-10 text-base",
        asymm: "h-10 pl-4 pr-6 rounded-l-md rounded-r-sm",
      },
      motion: {
        none: "",
        pulse: "animate-pulse",
        bounce: "hover:animate-bounce",
        glint: "overflow-hidden before:absolute before:inset-0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:skew-x-12 before:bg-white/10 before:transition-transform before:duration-700 before:ease-in-out",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      motion: "none",
    },
  }
);

const Button = React.forwardRef(
  (
    {
      className,
      variant,
      size,
      motion,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    // Track hover state for advanced effects
    const [isHovered, setIsHovered] = React.useState(false);

    // Handle button interactions
    const handleMouseEnter = React.useCallback(
      (e) => {
        setIsHovered(true);
        if (props.onMouseEnter) props.onMouseEnter(e);
      },
      [props.onMouseEnter]
    );

    const handleMouseLeave = React.useCallback(
      (e) => {
        setIsHovered(false);
        if (props.onMouseLeave) props.onMouseLeave(e);
      },
      [props.onMouseLeave]
    );

    // Add ripple effect to certain button variants
    const addRipple = (e) => {
      if (!["shield", "tech", "trusty"].includes(variant)) return;

      const button = e.currentTarget;
      const ripple = document.createElement("span");
      const rect = button.getBoundingClientRect();

      const size = Math.max(rect.width, rect.height) * 2;
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.className = "absolute rounded-full bg-white/20 pointer-events-none";
      ripple.style.transform = "scale(0)";
      ripple.style.animation = "ripple 600ms ease-out forwards";

      button.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 700);
    };

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, motion, className }))}
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={(e) => {
          addRipple(e);
          if (props.onClick) props.onClick(e);
        }}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

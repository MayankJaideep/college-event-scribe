import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        workshop: "border-transparent bg-primary/10 text-primary border-primary/20",
        fest: "border-transparent bg-secondary/10 text-secondary border-secondary/20",
        seminar: "border-transparent bg-success/10 text-success border-success/20",
        hackathon: "border-transparent bg-warning/10 text-warning border-warning/20",
        sports: "border-transparent bg-error/10 text-error border-error/20",
        cultural: "border-transparent bg-primary-light/10 text-primary-light border-primary-light/20",
        status: "border-transparent bg-muted text-muted-foreground",
        success: "border-transparent bg-success/10 text-success border-success/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

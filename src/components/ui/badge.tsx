import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"


const badgeVariants = cva(
  "inline-flex items-center  border px-1.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-gray-950 bg-transparent text-white shadow 0",
        secondary:
          "border-gray-50 bg-transparent text-white ",
        destructive:
          "border-red-950 bg-transparent text-white shadow ",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)



export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({  ...props }: BadgeProps) {
  
  return (
    <div className={" border-black/[.5] dark:border-white/[.45] bg-transparent text-black/[.5] dark:text-white/[.6] m-1 inline-flex items-center  border px-1.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"} {...props} />
  )
}

export { Badge, badgeVariants }

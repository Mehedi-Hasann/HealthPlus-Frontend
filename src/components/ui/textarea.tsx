import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/20 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-slate-900/50 flex field-sizing-content min-h-20 w-full rounded-xl border bg-white px-3 py-2 text-base shadow-sm transition-[color,box-shadow] duration-300 outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm hover:border-ring/50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }

"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface AbsoluteContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

function AbsoluteContainer({
  children,
  className,
  ...props
}: AbsoluteContainerProps) {
  return (
    <div
      data-slot="absolute-container"
      className={cn(
        "absolute inset-0 w-full h-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { AbsoluteContainer } 
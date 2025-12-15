import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cn } from "@/lib/utils"

function Popover(props) {
  return <PopoverPrimitive.Root {...props} />
}

function PopoverTrigger(props) {
  return <PopoverPrimitive.Trigger {...props} />
}

function PopoverContent({
  className,
  align = "start",
  sideOffset = 4,
  ...props
}) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align={align}
        sideOffset={sideOffset}
        className={cn(
          // 🌙 Dark theme
          "bg-[#0f0f0f] text-gray-200 border border-gray-700",

          // 📏 Match trigger width
          "w-[var(--radix-popover-trigger-width)]",

          // 🎨 UI polish
          "rounded-lg shadow-xl p-2 z-50",

          // ✨ Smooth animations
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",

          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

function PopoverAnchor(props) {
  return <PopoverPrimitive.Anchor {...props} />
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }

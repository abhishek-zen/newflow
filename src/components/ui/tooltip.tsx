'use client'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type TooltipProps = {
  content: ReactNode
  children: ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'center' | 'start' | 'end'
}

export default function Tooltip({
  content,
  children,
  side = 'top',
  align = 'center',
}: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={180}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          <span tabIndex={0} className="outline-none">{children}</span>
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            align={align}
            sideOffset={8}
            className={twMerge(
              "px-3 py-1.5 rounded-md text-xs font-medium bg-foreground/95 text-background shadow-lg z-50 border border-muted transition-opacity",
              "animate-fade-in"
            )}
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-foreground/95" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEditor } from '@craftjs/core'
import { ReactElement, ReactNode } from 'react'

import { cn } from '../@config/lib/cn'

interface GrabElementCreaterProps {
  className?: string
  children: ReactNode
  element: ReactElement
}

export function GrabElementCreater({
  children,
  element,
  className,
}: GrabElementCreaterProps) {
  const { connectors }: any = useEditor()

  return (
    <div
      ref={(ref) => connectors.create(ref, element)}
      className="rounded-md border border-dashed border-zinc-600 p-3"
    >
      <div
        className={cn(
          'cursor-grab rounded-md bg-zinc-700 px-3 py-2 transition-all hover:brightness-90',
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}

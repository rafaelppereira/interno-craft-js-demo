/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNode } from '@craftjs/core'
import { ReactNode } from 'react'

interface RootCraftProps {
  children: ReactNode
}

export function RootCraft({ children, ...props }: RootCraftProps) {
  const {
    connectors: { connect, drag },
  }: any = useNode()

  return (
    <form
      {...props}
      method="POST"
      className="h-full space-y-3"
      ref={(ref) => connect(drag(ref))}
    >
      {children}
    </form>
  )
}

RootCraft.craft = {}

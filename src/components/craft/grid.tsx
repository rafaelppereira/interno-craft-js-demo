/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNode } from '@craftjs/core'
import { ReactNode } from 'react'

interface GridCraftProps {
  children?: ReactNode
  columns?: number
}

export function GridCraft({ children, columns = 2 }: GridCraftProps) {
  const {
    connectors: { connect, drag },
  }: any = useNode()

  return (
    <div
      ref={(ref) => connect(drag(ref))}
      className={`grid grid-cols-${columns} gap-3 rounded-md border border-zinc-700 px-4 py-6`}
    >
      {children}
    </div>
  )
}

const GridCraftSettings = () => {
  const {
    actions: { setProp },
    columns,
  } = useNode((node) => ({
    columns: node.data.props.columns,
  }))

  return (
    <div>
      <label className="block text-sm font-medium">Colunas</label>
      <input
        type="number"
        min={1}
        max={6}
        value={columns || 2}
        onChange={(e) =>
          setProp((props: any) => (props.columns = Number(e.target.value)))
        }
        className="mt-2 w-full rounded-md border p-1"
      />
    </div>
  )
}

export const GridDefaultProps = {
  columns: 2,
}

GridCraft.craft = {
  props: GridDefaultProps,
  related: {
    settings: GridCraftSettings,
  },
}

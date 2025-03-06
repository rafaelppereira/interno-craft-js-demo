/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNode } from '@craftjs/core'

interface BannerCraftProps {}

export function BannerCraft({ ...props }: BannerCraftProps) {
  const {
    connectors: { connect },
  }: any = useNode()

  return (
    <div {...props} ref={(ref) => connect(ref)}>
      <img
        src="/background.svg"
        alt="Banner do formulário"
        className="pointer-events-none h-40 w-full select-none rounded-xl border border-zinc-700 object-cover"
      />
    </div>
  )
}

const BannerCraftSettings = () => {
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

export const BannerDefaultProps = {
  columns: 2,
}

BannerCraft.craft = {
  props: BannerDefaultProps,
  related: {
    settings: BannerCraftSettings,
  },
}

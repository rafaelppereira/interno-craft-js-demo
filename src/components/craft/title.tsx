/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNode } from '@craftjs/core'

import { cn } from '../../@config/lib/cn'
import { useCurrentCraftComponent } from '../../@config/utils/use-current-craft-component'

interface TitleCraftProps {
  title: string
  description: string
}

export function TitleCraft({ title, description, ...props }: TitleCraftProps) {
  const {
    connectors: { connect, drag },
    selected,
    id,
  } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
  }))

  const { selected: selectedCurrentComponent } = useCurrentCraftComponent()

  return (
    <div
      {...props}
      className={cn(
        'space-y-1.5 rounded-md border-l-4 border-l-zinc-600 bg-zinc-700/50 px-4 py-3 transition-all',
        selectedCurrentComponent &&
          selectedCurrentComponent.id === id &&
          'border-l-amber-500',
      )}
      onClick={() => selected}
      ref={(ref) => ref && connect(drag(ref))}
    >
      <h2 className="select-none text-lg font-semibold tracking-tight">
        {title}
      </h2>
      <p className="max-w-sm select-none pb-1 text-sm font-medium text-muted-foreground">
        {description}
      </p>
    </div>
  )
}

const TitleCraftSettings = () => {
  const {
    actions: { setProp },
    fontSize,
  }: any = useNode((node) => ({
    fontSize: node.data.props.fontSize,
  }))

  return (
    <div>
      <label>
        Tamanho da fonte
        <input
          type="range"
          value={fontSize || 7}
          step={7}
          min={12}
          max={30}
          onChange={(e) =>
            setProp((props: any) => (props.fontSize = e.target.value))
          }
          className="mt-2 w-full"
        />
      </label>
    </div>
  )
}

export const InputMallDefaultProps = {
  fontSize: 16,
}

TitleCraft.craft = {
  props: InputMallDefaultProps,
  related: {
    settings: TitleCraftSettings,
  },
}

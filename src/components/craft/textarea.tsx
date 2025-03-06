/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNode } from '@craftjs/core'

import { cn } from '../../@config/lib/cn'
import { useCurrentCraftComponent } from '../../@config/utils/use-current-craft-component'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

interface TextareaCraftProps {
  label: string
  placeholder: string
}

export function TextareaCraft({
  label,
  placeholder,
  ...props
}: TextareaCraftProps) {
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
      <Label className="select-none font-semibold tracking-tight text-muted-foreground">
        {label}
      </Label>
      <Textarea
        placeholder={placeholder}
        className="h-32 resize-none bg-zinc-900 outline-none transition-all focus-visible:ring-violet-500"
      />
    </div>
  )
}

const TextareaCraftSettings = () => {
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

export const TextareaMallDefaultProps = {
  fontSize: 16,
}

TextareaCraft.craft = {
  props: TextareaMallDefaultProps,
  related: {
    settings: TextareaCraftSettings,
  },
}

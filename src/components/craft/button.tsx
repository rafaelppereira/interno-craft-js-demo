/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNode } from '@craftjs/core'
import { ReactNode } from 'react'

import { cn } from '../../@config/lib/cn'
import { useCurrentCraftComponent } from '../../@config/utils/use-current-craft-component'
import { Button } from '../ui/button'

interface ButtonCraftProps {
  type: 'submit' | 'button'
  children: ReactNode
}

export function ButtonCraft({ children, type, ...props }: ButtonCraftProps) {
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
      <Button
        type={type}
        className="pointer-events-none w-full select-none bg-violet-500 text-white"
      >
        {children}
      </Button>
    </div>
  )
}

const ButtonCraftSettings = () => {
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

export const ButtonDefaultProps = {
  fontSize: 16,
}

ButtonCraft.craft = {
  props: ButtonDefaultProps,
  related: {
    settings: ButtonCraftSettings,
  },
}

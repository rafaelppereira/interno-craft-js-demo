import { AnimatePresence, motion } from 'framer-motion'
import { Pencil, PencilIcon, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { cn } from '../../@config/lib/cn'
import { useCurrentCraftComponent } from '../../@config/utils/use-current-craft-component'
import { Button } from '../ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '../ui/drawer'

export function CraftConfig() {
  const [visible, setVisible] = useState(false)
  const [openSheet, setOpenSheet] = useState(false)

  const { actions, selected } = useCurrentCraftComponent()

  function handleDeleteComponent() {
    actions.delete(selected?.id)
  }
  function handleEditComponent() {
    setOpenSheet(true)
  }

  useEffect(() => {
    if (
      !selected ||
      selected.name === 'RootCraft' ||
      selected.name === 'BannerCraft'
    ) {
      setVisible(false)
    } else {
      setVisible(true)
    }
  }, [selected])

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{
            opacity: 1,
            x: 100,
          }}
          animate={{
            x: visible ? 0 : 100,
            opacity: visible ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className={cn(
            'ounded-xl fixed right-24 top-1/2 z-[5000] flex -translate-y-1/2 flex-col items-center justify-center gap-2 rounded-xl border border-transparent bg-zinc-700 p-2',
            openSheet && 'hidden',
          )}
        >
          <Button
            variant="secondary"
            onClick={handleDeleteComponent}
            className="relative rounded-full border border-white/[0.2] text-sm font-medium text-white"
          >
            <Trash2 className="mr-2 size-4" />
            Excluir
          </Button>

          <Button
            variant="secondary"
            onClick={handleEditComponent}
            className="relative rounded-full border border-white/[0.2] text-sm font-medium text-white"
          >
            <PencilIcon className="mr-2 size-4" />
            Editar
          </Button>
        </motion.div>
      </AnimatePresence>

      <SheetCraftConfig openSheet={openSheet} setOpenSheet={setOpenSheet} />
    </>
  )
}

function SheetCraftConfig({
  openSheet,
  setOpenSheet,
}: {
  openSheet: boolean
  setOpenSheet: (openSheet: boolean) => void
}) {
  const { selected, actions } = useCurrentCraftComponent()
  return (
    <Drawer open={openSheet} onOpenChange={setOpenSheet}>
      <DrawerContent className="mx-auto flex max-w-7xl flex-col justify-between bg-zinc-900">
        <DrawerHeader>
          <DrawerTitle>Edição de propriedades</DrawerTitle>
          <DrawerDescription>
            Modifique as propriedades dos seus componentes para se encaixar no
            seu formulário!
          </DrawerDescription>
        </DrawerHeader>

        <div className="mt-6 flex flex-col gap-5 px-4 text-sm">
          <div data-cy="settings-panel">
            {selected?.settings && React.createElement(selected.settings)}
          </div>
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button
              onClick={() => actions.delete(selected?.id)}
              className="text-base"
              variant={'destructive'}
            >
              <Trash2 className="mr-2 size-5 stroke-zinc-50" />
              Deletar
            </Button>
          </DrawerClose>

          <DrawerClose asChild>
            <Button
              variant={'default'}
              className="text-base"
              onClick={() => actions.selectNode(undefined)}
            >
              <Pencil className="mr-2 size-5 stroke-zinc-50" />
              Salvar propriedades
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

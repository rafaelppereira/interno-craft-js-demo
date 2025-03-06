/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editor } from '@craftjs/core'
import { ChevronLeftIcon, SaveIcon } from 'lucide-react'

import { BannerCraft } from '../components/craft/banner'
import { ButtonCraft } from '../components/craft/button'
import { CraftConfig } from '../components/craft/config'
import { GridCraft } from '../components/craft/grid'
import { InputCraft } from '../components/craft/input'
import { RootCraft } from '../components/craft/root'
import { TextareaCraft } from '../components/craft/textarea'
import { TitleCraft } from '../components/craft/title'
import { EditorContent } from '../components/editor-content'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs'

export function Home() {
  return (
    <main className="min-h-screen w-full bg-background bg-cover bg-fixed bg-center bg-no-repeat">
      <Tabs defaultValue="constructor">
        <div className="pt-5">
          <header className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between rounded-sm bg-zinc-900 px-4">
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                type="button"
                variant="secondary"
                className="size-12"
                title="Clique para voltar uma etapa"
              >
                <ChevronLeftIcon className="size-6" />
              </Button>
              <div className="hidden md:block">
                <h2 className="font-semibold tracking-tight">
                  Construtor de formulário
                </h2>
                <p className="text-sm font-medium text-muted-foreground">
                  Crie seu formulário padrão para utilizar
                </p>
              </div>
            </div>

            <TabsList>
              <TabsTrigger value="constructor">Construtor</TabsTrigger>
              <TabsTrigger value="preview">Pré-visualização</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-3">
              <Badge variant="destructive" className="hidden lg:flex">
                Alterado
              </Badge>

              <Button
                size="icon"
                type="button"
                variant="secondary"
                className="flex lg:hidden"
                title="Clique para salvar as informações"
              >
                <SaveIcon className="size-4" />
              </Button>

              <Button
                type="button"
                variant="secondary"
                className="hidden lg:flex"
                title="Clique para salvar as informações"
              >
                <SaveIcon className="mr-2 size-4" />
                Salvar informações
              </Button>
            </div>
          </header>
        </div>

        <div className="pt-6">
          <Editor
            resolver={{
              GridCraft,
              RootCraft,
              TitleCraft,
              InputCraft,
              BannerCraft,
              ButtonCraft,
              TextareaCraft,
            }}
          >
            <EditorContent />

            <CraftConfig />
          </Editor>
        </div>
      </Tabs>
    </main>
  )
}

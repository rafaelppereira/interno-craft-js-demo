import { Element, Frame } from '@craftjs/core'

import { BannerCraft } from './craft/banner'
import { ButtonCraft } from './craft/button'
import { GridCraft } from './craft/grid'
import { InputCraft } from './craft/input'
import { RootCraft } from './craft/root'
import { TextareaCraft } from './craft/textarea'
import { TitleCraft } from './craft/title'
import { GrabElementCreater } from './grab-element-creater'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { TabsContent } from './ui/tabs'
import { Textarea } from './ui/textarea'

export function EditorContent() {
  // const { query } = useEditor((state) => ({
  //   nodes: state.nodes,
  // }))

  // const hasElements = query.node('ROOT').get()?.data?.nodes?.length > 0

  return (
    <div className="mx-auto max-w-7xl rounded-md bg-zinc-900 px-4 pb-3 pt-1">
      <TabsContent value="constructor">
        <div className="flex gap-4">
          <aside className="rounded-md bg-zinc-800 p-5">
            <div className="sticky top-32">
              <div>
                <h1 className="text-lg font-semibold tracking-tight">
                  Tipos de campos
                </h1>
                <p className="mt-1 max-w-xs text-sm text-muted-foreground">
                  Arraste e solte os campos para construir seu formulário
                  totalmente personalizado.
                </p>
              </div>

              <div className="mt-5 flex flex-col gap-4">
                <GrabElementCreater
                  element={
                    <TitleCraft
                      title="Título principal"
                      description="Título complementar ao principal"
                    />
                  }
                >
                  <h2 className="select-none text-lg font-semibold tracking-tight">
                    Título principal
                  </h2>
                  <p className="select-none pb-1 text-sm font-medium text-muted-foreground">
                    Título complementar ao principal
                  </p>
                </GrabElementCreater>

                <GrabElementCreater
                  className="space-y-1.5"
                  element={
                    <InputCraft
                      inputType="Texto"
                      label="Texto de exemplo"
                      placeholder="Digite seu texto"
                    />
                  }
                >
                  <Label className="select-none font-semibold tracking-tight text-muted-foreground">
                    Texto de exemplo
                  </Label>
                  <Input
                    placeholder="Digite seu texto"
                    className="pointer-events-none h-12 select-none"
                  />
                </GrabElementCreater>

                <GrabElementCreater
                  className="space-y-1.5"
                  element={
                    <TextareaCraft
                      label="Texto de exemplo"
                      placeholder="Digite seu texto"
                    />
                  }
                >
                  <Label className="select-none font-semibold tracking-tight text-muted-foreground">
                    Texto de exemplo
                  </Label>
                  <Textarea
                    placeholder="Digite seu texto"
                    className="pointer-events-none h-12 select-none resize-none"
                  />
                </GrabElementCreater>

                <GrabElementCreater
                  className="space-y-1.5"
                  element={<Element is={GridCraft} columns={2} canvas />}
                >
                  <div className="flex items-center gap-2">
                    <div className="inline-block h-10 w-full rounded-md bg-zinc-800" />
                    <div className="inline-block h-10 w-full rounded-md bg-zinc-800" />
                  </div>
                </GrabElementCreater>

                <GrabElementCreater
                  className="space-y-1.5"
                  element={
                    <ButtonCraft type="submit">Texto de exemplo</ButtonCraft>
                  }
                >
                  <Button
                    type="button"
                    className="pointer-events-none w-full select-none bg-zinc-600 text-white"
                  >
                    Texto de exemplo
                  </Button>
                </GrabElementCreater>
              </div>
            </div>
          </aside>

          <div className="w-full flex-1 rounded-md bg-zinc-800 p-5">
            {/* <div className="flex h-full w-full flex-col items-center justify-center">
                    <img
                      src="/logo.png"
                      className="w-40"
                      alt="Instituto AmiGU"
                    />
                    <h2 className="mt-5 text-xl font-semibold tracking-tight">
                      Arraste e solte os campos
                    </h2>
                    <p className="max-w-md text-center text-muted-foreground">
                      Chegou a hora de criar seu formulário personalizado para
                      utilizar na captação de novos usuários.
                    </p>
                  </div> */}
            <Frame>
              <Element canvas is={RootCraft}>
                <BannerCraft />
                <TitleCraft
                  title="Formulário de inscrições de mentores"
                  description="Preencha as informações abaixo para se inscrever como mentor em nosso evento."
                />
                <InputCraft
                  inputType="Texto"
                  label="Nome completo"
                  placeholder="Digite seu nome completo"
                />
                <GridCraft columns={2}>
                  <InputCraft
                    inputType="Texto"
                    label="Endereço de e-mail"
                    placeholder="Digite seu endereço de e-mail"
                  />
                  <InputCraft
                    label="Telefone"
                    inputType="Texto"
                    placeholder="Digite seu telefone"
                  />
                </GridCraft>

                <TextareaCraft
                  label="Como você encontrou nosso evento?"
                  placeholder="Digite como que você encontrou nosso evento nas redes sociais"
                />

                <ButtonCraft type="submit">Inscrever-se</ButtonCraft>
              </Element>
            </Frame>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="preview">Preview</TabsContent>
    </div>
  )
}

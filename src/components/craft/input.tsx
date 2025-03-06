/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNode } from '@craftjs/core'
import { useState } from 'react'
import InputMask from 'react-input-mask'
import { toast } from 'sonner'
import { z } from 'zod'

import { cn } from '../../@config/lib/cn'
import { useCurrentCraftComponent } from '../../@config/utils/use-current-craft-component'
import { Checkbox } from '../ui/checkbox'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

export const ValidationTypes = {
  STRING: z.string(),
  NUMBER: z.number(),
  EMAIL: z.string().email('E-mail inválido'),
  PHONE: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Número de telefone inválido'),
  REQUIRED: (message?: string) =>
    z.string().min(1, message || 'Campo obrigatório'),
  MIN_LENGTH: (min: number) =>
    z.string().min(min, `Mínimo de ${min} caracteres`),
  MAX_LENGTH: (max: number) =>
    z.string().max(max, `Máximo de ${max} caracteres`),
  REGEX: (regex: RegExp, message?: string) => z.string().regex(regex, message),
}

const InputTypes = {
  Texto: z.string(),
  Phone: z.number(),
  Email: z.string().email(),
}

export interface FieldValidation {
  type: keyof typeof ValidationTypes
  params?: any[]
  customMessage?: string
}

interface InputCraftProps {
  label: string
  placeholder: string
  maxCharacters?: number
  inputType: keyof typeof InputTypes
  validations?: FieldValidation[]
  errorMessage?: string
}

export function InputCraft({
  label,
  inputType,
  placeholder,
  maxCharacters,
  validations,
  ...props
}: InputCraftProps) {
  const {
    connectors: { connect, drag },
    selected,
    id,
  } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
  }))

  const { selected: selectedCurrentComponent } = useCurrentCraftComponent()

  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    validate(e.target.value)
  }

  const validate = (inputValue: string) => {
    let schema: any = ValidationTypes.STRING

    if (inputType === 'Email') {
      schema = ValidationTypes.EMAIL
    } else if (inputType === 'Phone') {
      schema = ValidationTypes.PHONE
    }

    if (validations) {
      validations.forEach((validation: any) => {
        if (validation.type === 'REQUIRED') {
          schema = schema.and(
            ValidationTypes.REQUIRED(validation.customMessage),
          )
        }
        if (validation.type === 'MIN_LENGTH') {
          schema = schema.and(ValidationTypes.MIN_LENGTH(validation.params[0]))
        }
        if (validation.type === 'MAX_LENGTH') {
          schema = schema.and(ValidationTypes.MAX_LENGTH(validation.params[0]))
        }
      })
    }

    try {
      schema.parse(inputValue)
      setError('')
    } catch (e: any) {
      setError(e.errors[0].message)
    }
  }

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

      {inputType === 'Phone' ? (
        <InputMask mask="(99) 99999-9999" value={value} onChange={handleChange}>
          {(inputProps: any) => (
            <Input
              {...inputProps}
              type="text"
              maxLength={maxCharacters}
              placeholder={placeholder}
              className="h-12 bg-zinc-900 outline-none transition-all focus-visible:ring-violet-500"
            />
          )}
        </InputMask>
      ) : (
        <Input
          type={inputType === 'Email' ? 'email' : 'text'}
          maxLength={maxCharacters}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className="h-12 bg-zinc-900 outline-none transition-all focus-visible:ring-violet-500"
        />
      )}

      {error && <p className="text-sm text-rose-500">{error}</p>}
    </div>
  )
}

const CombinedSettings = () => {
  const {
    actions: { setProp },
    label,
    inputType,
    placeholder,
    errorMessage,
    maxCharacters,
  } = useNode((node) => ({
    label: node.data.props.label,
    inputType: node.data.props.inputType,
    placeholder: node.data.props.placeholder,
    errorMessage: node.data.props.errorMessage,
    maxCharacters: node.data.props.maxCharacters,
    validations: node.data.props.validations || [],
  }))

  const [maxLength, setMaxLength] = useState<number | ''>(maxCharacters || '')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value)
    if (value > 500) {
      value = 500
      toast.info('Este campo permite um valor máximo de 500 caracteres')
    }
    setMaxLength(value || '')

    setProp((props: any) => (props.maxCharacters = e.target.value))
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <label>Defina a label</label>
        <Input
          type="text"
          placeholder={'Digite o titulo do campo'}
          value={label}
          onChange={(e) =>
            setProp((props: any) => (props.label = e.target.value))
          }
          className="h-12 bg-zinc-900 outline-none transition-all focus-visible:ring-violet-500"
        />
      </div>
      <div className="space-y-1">
        <label>Defina o placeholder</label>
        <Input
          type="text"
          placeholder={'Digite um placeholder'}
          value={placeholder}
          onChange={(e) =>
            setProp((props: any) => (props.placeholder = e.target.value))
          }
          className="h-12 bg-zinc-900 outline-none transition-all focus-visible:ring-violet-500"
        />
      </div>

      <div className="space-y-1">
        <label className="mb-2 block">Tipo de Validação</label>
        <Select
          value={inputType || ''}
          onValueChange={(value) =>
            setProp((props: any) => {
              props.inputType = value
            })
          }
        >
          <SelectTrigger className="h-12 bg-zinc-900 outline-none transition-all focus-visible:ring-violet-500">
            <SelectValue placeholder="Selecione uma opção" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(InputTypes).map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <label>Qual o máximo de caracteres?</label>
        <Input
          type="number"
          placeholder="Digite o máximo de caracteres"
          value={maxLength}
          onChange={handleChange}
          className="h-12 bg-zinc-900 outline-none transition-all focus-visible:ring-violet-500"
        />
      </div>

      <div>
        <label className="mb-2 block">Mensagem personalizada (opcional)</label>
        <Input
          type="text"
          value={errorMessage}
          onChange={(e) =>
            setProp((props: any) => (props.errorMessage = e.target.value))
          }
          placeholder="Mensagem de erro personalizada"
          className="h-12 bg-zinc-900 outline-none transition-all focus-visible:ring-violet-500"
        />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox id="required" />
        <label
          htmlFor="required"
          className="cursor-pointer text-sm font-medium leading-none transition-all hover:brightness-75 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Este campo é obrigatório?
        </label>
      </div>
    </div>
  )
}

export const InputMallDefaultProps = {
  fontSize: 16,
}

InputCraft.craft = {
  props: InputMallDefaultProps,
  related: {
    settings: CombinedSettings,
  },
}

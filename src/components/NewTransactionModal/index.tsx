import * as Dialog from '@radix-ui/react-dialog'
import {
  CloseButton,
  Content,
  Overlay,
  TransactionTypeButton,
  TransactionType,
} from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { useForm, Controller } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionContext } from '../../context/transaction'
import { useContextSelector } from 'use-context-selector'

const createNewTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type CreateNewTransactionInputs = z.infer<typeof createNewTransactionFormSchema>

export const NewTransactionModal = () => {
  const createNewTransaction = useContextSelector(
    TransactionContext,
    (context) => context.createNewTransaction,
  )

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateNewTransactionInputs>({
    resolver: zodResolver(createNewTransactionFormSchema),
    defaultValues: {
      type: 'income',
    },
  })

  const handleNewTransactionFormSubmit = async (
    data: CreateNewTransactionInputs,
  ) => {
    const { category, description, price, type } = data

    await createNewTransaction({
      category,
      description,
      price,
      type,
    })

    reset()
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleNewTransactionFormSubmit)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register('price', { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />

          <Controller
            control={control}
            name="type"
            render={(props) => {
              return (
                <TransactionType
                  onValueChange={props.field.onChange}
                  value={props.field.value}
                >
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>
                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}

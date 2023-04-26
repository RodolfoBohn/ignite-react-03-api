import { SearchFormContainer } from './styles'
import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionContext } from '../../../../context/transaction'
import { useContextSelector } from 'use-context-selector'

/**
 *
 * Por que o componente renderiza?
 * 1: Mudança de hooks (estado, contexto, reducer)
 * 2: Props changed (propriedade mudou)
 * 3: Parent rerendered (renderização do componente pai)
 *
 *
 * Qual o fluxo de renderização?
 * 1: O React recria o HTML da interface daquele componente
 * 2: Compara a versão do HTML recriada com a versão anterior
 * 3: SE necessário, reescreve o HTML na tela
 *
 * Memo:
 * 0: Hooks changed, Props changed (deep comparison)
 * 0.1: Comparar a versão anterior dos hooks e props
 * 0.2: SE mudou algo, vai permitir nova renderização
 *
 */

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export const SearchForm = () => {
  const fetchTransactions = useContextSelector(
    TransactionContext,
    (context) => {
      return context.fetchTransactions
    },
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  const handleSearchFormSubmit = async (data: SearchFormInputs) => {
    await fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchFormSubmit)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}

import { Header } from '../../components/header'
import { Summary } from '../../components/summary'
import { SearchForm } from './components/SearchForm'
import {
  PriceHighlight,
  TransitionsContainer,
  TransitionsTable,
} from './styles'
import { TransactionContext } from '../../context/transaction'
import { useContextSelector } from 'use-context-selector'
import { dateFormatted, priceFormatted } from '../../utils/formatter'

export const Transition = () => {
  const transactions = useContextSelector(TransactionContext, (context) => {
    return context.transactions
  })

  return (
    <div>
      <Header />
      <Summary />
      <TransitionsContainer>
        <SearchForm />
        <TransitionsTable>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td width="50%">{transaction.description}</td>
                <td>
                  <PriceHighlight variant={transaction.type}>
                    {transaction.type === 'outcome' && '- '}
                    {priceFormatted.format(transaction.price)}
                  </PriceHighlight>
                </td>
                <td>{transaction.category}</td>
                <td>{dateFormatted.format(new Date(transaction.createdAt))}</td>
              </tr>
            ))}
          </tbody>
        </TransitionsTable>
      </TransitionsContainer>
    </div>
  )
}

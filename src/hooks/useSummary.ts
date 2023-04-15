import { useTransactionContext } from '../context/transaction'

export const useSummary = () => {
  const { transactions } = useTransactionContext()
  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.total += transaction.price
        acc.income += transaction.price
      } else {
        acc.total -= transaction.price
        acc.outcome += transaction.price
      }
      return acc
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    },
  )

  return summary
}

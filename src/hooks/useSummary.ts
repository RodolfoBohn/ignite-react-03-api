import { useMemo } from 'react'
import { TransactionContext } from '../context/transaction'
import { useContextSelector } from 'use-context-selector'

export const useSummary = () => {
  const transactions = useContextSelector(
    TransactionContext,
    (context) => context.transactions,
  )

  const summary = useMemo(() => {
    return transactions.reduce(
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
  }, [transactions])

  return summary
}

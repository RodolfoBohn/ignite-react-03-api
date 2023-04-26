import React, { useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

interface TransactionProps {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}

interface CreateNewTransactionProps {
  description: string
  category: string
  price: number
  type: 'income' | 'outcome'
}

interface TransactionContextProps {
  transactions: TransactionProps[]
  fetchTransactions: (query?: string) => Promise<void>
  createNewTransaction: (data: CreateNewTransactionProps) => Promise<void>
}

interface TransactionProviderProps {
  children: React.ReactNode
}

export const TransactionContext = createContext({} as TransactionContextProps)

export const TransactionProvider = ({ children }: TransactionProviderProps) => {
  const [transactions, setTransactions] = useState<TransactionProps[]>([])

  const fetchTransactions = useCallback(async (query?: string) => {
    // EXEMPLO COM USO DA FETCH API
    // const url = new URL('http://localhost:3333/transactions')

    // if(query) {
    //   url.searchParams.append('q', query)
    // }
    // const response = await fetch(url)
    // const data = await response.json()
    // setTransactions(data)

    const response = await api.get('transactions', {
      params: {
        q: query,
        _sort: 'createdAt',
        _order: 'desc',
      },
    })

    setTransactions(response.data)
  }, [])

  const createNewTransaction = useCallback(
    async (data: CreateNewTransactionProps) => {
      const response = await api.post('transactions', {
        ...data,
        createdAt: new Date(),
      })

      const newTransaction = response.data
      setTransactions((state) => [newTransaction, ...state])
    },
    [],
  )

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createNewTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

// export const useTransactionContext = () => useContext(TransactionContext)

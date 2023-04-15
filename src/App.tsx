import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { Transition } from './pages/Transition'
import { TransactionProvider } from './context/transaction'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <TransactionProvider>
        <Transition />
      </TransactionProvider>
    </ThemeProvider>
  )
}

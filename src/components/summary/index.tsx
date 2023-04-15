import { useSummary } from '../../hooks/useSummary'
import { priceFormatted } from '../../utils/formatter'
import { SummaryCard, SummaryContainer } from './styles'
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'

export const Summary = () => {
  const summary = useSummary()

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          Entradas
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>
        <strong>{priceFormatted.format(summary.income)}</strong>
      </SummaryCard>
      <SummaryCard>
        <header>
          Saídas
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>
        <strong>{priceFormatted.format(summary.outcome)}</strong>
      </SummaryCard>
      <SummaryCard variant="green">
        <header>
          Total
          <CurrencyDollar size={32} color="#fff" />
        </header>
        <strong>{priceFormatted.format(summary.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}

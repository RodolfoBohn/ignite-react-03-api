import { SummaryCard, SummaryContainer } from "./styles"
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";

export const Summary = () => {
  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          Entradas
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>
        <strong>R$ 17.400,00</strong>
      </SummaryCard>
      <SummaryCard>
      <header>
          Saídas
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>
        <strong>R$ 17.400,00</strong>
      </SummaryCard>
      <SummaryCard variant="green">
      <header>
          Total
          <CurrencyDollar size={32} color="#fff" />
        </header>
        <strong>R$ 17.400,00</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}
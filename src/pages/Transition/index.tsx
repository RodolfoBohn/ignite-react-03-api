import { Header } from "../../components/header"
import { Summary } from "../../components/summary"
import { SearchForm } from "./components/SearchForm"
import { PriceHighlight, TransitionsContainer, TransitionsTable } from "./styles"

export const Transition = () => {
  return (
    <div>
      <Header />
      <Summary />
      <TransitionsContainer>
        <SearchForm />
        <TransitionsTable>
          <tbody>

          <tr>
            <td width='50%'>Desenvolvimento de site</td>
            <td>
              <PriceHighlight variant="income">
              R$ 12.000,00
              </PriceHighlight>
              </td>
            <td>Venda</td>
            <td>13/03/2023</td>
          </tr>
          <tr>
            <td width='50%'>Hamburguer</td>
            <td>
              <PriceHighlight variant="outcome">
                -R$ 59,00
              </PriceHighlight>
            </td>
            <td>Alimentação</td>
            <td>13/03/2023</td>
          </tr>
          </tbody>
        </TransitionsTable>
      </TransitionsContainer>
    </div>
  )
}
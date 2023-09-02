import { ReactElement } from 'react'
import { CountryList } from './features/countries'

function App(): ReactElement {
  return (
    <div className="mx-auto p-12">
      <h1>Countries Catalog</h1>
      <CountryList />
    </div>
  )
}

export default App

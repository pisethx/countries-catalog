import { ReactElement } from 'react'
import { CountryCatalog } from './features/countries'

function App(): ReactElement {
  return (
    <div className="grid grid-cols-1 py-8 px-0 lg:px-8 2xl:px-12 mx-4 sm:mx-8 lg:mx-24 2xl:mx-48">
      <h1 className="text-2xl font-bold uppercase text-center">
        Countries Catalog
      </h1>
      <CountryCatalog />
    </div>
  )
}

export default App

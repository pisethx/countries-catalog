import { ReactElement, useEffect, useState } from 'react'
import { useGetCountries } from '../api'
import CountryCard from './CountryCard'

function CountryList(): ReactElement {
  const [page, setPage] = useState(1)
  const countries = useGetCountries({ page, rowsPerPage: 25, sort: 'ASC' })

  useEffect(() => {
    console.log(countries)
  }, [countries])
  return (
    <div className="grid grid-cols-5 gap-6">
      {countries.map((country) => (
        <CountryCard key={country.name.official} country={country} />
      ))}
    </div>
  )
}

export default CountryList

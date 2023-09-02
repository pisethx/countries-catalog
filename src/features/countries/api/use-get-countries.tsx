import { useState, useEffect, useMemo } from 'react'
import { Country } from '../countries.types'
import { fuzzyMatchRegExp } from '../../../utils'
import { Pagination } from '../../../types'

function useGetCountries(pagination: Pagination) {
  const { search, page, sort } = pagination

  const [loading, setLoading] = useState(false)
  const [countries, setCountries] = useState<Array<Country>>([])

  const fetchCountries = async () => {
    setLoading(true)
    await fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((res) => setCountries(res))
      .catch((e) => alert(e))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchCountries()
  }, [])

  const filteredCountries = useMemo(() => {
    let results: Array<Country> = []
    if (search === '') {
      results = countries
    } else {
      results = countries.filter((country) =>
        fuzzyMatchRegExp(search, country.name.official)
      )
    }

    results = results.sort(
      (a, b) =>
        (sort === 'ASC' ? 1 : -1) *
        a.name.official.localeCompare(b.name.official)
    )

    return results
  }, [countries, search, page, sort])

  return { loading, data: filteredCountries }
}

export default useGetCountries

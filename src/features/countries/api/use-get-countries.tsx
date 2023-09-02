import { useState, useEffect, useMemo } from 'react'
import { Country } from '../countries.types'
import { Pagination, SortDirection } from '../../../types'
import fuzzysort from 'fuzzysort'

const COUNTRIES_API_URL = 'https://restcountries.com/v3.1/all' as const

function useGetCountries(pagination: Pagination) {
  const { search, page, sort } = pagination

  const [loading, setLoading] = useState(false)
  const [countries, setCountries] = useState<Array<Country>>([])

  const fetchCountries = async () => {
    setLoading(true)
    await fetch(COUNTRIES_API_URL)
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
      results = fuzzysort
        .go(search, countries, { key: 'name.official' })
        .map((result) => result.obj)
    }

    if (sort !== SortDirection.DEFAULT)
      results = results
        .slice()
        .sort(
          (a, b) =>
            (sort === SortDirection.ASCENDING ? 1 : -1) *
            a.name.official.localeCompare(b.name.official)
        )

    return results
  }, [countries, search, page, sort])

  return { loading, data: filteredCountries }
}

export default useGetCountries

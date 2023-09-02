import { useState, useEffect } from 'react'
import { Country } from '../countries.types'

interface Pagination {
  page: number
  rowsPerPage: number
  sort: 'ASC' | 'DESC'
}

function useGetCountries(pagination: Pagination) {
  const [countries, setCountries] = useState<Array<Country>>([])

  const fetchCountries = async () => {
    return fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((res) => setCountries(res))
      .catch((e) => alert(e))
  }

  useEffect(() => {
    fetchCountries()
  }, [])

  return countries
}

export default useGetCountries

import { ReactElement, useMemo, useState } from 'react'
import { useGetCountries } from '../api'
import CountryCard from './CountryCard'
import { SelectOption, SortDirection } from '../../../types'
import { scrollToTop } from '../../../utils'
import { Country } from '../countries.types'
import CountryDialog from './CountryDialog'
import PaginationButtons from './PaginationButtons'
import { SearchInput, SelectInput, Spinner } from '../../../components'
import CountryList from './CountryList'

const sortDirections = [
  { label: 'Default', value: SortDirection.DEFAULT },
  { label: 'Ascending', value: SortDirection.ASCENDING },
  { label: 'Descending', value: SortDirection.DESCENDING }
]

function CountryCatalog(): ReactElement {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortDirection>(SortDirection.DEFAULT)

  const [displayedCountry, setDisplayedCountry] = useState<Country | null>(null)

  const {
    loading,
    data: countries,
    totalPages
  } = useGetCountries({ page, search, sort })

  return (
    <div className="grid grid-cols-1">
      <div className="flex w-full my-6">
        {/* Sort */}
        <SelectInput
          className="select select-bordered w-[200px]"
          options={sortDirections as Array<SelectOption>}
          onChange={(e) => {
            setPage(1)
            setSort(e.target.value as SortDirection)
          }}
        />

        {/* Search */}
        <SearchInput
          className="input input-bordered w-full"
          onChange={(e) => {
            setPage(1)
            setSearch(e.target.value)
          }}
        />
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <>
          {/* Country List */}
          <CountryList>
            {countries.map((country) => (
              <CountryCard
                key={country.name.official}
                country={country}
                onClick={() => {
                  ;(window as any).displayedCountry.showModal()
                  setDisplayedCountry(country)
                }}
              />
            ))}
          </CountryList>

          {/* Dialog */}
          <CountryDialog country={displayedCountry} />

          {/* Pagination */}
          <PaginationButtons
            page={page}
            totalPages={totalPages}
            onChange={(newPage) => {
              setPage(newPage)
              scrollToTop()
            }}
          />
        </>
      )}
    </div>
  )
}

export default CountryCatalog

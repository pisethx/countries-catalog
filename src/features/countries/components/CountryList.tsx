import { ReactElement, useMemo, useState } from 'react'
import { useGetCountries } from '../api'
import CountryCard from './CountryCard'
import { SortDirection } from '../../../types'
import { scrollToTop } from '../../../utils'

const sortDirections = [
  { label: 'Ascending', value: SortDirection.ASCENDING },
  { label: 'Descending', value: SortDirection.DESCENDING }
] as const

const rowsPerPage = 25 as const

function CountryList(): ReactElement {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.ASCENDING
  )
  const { loading, data: countries } = useGetCountries({
    search,
    page,
    sort: sortDirection
  })

  const paginatedCountries = useMemo(
    () => countries.slice((page - 1) * rowsPerPage, page * rowsPerPage),
    [countries, search, sortDirection, page]
  )

  const pageButtons = useMemo(
    () =>
      new Array(Math.ceil(countries.length / rowsPerPage))
        .fill(null)
        .map((_, index) => index + 1),
    [countries.length]
  )

  return (
    <div className="grid grid-cols-1">
      <div className="flex w-full my-6">
        <select
          className="select select-bordered w-[200px]"
          onChange={(e) => {
            setPage(1)
            setSortDirection(e.target.value as SortDirection)
          }}
        >
          {sortDirections.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-full"
          onChange={(e) => {
            setPage(1)
            setSearch(e.target.value)
          }}
        />
      </div>
      {loading ? (
        <div className="mx-auto">
          <span className="loading loading-dots loading-lg text-primary"></span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
            {paginatedCountries.map((country) => (
              <CountryCard key={country.name.official} country={country} />
            ))}
          </div>
          <div className="join mx-auto mt-12">
            {pageButtons.map((pageButton) => (
              <button
                key={pageButton}
                className={`join-item btn ${
                  pageButton === page ? 'btn-active' : ''
                }`}
                onClick={() => {
                  setPage(pageButton)
                  scrollToTop()
                }}
              >
                {pageButton}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default CountryList

import { ReactElement, useMemo, useState } from 'react'
import { useGetCountries } from '../api'
import CountryCard from './CountryCard'
import { SortDirection } from '../../../types'
import { scrollToTop } from '../../../utils'
import { Country } from '../countries.types'

const sortDirections = [
  { label: 'Default', value: SortDirection.DEFAULT },
  { label: 'Ascending', value: SortDirection.ASCENDING },
  { label: 'Descending', value: SortDirection.DESCENDING }
] as const

const rowsPerPage = 25 as const

function CountryList(): ReactElement {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.DEFAULT
  )

  const [displayedCountry, setDisplayedCountry] = useState<Country | null>(null)

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

  const displayedCountryStats = useMemo(() => {
    if (displayedCountry == null) return []
    return [
      {
        label: 'Common Name',
        value: displayedCountry.name.common
      },
      {
        label: 'Flag',
        value: displayedCountry.flag
      },
      {
        label: 'Currencies',
        value: Object.keys(displayedCountry.currencies ?? {}).join(', ')
      },
      {
        label: 'Languages',
        value: Object.values(displayedCountry.languages ?? {}).join(', ')
      },
      {
        label: 'Continents',
        value: (displayedCountry.continents ?? []).join(', ')
      },
      {
        label: 'Region',
        value: displayedCountry.region
      },
      {
        label: 'Sub Region',
        value: displayedCountry.subregion
      },
      {
        label: 'Capital',
        value: (displayedCountry.capital ?? []).join('. ')
      },
      {
        label: 'Area',
        value: displayedCountry.area + 'm2'
      },
      {
        label: 'Population',
        value: displayedCountry.population?.toString()
      },
      {
        label: 'Timezones',
        value: (displayedCountry.timezones ?? []).join(', ')
      }
    ]
  }, [displayedCountry])

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
              <CountryCard
                key={country.name.official}
                country={country}
                onClick={() => {
                  ;(window as any).displayedCountry.showModal()
                  setDisplayedCountry(country)
                }}
              />
            ))}
            <dialog id="displayedCountry" className="modal">
              {displayedCountry && (
                <form method="dialog" className="modal-box w-11/12 max-w-5xl">
                  <h3 className="font-bold text-2xl">
                    {displayedCountry.name.official}
                  </h3>

                  {displayedCountryStats.map(({ label, value }) => (
                    <div key={label} className="stats shadow my-4">
                      <div className="stat">
                        <div className="stat-title text-gray-400">{label}</div>
                        <div className="font-bold">
                          {value == null || value.length === 0 ? '-' : value}
                        </div>
                      </div>
                    </div>
                  ))}
                </form>
              )}
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
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

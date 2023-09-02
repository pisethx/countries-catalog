import { ReactElement, useMemo } from 'react'
import { Country } from '../countries.types'

function CountryDialog({ country }: { country: Country | null }): ReactElement {
  const countryStats = useMemo(() => {
    if (country == null) return []
    return [
      {
        label: 'Common Name',
        value: country.name.common
      },
      {
        label: 'Flag',
        value: country.flag
      },
      {
        label: 'Currencies',
        value: Object.keys(country.currencies ?? {}).join(', ')
      },
      {
        label: 'Languages',
        value: Object.values(country.languages ?? {}).join(', ')
      },
      {
        label: 'Continents',
        value: (country.continents ?? []).join(', ')
      },
      {
        label: 'Region',
        value: country.region
      },
      {
        label: 'Sub Region',
        value: country.subregion
      },
      {
        label: 'Capital',
        value: (country.capital ?? []).join('. ')
      },
      {
        label: 'Area',
        value: country.area + 'm2'
      },
      {
        label: 'Population',
        value: country.population?.toString()
      },
      {
        label: 'Timezones',
        value: (country.timezones ?? []).join(', ')
      }
    ]
  }, [country])

  return (
    <dialog id="displayedCountry" className="modal">
      {country && (
        <form method="dialog" className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-2xl">{country.name.official}</h3>

          {countryStats.map(({ label, value }) => (
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
  )
}

export default CountryDialog

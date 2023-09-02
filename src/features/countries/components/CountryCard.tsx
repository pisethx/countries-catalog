import { ReactElement } from 'react'
import { Country, Idd, Name } from '../countries.types'

interface CountryCardProps {
  country: Country
  onClick: () => void
}

function CountryCard({ country, onClick }: CountryCardProps): ReactElement {
  const formatNativeName = (nativeName?: Name['nativeName']) => {
    if (nativeName == null) return '-'

    return Object.values(nativeName)
      .map((name) => name.official)
      .join(', ')
  }
  const formatCallingCodes = (idd: Idd) => {
    if (idd.suffixes == null || idd.suffixes.length === 0) return '-'

    const nDisplayedCallingCodes = 5

    return (
      idd.suffixes
        .slice(0, nDisplayedCallingCodes)
        .map((suffix) => idd.root + suffix)
        .join(' ') +
      (idd.suffixes.length > nDisplayedCallingCodes
        ? ` (and ${idd.suffixes.length - nDisplayedCallingCodes} more)`
        : '')
    )
  }
  return (
    <div
      className="card card-compact bg-base-100 shadow-lg cursor-pointer transition hover:-translate-y-2"
      onClick={onClick}
    >
      <figure>
        <div className="aspect-[16/9] h-full w-full bg-gray-200">
          <img
            className="object-cover h-full w-full"
            src={country.flags.png}
            alt={country.flags.alt ?? country.name.official}
          />
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title text-gray-700">{country.name.official}</h2>

        <ol className="text-xs text-gray-600">
          {[
            { label: 'CCA2', value: country.cca2 },
            { label: 'CCA3', value: country.cca3 },
            {
              label: 'Native name',
              value: formatNativeName(country.name.nativeName)
            },
            { label: 'Calling codes', value: formatCallingCodes(country.idd) }
          ].map(({ label, value }) => (
            <li key={label} className="mb-1">
              <span className="font-medium">{label}: </span>
              {value}
            </li>
          ))}
          <li className="mt-2 text-gray-500 italic">
            Alt Spellings: {country.altSpellings.join(', ')}
          </li>
        </ol>
      </div>
    </div>
  )
}

export default CountryCard

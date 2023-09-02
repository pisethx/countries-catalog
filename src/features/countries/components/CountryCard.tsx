import { ReactElement } from 'react'
import { Country, Idd, Name } from '../countries.types'

function CountryCard({ country }: { country: Country }): ReactElement {
  const formatNativeName = (nativeName?: Name['nativeName']) => {
    if (nativeName == null) return '-'

    return Object.values(nativeName)
      .map((name) => name.official)
      .join(', ')
  }
  const formatCallingCodes = (idd: Idd) => {
    return idd.suffixes
      ? idd.suffixes.map((suffix) => idd.root + suffix).join(' ')
      : idd.root
  }
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
      <img
        className="rounded-t-lg aspect-[16/9] w-full object-cover"
        src={country.flags.png}
        alt=""
      />

      <div className="p-3">
        <span className="text-base font-bold tracking-tight text-gray-900 ">
          {country.name.official}
        </span>

        <ol className="text-xs text-gray-600 my-2">
          {[
            { label: 'CCA2', value: country.cca2 },
            { label: 'CCA3', value: country.cca3 },
            {
              label: 'NativeName',
              value: formatNativeName(country.name.nativeName)
            },
            { label: 'CallingCode', value: formatCallingCodes(country.idd) }
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

import { ReactElement } from 'react'

function CountryList({
  children
}: {
  children: ReactElement | ReactElement[]
}): ReactElement {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
      {children}
    </div>
  )
}

export default CountryList

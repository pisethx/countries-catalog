import { ReactElement } from 'react'

function Spinner(): ReactElement {
  return (
    <div className="mx-auto">
      <span className="loading loading-dots loading-lg text-primary"></span>
    </div>
  )
}

export default Spinner

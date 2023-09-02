import { ReactElement, useMemo } from 'react'

interface PaginationButtonsProps {
  page: number
  totalPages: number
  onChange: (newPage: number) => void
}

function PaginationButtons({
  page,
  totalPages,
  onChange
}: PaginationButtonsProps): ReactElement {
  const pageButtons = useMemo(
    () => new Array(totalPages).fill(null).map((_, index) => index + 1),
    [totalPages]
  )

  return (
    <div className="join mx-auto mt-12">
      {pageButtons.map((pageButton) => (
        <button
          key={pageButton}
          className={`join-item btn ${pageButton === page ? 'btn-active' : ''}`}
          onClick={() => {
            onChange(pageButton)
          }}
        >
          {pageButton}
        </button>
      ))}
    </div>
  )
}

export default PaginationButtons

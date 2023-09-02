import { ReactElement } from 'react'

interface SearchInputProps {
  className: string
  placeholder?: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

function SearchInput({
  className,
  placeholder,
  onChange
}: SearchInputProps): ReactElement {
  return (
    <input
      type="text"
      placeholder={placeholder ?? 'Search...'}
      className={className}
      onChange={onChange}
    />
  )
}

export default SearchInput

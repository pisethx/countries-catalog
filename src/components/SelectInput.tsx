import { ReactElement } from 'react'
import { SelectOption } from '../types'

interface SelectInputProps {
  className: string
  options: Array<SelectOption>
  onChange: React.ChangeEventHandler<HTMLSelectElement>
}

function SelectInput({
  className,
  options,
  onChange
}: SelectInputProps): ReactElement {
  return (
    <select className={className} onChange={onChange}>
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  )
}

export default SelectInput

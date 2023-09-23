import { Button } from '@/components/ui/button'

const OptionButton = ({
  option,
  onClick,
  isSelected = false,
  isDisabled = false,
}: {
  option: string
  onClick: () => void
  isSelected?: boolean
  isDisabled?: boolean
}) => {
  return (
    <Button
      disabled={isDisabled}
      variant={isSelected ? 'accent' : 'outline'}
      onClick={() => onClick()}
    >
      {option}
    </Button>
  )
}

export const OptionButtons = ({
  options,
  onSelect,
  selectedOption,
  isDisabled = false,
}: {
  options: string[]
  onSelect: (option: string) => void
  selectedOption?: string
  isDisabled?: boolean
}) => {
  return (
    <div className="flex flex-col gap-2">
      {options.map((option) => (
        <OptionButton
          key={option}
          option={option}
          onClick={() => onSelect(option)}
          isSelected={option === selectedOption}
          isDisabled={isDisabled}
        />
      ))}
    </div>
  )
}

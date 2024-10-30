import { useState } from 'react'

import { CharStatus } from '../../lib/pianosStatuses'

import { getStoredIsHighContrastMode } from '../../lib/localStorage'

type Props = {
  value: string
  status?: CharStatus
  onClick: (value: string) => void
  isBlack: boolean
  displayedValue: string
}

export const PianoKey = ({
  status,
  value,
  onClick,
  isBlack,
  displayedValue,
}: Props) => {
  const [clicked, setClicked] = useState(false)

  const isHighContrast = getStoredIsHighContrastMode()


  const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (status !== 'absent') {
      onClick(value)
      setClicked(true)
      setTimeout(() => setClicked(false), 300) // Reset animation after 300ms
    }
  }

  const whiteKeyWidth = 'w-16'
  const whiteKeyHeight = 'h-60'
  const blackKeyShift = '-translate-x-1/2'
  const blackKeyWidth = 'w-8'
  const blackKeyHeight = 'h-40'

  const whiteKeyClasses = `bg-white border border-black rounded ${whiteKeyWidth} ${whiteKeyHeight} cursor-pointer`
  const whiteKeyAbsentClasses = `bg-custom-absent dark:bg-custom-absent border border-black rounded ${whiteKeyWidth} ${whiteKeyHeight} cursor-pointer`
  const whiteKeypresentClasses = `bg-custom-present dark:bg-custom-present border border-black rounded ${whiteKeyWidth} ${whiteKeyHeight} cursor-pointer`
  const whiteKeyCorrectClasses = `bg-custom-correct dark:bg-custom-correct border border-black rounded ${whiteKeyWidth} ${whiteKeyHeight} cursor-pointer`

  const blackKeyClasses = `bg-custom-black border border-black rounded ${blackKeyWidth} ${blackKeyHeight} absolute left-1/2 ${blackKeyShift} z-20 cursor-pointer`
  const blackKeyAbsentClasses = `bg-custom-absent dark:bg-custom-absent border border-black rounded ${blackKeyWidth} ${blackKeyHeight} absolute left-1/2 ${blackKeyShift} z-20 cursor-pointer`
  const blackKeyPresentClasses = `bg-custom-present dark:bg-custom-present border border-black rounded ${blackKeyWidth} ${blackKeyHeight} absolute left-1/2 ${blackKeyShift} z-20 cursor-pointer`
  const blackKeyCorrectClasses = `bg-custom-correct dark:bg-custom-corrects border border-black rounded ${blackKeyWidth} ${blackKeyHeight} absolute left-1/2 ${blackKeyShift} z-20 cursor-pointer`

  const highContrastCorrectClass = 'bg-orange-500';
  const highContrastPresentClass = 'bg-cyan-500';
  
  const classKeySelect = (isBlack && status === 'absent')
  ? blackKeyAbsentClasses
  : (!isBlack && status === 'absent')
  ? whiteKeyAbsentClasses
  : isHighContrast
    ? status === 'correct'
      ? `${isBlack ? blackKeyClasses : whiteKeyClasses} ${highContrastCorrectClass}`
      : status === 'present'
      ? `${isBlack ? blackKeyClasses : whiteKeyClasses} ${highContrastPresentClass}`
      : isBlack
      ? blackKeyClasses
      : whiteKeyClasses
    : isBlack && status === 'present'
    ? blackKeyPresentClasses
    : !isBlack && status === 'present'
    ? whiteKeypresentClasses
    : isBlack && status === 'correct'
    ? blackKeyCorrectClasses
    : !isBlack && status === 'correct'
    ? whiteKeyCorrectClasses
    : isBlack
    ? blackKeyClasses
    : whiteKeyClasses;

  

  const whiteKeyTextClasses =
    'absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-center font-medium text-black'
  const blackKeyTextClasses =
    'absolute top-6 left-1/2 transform -translate-x-1/2 text-xs text-center font-medium text-white z-20 rotate-90 whitespace-nowrap'

  return (
    <div
      className={`relative ${
        isBlack ? 'h-0 w-0' : whiteKeyWidth
      } ${whiteKeyHeight}`}
    >
      <div
        className={`${classKeySelect} ${
          clicked ? 'animate-pulse' : '' // Apply animation when clicked
        }`}
        onClick={handleClick}
      />
      <span className={isBlack ? blackKeyTextClasses : whiteKeyTextClasses}>
        {displayedValue}
      </span>
    </div>
  )
}

export default PianoKey

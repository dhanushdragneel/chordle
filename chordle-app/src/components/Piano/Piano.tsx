import { useEffect } from 'react'

import { ParsedChord, keys } from '../../lib/chords'


import { getStatuses } from '../../lib/pianosStatuses'
import PianoKey from './PianoKey'

// Ensure this is correctly imported

type Props = {
  onChar: (value: string) => void
  onEnter: () => void
  solution: ParsedChord
  guesses: string[]
}

export const Piano = ({ onChar, onEnter, solution, guesses }: Props) => {
  const charStatuses = getStatuses(solution, guesses)
  const DisplayKeys = [
    'C',
    'C#/Db',
    'D',
    'D#/Eb',
    'E',
    'F',
    'F#/Gb',
    'G',
    'G#/Ab',
    'A',
    'A#/Bb',
    'B',
  ]

  const onClick = (value: string) => {
    onChar(value)
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter()
      }
      // Add support for keyboard keys corresponding to piano keys if needed
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter])

  return (
    <div className="flex items-center justify-center py-10">
      <div className="relative flex">
        {' '}
        {/* This will be your piano keys container */}
        {keys.map((key, index) => (
          <PianoKey
            key={index}
            value={key}
            displayedValue={DisplayKeys[index]}
            onClick={() => onClick(key)}
            status={charStatuses[key]}
            isBlack={key.includes('#')}
          />
        ))}
      </div>
    </div>
  )
}

export default Piano

import { ParsedChord, keys_to_flatkeys } from '../../lib/chords'
import { splitGuessIntoNotes } from '../../lib/pianosStatuses'
import { Cell } from './Cell'

type Props = {
  guess: string
  className: string
  solution: ParsedChord
}

export const CurrentRow = ({ guess, className, solution}: Props) => {
  const splitGuess = splitGuessIntoNotes(guess)
  const emptyCells = Array.from(Array(solution.notes.length - splitGuess.length))
  const classes = `flex justify-center mb-1 ${className}`

  return (
    <div className={classes}>
      {splitGuess.map((note, i) => (
        <Cell key={i} value={solution.displayedNotes.includes(keys_to_flatkeys[note]) ? keys_to_flatkeys[note] : note} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}

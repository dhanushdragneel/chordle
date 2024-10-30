import { ParsedChord, keys_to_flatkeys} from '../../lib/chords'
import { getGuessStatuses } from '../../lib/pianosStatuses'
import { splitGuessIntoNotes } from '../../lib/pianosStatuses'
import { Cell } from './Cell'

type Props = {
  solution: ParsedChord
  guess: string
  isRevealing?: boolean
}

export const CompletedRow = ({ solution, guess, isRevealing }: Props) => {
  const statuses = getGuessStatuses(solution, guess)
  const splitGuess = splitGuessIntoNotes(guess)

  return (
    <div className="mb-1 flex justify-center">  
      {splitGuess.map((note, i) => (
        <Cell
          key={i}
          value={solution.displayedNotes.includes(keys_to_flatkeys[note]) ? keys_to_flatkeys[note] : note}
          status={statuses[i]}
          position={i}
          isRevealing={isRevealing}
          isCompleted
        />
      ))}
    </div>
  )
}

import { ParsedChord } from '@/lib/chords';
import { Cell } from './Cell'

type Props = {
  solution: ParsedChord;
}

export const EmptyRow = ({ solution }: Props) => {
  const emptyCells = Array.from(Array(solution.notes.length))

  return (
    <div className="mb-1 flex justify-center">
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}

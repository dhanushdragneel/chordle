import {ParsedChord} from './chords';

export type CharStatus = 'absent' | 'present' | 'correct'


export const splitGuessIntoNotes = (note: string): string[] => {
    // Match all notes including sharps (e.g., "C#", "D#", etc.)
    return note.match(/C#|D#|F#|G#|A#|C|D|E|F|G|A|B/g) || [];
  };
  

export const getStatuses = (
    solution: ParsedChord,
    guesses: string[]
  ): { [key: string]: CharStatus } => {
    const charObj: { [key: string]: CharStatus } = {};
  
    guesses.forEach((guess) => {
      // Split the guess into individual notes if necessary
      // For example, if guess is "C#GF#", you need to split it into ['C#', 'G', 'F#']
      const splitGuess = splitGuessIntoNotes(guess);
      const solutionArray = solution.notes
  
      splitGuess.forEach((note: string, i: number) => {
        // If a note is 'correct' in any guess, it should retain that status
        if (!solutionArray.includes(note)) {
            return (charObj[note] = 'absent');
        }
        if (note === solutionArray[i]) {            
            return (charObj[note] = 'correct');
        }
        if (charObj[note]!== 'correct') {
          // Mark as 'absent' if not already marked
            return (charObj[note] = 'present');
        }
      })
    })

    return charObj;
  }
  

  export const getGuessStatuses = (
    solution: ParsedChord,
    guess: string
  ): CharStatus[] => {
    const solutionNotesTaken = new Array(solution.notes.length).fill(false);
    const splitGuess = splitGuessIntoNotes(guess);
    const statuses: CharStatus[] = new Array(splitGuess.length);
    const solutionArray = solution.notes; 
    
    // First: mark all correct notes first
    splitGuess.forEach((note, index) => {
      if (note === solutionArray[index]) {
        statuses[index] = 'correct';
        solutionNotesTaken[index] = true;
        return
      }
    })
  
    splitGuess.forEach((note, index) => {
        if (statuses[index]) return

        if (!solutionArray.includes(note)) {
            statuses[index] = 'absent'
            return
        }

        const presentNoteIndex = solutionArray.findIndex(
            (x,index) => x === note && !solutionNotesTaken[index]
        )

        if (presentNoteIndex > -1) {
            statuses[index] = 'present'
            solutionNotesTaken[presentNoteIndex] = true
            return
          } else {
            statuses[index] = 'absent'
            return
          }
    })
    
    return statuses;
  }
  
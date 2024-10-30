import {
    addDays,
    differenceInDays,
    formatISO,
    parseISO,
    startOfDay,
  } from 'date-fns'
  import queryString from 'query-string'
  
  import { db } from '../firebaseConfig';
  import { collection, getDocs } from 'firebase/firestore';
  
  import { ENABLE_ARCHIVED_GAMES } from '../constants/settings'
  import { getToday } from './dateutils'

  export interface Note {
    note: string;
    displayedNote: string;
  }

  export interface Notes {
    [key: string]: Note; // This allows for note1, note2, etc.
  }

  export interface Chord {
    name: string;
    notes: Notes;
  }

  export interface ParsedChord {
    name: string;
    notes: string[];
    displayedNotes: string[];
  }
  
  
  export const firstGameDate = new Date(2022, 0)
  export const periodInDays = 1

  export const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  export const keys_to_flatkeys: { [key: string]: string } = {
    'C': 'C',
    'C#': 'Db',
    'D': 'D',
    'D#': 'Eb',
    'E': 'E',
    'F': 'F',
    'F#': 'Gb',
    'G': 'G',
    'G#': 'Ab',
    'A': 'A',
    'A#': 'Bb',
    'B': 'B'
  };
  
  
  export const isWinningChord = (chord: string, solution: string) => {
    return solution.toUpperCase() === chord;
  }
  

  
  export const localeAwareLowerCase = (text: string) => {
    return process.env.REACT_APP_LOCALE_STRING
      ? text.toLocaleLowerCase(process.env.REACT_APP_LOCALE_STRING)
      : text.toLowerCase()
  }
  
  export const localeAwareUpperCase = (text: string) => {
    return process.env.REACT_APP_LOCALE_STRING
      ? text.toLocaleUpperCase(process.env.REACT_APP_LOCALE_STRING)
      : text.toUpperCase()
  }
  
  export const getLastGameDate = (today: Date) => {
    const t = startOfDay(today)
    let daysSinceLastGame = differenceInDays(firstGameDate, t) % periodInDays
    return addDays(t, -daysSinceLastGame)
  }
  
  export const getNextGameDate = (today: Date) => {
    return addDays(getLastGameDate(today), periodInDays)
  }
  
  export const isValidGameDate = (date: Date) => {
    if (date < firstGameDate || date > getToday()) {
      return false
    }
  
    return differenceInDays(firstGameDate, date) % periodInDays === 0
  }
  
  export const getIndex = (gameDate: Date) => {
    let start = firstGameDate
    let index = -1
    do {
      index++
      start = addDays(start, periodInDays)
    } while (start <= gameDate)
  
    return index
  }
  
  
  export const parseChordFromObject = (chordObject: Chord): ParsedChord => {
    // Extract notes and displayedNotes from the chord object
    const notesArray: string[] = Object.values(chordObject.notes).map((noteObj: Note) => noteObj.note);
    const displayedNotesArray: string[] = Object.values(chordObject.notes).map((noteObj: Note) => noteObj.displayedNote);
    
    return {
        name: chordObject.name,
        notes: notesArray,
        displayedNotes: displayedNotesArray
    };
};

  

export const getChordOfDay = async (): Promise<{name: string, notes: string[], displayedNotes: string[]}> => {
    const chordsCollection = collection(db, 'chords');
    const snapshot = await getDocs(chordsCollection);
    const chords: Chord[] = snapshot.docs.map((doc) => doc.data() as Chord);

    const randomChord: Chord = chords[Math.floor(Math.random() * chords.length)];
    const parsedChord = parseChordFromObject(randomChord);
    
    return parsedChord;
};


  export const getSolution = async (gameDate: Date) => {
    const chordOfTheDay = await getChordOfDay();
    const nextGameDate = getNextGameDate(gameDate);
    const index = getIndex(gameDate);
    return {
      solution: chordOfTheDay, // This now contains the chord object
      solutionGameDate: gameDate,
      solutionIndex: index,
      tomorrow: nextGameDate.valueOf(),
    };
  };
  
  
  export const getGameDate = () => {
    if (getIsLatestGame()) {
      return getToday()
    }
  
    const parsed = queryString.parse(window.location.search)
    try {
      const d = startOfDay(parseISO(parsed.d!.toString()))
      if (d >= getToday() || d < firstGameDate) {
        setGameDate(getToday())
      }
      return d
    } catch (e) {
      console.log(e)
      return getToday()
    }
  }
  
  export const setGameDate = (d: Date) => {
    try {
      if (d < getToday()) {
        window.location.href = '/?d=' + formatISO(d, { representation: 'date' })
        return
      }
    } catch (e) {
      console.log(e)
    }
    window.location.href = '/'
  }
  
  export const getIsLatestGame = () => {
    if (!ENABLE_ARCHIVED_GAMES) {
      return true
    }
    const parsed = queryString.parse(window.location.search)
    return parsed === null || !('d' in parsed)
  }
  
import './App.css'

import { ClockIcon } from '@heroicons/react/outline'
import { format } from 'date-fns'
import * as Tone from 'tone';
import { useEffect, useState, useRef } from 'react'
import Div100vh from 'react-div-100vh'

import RotatorButton from './components/RotatorButton/RotatorButton';


import { AlertContainer } from './components/alerts/AlertContainer'
import { Grid } from './components/grid/Grid'
import { DatePickerModal } from './components/modals/DatePickerModal'
import { InfoModal } from './components/modals/InfoModal'
import { MigrateStatsModal } from './components/modals/MigrateStatsModal'
import { SettingsModal } from './components/modals/SettingsModal'
import { StatsModal } from './components/modals/StatsModal'
import { Navbar } from './components/navbar/Navbar'
import {Piano} from './components/Piano/Piano'


import {
  DATE_LOCALE,
  DISCOURAGE_INAPP_BROWSERS,
  LONG_ALERT_TIME_MS,
  MAX_CHALLENGES,
  REVEAL_TIME_MS,
  WELCOME_INFO_MODAL_MS,
} from './constants/settings'
import {
  CORRECT_CHORD_MESSAGE,
  DISCOURAGE_INAPP_BROWSER_TEXT,
  GAME_COPIED_MESSAGE,
  NOT_ENOUGH_NOTES_MESSAGE,
  SHARE_FAILURE_TEXT,
  WIN_MESSAGES,
} from './constants/strings'
import { useAlert } from './context/AlertContext'
import { isInAppBrowser } from './lib/browser'
import {
  getStoredIsHighContrastMode,
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
  setStoredIsHighContrastMode,
} from './lib/localStorage'
import { addStatsForCompletedGame, loadStats } from './lib/stats'

import {
  getSolution,
  getGameDate,
  getIsLatestGame,
  setGameDate,
  isWinningChord
} from './lib/chords'

import { splitGuessIntoNotes } from './lib/pianosStatuses';


function App() {
  const isLatestGame = getIsLatestGame()
  const gameDate = getGameDate()
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches
 

  const [solutionData, setSolutionData] = useState<{
    solution: { name: string; notes: string[]; displayedNotes: string[] };
    solutionGameDate: Date;
    solutionIndex: number;
    tomorrow: number;
  }>({
    solution: { name: '', notes: [], displayedNotes: [] },
    solutionGameDate: new Date(),
    solutionIndex: 0,
    tomorrow: 0,
  });
  useEffect(() => {
    async function fetchSolution() {
      try {
        const data = await getSolution(getGameDate());
        setSolutionData(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching solution:', error);
      }
    }
  
    fetchSolution();
  }, []);

  const sampler = new Tone.Sampler({
    urls: {
      C4: "C4.mp3",
      "D#4": "Ds4.mp3",
      "F#4": "Fs4.mp3",
      A4: "A4.mp3",
    },
      baseUrl: "https://tonejs.github.io/audio/salamander/",
  }).toDestination();

  const noteSequenceRef = useRef<Tone.Sequence | null>(null);
  

  const handleButtonClick = () => {
    console.log('Button was clicked!');
    if (Tone.context.state !== "running") {
        Tone.start();
    }

    // Append '4' to each note in the array
    const notesWithOctave = solutionData.solution.notes.map(note => `${note}4`);

    // Stop and dispose the existing sequence if it exists
    if (noteSequenceRef.current) {
        noteSequenceRef.current.stop();
        noteSequenceRef.current.dispose();
    }

    // Create a new sequence with the updated notes
    const noteSequence = new Tone.Sequence((time, note) => {
        sampler.triggerAttackRelease(note, '0.5', time);
    }, notesWithOctave, '4n');

    // Save the sequence to the ref
    noteSequenceRef.current = noteSequence;

    // Stop the Tone.Transport and schedule the sequence to start
    Tone.Transport.cancel(); // Cancel scheduled events
    Tone.Transport.stop(); // Stop the transport if it's running
    noteSequence.start(0);
    Tone.Transport.start();

    // Optionally, stop the sequence after a fixed duration
    // Adjust the duration based on the length of your sequence and tempo
    noteSequence.stop('+1.3');
};

  
  const concatenatedNotes = solutionData.solution.notes.join('');

  // const [solution, setSolution] =useState('');
  const { showError: showErrorAlert, showSuccess: showSuccessAlert } =
    useAlert()
  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState(false)
  const [isMigrateStatsModalOpen, setIsMigrateStatsModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [currentRowClass, setCurrentRowClass] = useState('')
  const [isGameLost, setIsGameLost] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme')
      ? localStorage.getItem('theme') === 'dark'
      : prefersDarkMode
      ? true
      : false
  )
  const [isHighContrastMode, setIsHighContrastMode] = useState(
    getStoredIsHighContrastMode()
  )

  const [isRevealing, setIsRevealing] = useState(false)
  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage(isLatestGame)
    if (loaded?.solution !== concatenatedNotes) {
      return []
    }
    const gameWasWon = loaded.guesses.includes(concatenatedNotes)
    if (gameWasWon) {
      setIsGameWon(true)
    }
    if (loaded.guesses.length === MAX_CHALLENGES && !gameWasWon) {
      setIsGameLost(true)
      showErrorAlert(CORRECT_CHORD_MESSAGE(solutionData.solution), {
        persist: true,
      })
    }
    return loaded.guesses
  })

  const [stats, setStats] = useState(() => loadStats())

  useEffect(() => {
    // if no game state on load,
    // show the user the how-to info modal
    if (!loadGameStateFromLocalStorage(true)) {
      setTimeout(() => {
        setIsInfoModalOpen(true)
      }, WELCOME_INFO_MODAL_MS)
    }
  })

  useEffect(() => {
    DISCOURAGE_INAPP_BROWSERS &&
      isInAppBrowser() &&
      showErrorAlert(DISCOURAGE_INAPP_BROWSER_TEXT, {
        persist: false,
        durationMs: 7000,
      })
  }, [showErrorAlert])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    if (isHighContrastMode) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }
  }, [isDarkMode, isHighContrastMode])

  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  const handleHighContrastMode = (isHighContrast: boolean) => {
    setIsHighContrastMode(isHighContrast)
    setStoredIsHighContrastMode(isHighContrast)
  }

  const clearCurrentRowClass = () => {
    setCurrentRowClass('')
  }

  useEffect(() => {
    saveGameStateToLocalStorage(getIsLatestGame(), { guesses, solution: concatenatedNotes})
  }, [guesses])

  useEffect(() => {
    if (isGameWon) {
      const messages = WIN_MESSAGES(solutionData.solution)
      const winMessage = messages[Math.floor(Math.random() * WIN_MESSAGES.length)]
      const delayMs = REVEAL_TIME_MS * solutionData.solution.notes.length

      showSuccessAlert(winMessage, {
        delayMs,
        onClose: () => setIsStatsModalOpen(true),
      })
    }

    if (isGameLost) {
      setTimeout(
        () => {
          setIsStatsModalOpen(true)
        },
        (solutionData.solution.notes.length + 1) * REVEAL_TIME_MS
      )
    }
  }, [isGameWon, isGameLost, showSuccessAlert])

  const splitGuess = splitGuessIntoNotes(currentGuess);


  const onChar = (value: string) => {
    
    if (
      (splitGuess.length + 1) <= solutionData.solution.notes.length &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setCurrentGuess(`${currentGuess}${value}`)
      if (Tone.context.state !== "running") {
        Tone.start();
      }
      const noteToPlay = `${value}4`;
      sampler.triggerAttackRelease(noteToPlay, 1.5);
    }
  }

  const onEnter = () => {
    if (isGameWon || isGameLost) {
      return
    }

    if (splitGuess.length !== solutionData.solution.notes.length) {
      setCurrentRowClass('jiggle')
      return showErrorAlert(NOT_ENOUGH_NOTES_MESSAGE, {
        onClose: clearCurrentRowClass,
      })
    }

    setIsRevealing(true)
    // turn this back off after all
    // chars have been revealed
    setTimeout(() => {
      setIsRevealing(false)
    }, REVEAL_TIME_MS * solutionData.solution.notes.length)

    const WinningChord = isWinningChord(currentGuess, concatenatedNotes)

    if (
      splitGuess.length === solutionData.solution.notes.length &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')

      if (WinningChord) {
        if (isLatestGame) {
          setStats(addStatsForCompletedGame(stats, guesses.length))
        }
        return setIsGameWon(true)
      }

      if (guesses.length === MAX_CHALLENGES - 1) {
        if (isLatestGame) {
          setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        }
        setIsGameLost(true)
        showErrorAlert(CORRECT_CHORD_MESSAGE(solutionData.solution), {
          persist: true,
          delayMs: REVEAL_TIME_MS * solutionData.solution.notes.length + 1,
        })
      }
    }
  }

  return (
    <Div100vh>
      <div className="flex h-full flex-col">
        <Navbar
          setIsInfoModalOpen={setIsInfoModalOpen}
          setIsStatsModalOpen={setIsStatsModalOpen}
          setIsDatePickerModalOpen={setIsDatePickerModalOpen}
          setIsSettingsModalOpen={setIsSettingsModalOpen}
        />

        {!isLatestGame && (
          <div className="flex items-center justify-center">
            <ClockIcon className="h-6 w-6 stroke-gray-600 dark:stroke-gray-300" />
            <p className="text-base text-gray-600 dark:text-gray-300">
              {format(gameDate, 'd MMMM yyyy', { locale: DATE_LOCALE })}
            </p>
          </div>
        )}

        <div className="mx-auto flex w-full grow flex-col px-1 pt-2 pb-8 sm:px-6 md:max-w-7xl lg:px-8 short:pb-2 short:pt-2">
          <div className="flex grow flex-col justify-center pb-2 short:pb-1">
            <div className='grid-board'>             
              <Grid
                solution={solutionData.solution}
                guesses={guesses}
                currentGuess={currentGuess}
                isRevealing={isRevealing}
                currentRowClassName={currentRowClass}/>
            </div>

            <div className="rotate-button flex justify-center">
                <RotatorButton onClick={handleButtonClick}/>
            </div>
          
            <div className='piano-board'>
              <Piano
                onChar={onChar}
                onEnter={onEnter}
                solution={solutionData.solution}
                guesses={guesses}
              />
            </div>
          </div>



          <InfoModal
            isOpen={isInfoModalOpen}
            handleClose={() => setIsInfoModalOpen(false)}
          />
          <StatsModal
            isOpen={isStatsModalOpen}
            handleClose={() => setIsStatsModalOpen(false)}
            solution={solutionData.solution}
            guesses={guesses}
            gameStats={stats}
            isLatestGame={isLatestGame}
            isGameLost={isGameLost}
            isGameWon={isGameWon}
            handleShareToClipboard={() => showSuccessAlert(GAME_COPIED_MESSAGE)}
            handleShareFailure={() =>
              showErrorAlert(SHARE_FAILURE_TEXT, {
                durationMs: LONG_ALERT_TIME_MS,
              })
            }
            handleMigrateStatsButton={() => {
              setIsStatsModalOpen(false)
              setIsMigrateStatsModalOpen(true)
            }}
            isDarkMode={isDarkMode}
            isHighContrastMode={isHighContrastMode}
            numberOfGuessesMade={guesses.length}
            solutionGameDate={solutionData.solutionGameDate}
            tomorrow={solutionData.tomorrow}
            solutionIndex={solutionData.solutionIndex}
          />
          <DatePickerModal
            isOpen={isDatePickerModalOpen}
            initialDate={solutionData.solutionGameDate}
            handleSelectDate={(d) => {
              setIsDatePickerModalOpen(false)
              setGameDate(d)
            }}
            handleClose={() => setIsDatePickerModalOpen(false)}
          />
          <MigrateStatsModal
            isOpen={isMigrateStatsModalOpen}
            handleClose={() => setIsMigrateStatsModalOpen(false)}
          />
          <SettingsModal
            isOpen={isSettingsModalOpen}
            handleClose={() => setIsSettingsModalOpen(false)}
            isDarkMode={isDarkMode}
            handleDarkMode={handleDarkMode}
            isHighContrastMode={isHighContrastMode}
            handleHighContrastMode={handleHighContrastMode}
          />
          <AlertContainer />
        </div>
      </div>
    </Div100vh>
  )
}

export default App

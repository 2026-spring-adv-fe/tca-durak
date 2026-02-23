import './App.css'
import { HashRouter, Routes, Route} from 'react-router'
import { Home } from './Home'
import { Setup } from './Setup'
import { PlayPage } from './PlayPage'
import type { GameResult } from './GameResults'
import { getGeneralFacts } from './GameResults'
import { useState } from 'react'

const dummyGameResults: GameResult[] = [
    {
        winner: "Harry",
        players: [
            "Harry",
            "Hermione",
            "Ron",
        ],
        start: "2026-01-11T11:55:50.620Z",
        end: "2026-01-11T13:43:50.320Z",
    },
    {
        winner: "Hermione",
        players: [
            "Harry",
            "Hermione",
            "Ron",
        ],
        start: "2026-02-14T18:23:50.320Z",
        end: "2026-02-14T19:43:50.320Z",
    },  
];


const App = () => {

  //react hooks 
  const addNewGameResult = (gameResult: GameResult) => setGameResults(
    [
      ...gameResults,
      gameResult,

    ]
  )


  const [gameResults, setGameResults] = useState(dummyGameResults);
  // const [gameResults, setGameResults] = useState(dummyGameResults);


  return (

    <div> 
      <HashRouter>
        <Routes>
          <Route 
          path='/'
          element={
            <Home 
              generalFacts={
                getGeneralFacts(gameResults)
              }
            />
          }
          />
          <Route 
          path='/setup'
          element={
            <Setup />
          }
          />
          <Route 
          path='/PlayPage'
          element={
           <PlayPage 
           addNewGameResult={
              addNewGameResult 
          }/>
          }
          />
          
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App

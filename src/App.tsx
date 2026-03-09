import './App.css'
import { HashRouter, Routes, Route} from 'react-router'
import { APP_TITLE, Home } from './Home'
import { Setup } from './Setup'
import { PlayPage } from './PlayPage'
import type { GameResult } from './GameResults'
import { getGeneralFacts, getLeaderboard } from './GameResults'
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

  const [title, setTitle] = useState(APP_TITLE);
  // const [gameResults, setGameResults] = useState(dummyGameResults);


  return (

    <div> 


      <div className="navbar bg-neutral text-neutral-content overflow-x-hidden">
         <p className='text-xl font-bold'>{
         title}</p>
      </div>


      <div className="p-4">
        <HashRouter>
        <Routes>
          <Route 
          path='/'
          element={
            <Home 
            setTitle={setTitle}
              generalFacts={
                getGeneralFacts(gameResults)
              }
              leaderboard={
                getLeaderboard(gameResults)
              }
            />
          }
          />
          <Route 
          path='/setup'
          element={
            <Setup 
            setTitle={setTitle}
            />
          }
          />
          <Route 
          path='/PlayPage'
          element={
           <PlayPage 
           
           addNewGameResult={
              addNewGameResult 
          }
          setTitle={setTitle}/>
          }
          />
          
        </Routes>
      </HashRouter>
      </div>
    </div>
  )
}

export default App

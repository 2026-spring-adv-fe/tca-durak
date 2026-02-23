import './App.css'
import { HashRouter, Routes, Route} from 'react-router'
import { Home } from './Home'
import { Setup } from './Setup'
import { PlayPage } from './PlayPage'
import type { GameResult } from './GameResults'

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

  return (

    <div> 
      <HashRouter>
        <Routes>
          <Route 
          path='/'
          element={
            <Home />
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
           <PlayPage />
          }
          />
          
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App

import './App.css'
import { HashRouter, Routes, Route} from 'react-router'
import { Home } from './Home'
import { Setup } from './Setup'
const PlayPage = () => <h1>play page</h1>;



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

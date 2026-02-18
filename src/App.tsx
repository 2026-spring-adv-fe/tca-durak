import './App.css'
import { HashRouter, Routes, Route} from 'react-router'
import { Home } from './Home'
import { Setup } from './Setup'
import { PlayPage } from './PlayPage'


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

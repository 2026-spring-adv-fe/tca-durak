import './App.css'
import { HashRouter, Routes, Route} from 'react-router'
import { Home } from './Home'
const Setup = () => <h1>setup</h1>;
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

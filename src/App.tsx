import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    
    <div className='p-5'>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className='text-3xl'>Vite + React</h1>
      <div className="card">
        <button className='btn btn-lg btn-outline lg:w-64 btn-primary my-5' onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

    <div className="card bg-base-100 w-full shadow-lg">
      <div className="card-body p-2">
        <h2 className="card-title">miu</h2>
          <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
      </div>
    </div>
    <div className="card bg-base-100 w-full shadow-lg">
      <div className="card-body p-2">
        <h2 className="card-title">miu</h2>
          <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
      </div>
    </div>
    <div className="card bg-base-100 w-full shadow-lg">
      <div className="card-body p-2">
        <h2 className="card-title">miu</h2>
          <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
      </div>
    </div>
    <div className="card bg-base-100 w-full shadow-lg">
      <div className="card-body p-2">
        <h2 className="card-title">miu</h2>
          <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
      </div>
    </div>
    <div className="card bg-base-100 w-full shadow-lg">
      <div className="card-body p-2">
        <h2 className="card-title">miu</h2>
          <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
      </div>
    </div>
    <div className="card bg-base-100 w-full shadow-lg">
      <div className="card-body p-2">
        <h2 className="card-title">miu</h2>
          <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
      </div>
    </div>




    </div>
  )
}

export default App

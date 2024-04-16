import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex justify-center">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <div className="text-textBody dark:text-dark-textBody">
        <h1>Vite + React</h1>
        <button
          className='rounded-lg p-1 border-2
          border-buttonNormal text-buttonNormal 
          dark:border-dark-buttonNormal dark:text-dark-buttonNormal'
          onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>

        <p >
          Click on the Vite and React logos to learn more
        </p >
      </div>
    </>
  )
}

export default App

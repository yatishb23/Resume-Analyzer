import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { NavBar } from './components/nav-bar'
import { ResumeChecker } from './components/resume'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='m-0 p-0'>
     <NavBar/>
     <ResumeChecker/>
    </div>
  )
}

export default App

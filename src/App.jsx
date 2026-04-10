import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { VideoEmbed } from './components/VideoEmbed'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{width: '250px', aspectRatio: '16/9'}}>
      <VideoEmbed videoId="OxoOCp24Ojk"/>
    </div>
  )
}

export default App

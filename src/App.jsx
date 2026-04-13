import { VideoEmbed } from './components/VideoEmbed'
import { WonderwallCardStandard } from './components/WonderwallCardStandard'
import './App.css'

function App() {

  return (
    <div className='wonderwall'>
      <WonderwallCardStandard cardColor='Black' title='77%' subtitle='Fewer false alerts' description='Absa uses AI to outsmart financial crime' footerLinkText='Read more'/>
    </div>
  )
}

export default App

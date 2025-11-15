import { Canvas} from '@react-three/fiber'
import './App.css'
import Experience from './Experience'

function App() {
  return (
    <>
       <Canvas flat camera={{position: [0, 0, 5]}}>
        <color args={["#000814"]} attach={"background"}/>
        <Experience />
      </Canvas>
    </>
  )
}

export default App

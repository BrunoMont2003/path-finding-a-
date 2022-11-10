import './style.css'
import { setup } from './astar'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h1>Path Finding with A* algorithm!</h1>
  <canvas 
  id="canvas"
></canvas>
`
await setup(document.querySelector('#canvas') as HTMLCanvasElement)

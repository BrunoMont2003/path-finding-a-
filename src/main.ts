import './style.css'
import { begin } from './astar'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h1>Path Finding with A* algorithm!</h1>
  <div class="container" id='container' >
    <canvas 
    id="canvas"
    ></canvas>
    <button class='btn btnStart' id="btnStart">
      Start
    </button>
  </div>
`
begin(
  document.querySelector('#canvas') as HTMLCanvasElement,
  document.querySelector('#btnStart') as HTMLButtonElement
)

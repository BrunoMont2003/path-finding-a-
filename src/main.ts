import './style.css'
import { begin } from './astar'
import flag from './img/flag.png'
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h1>Path Finding with A* algorithm!</h1>
  <div class="container" id='container' >
    <canvas 
    id="canvas"
    ></canvas>
    <button class='btn btnStart' id="btnStart">
      Start
    </button>
    <img src=${flag} class="red-flag">
  </div>
`
begin(
  document.querySelector('#canvas') as HTMLCanvasElement,
  document.querySelector('#btnStart') as HTMLButtonElement
)

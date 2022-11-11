import Casilla from './classes/Casilla'
import Ruta from './classes/Ruta'
import heuristica from './helpers/heuristica'
import logger from './helpers/logger'
import { createRestartButton } from './helpers/restart'

const columnas: number = 20
const filas: number = 20
const FPS: number = 500
let terminado: boolean = false
var sigue: boolean = true
const parent = document.getElementById('app') as HTMLDivElement

// creamos un array 2D
const createArray2D = (filas: number, columnas: number): any[] => {
  const array: any = []
  for (let i = 0; i < filas; i++) {
    array.push([])
    for (let j = 0; j < columnas; j++) {
      array[i].push([])
    }
  }
  return array
}

const borrarCanvas = (canvas: HTMLCanvasElement) => {
  const context = canvas.getContext('2d')!
  context.clearRect(0, 0, canvas.width, canvas.height)
}

const dibujarEscenario = (
  escenario: Casilla[][],
  filas: number,
  columnas: number,
  context: CanvasRenderingContext2D,
  tileWidth: number,
  tileHeight: number,
  ruta: Ruta
) => {
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      escenario[i][j].dibujar(context, tileWidth, tileHeight)
    }
  }
  for (let i = 0; i < ruta.openset.length; i++) {
    const element = ruta.openset[i]
    element.dibujarOS(context, tileWidth, tileHeight)
  }
  for (let i = 0; i < ruta.closedSet.length; i++) {
    const element = ruta.closedSet[i]
    element.dibujarCS(context, tileWidth, tileHeight)
  }
  for (let i = 0; i < ruta.camino.length; i++) {
    const element = ruta.camino[i]
    element.dibujarCamino(context, tileWidth, tileHeight)
  }
}

const astar = (ruta: Ruta) => {
  // seguimos hasta encontrar la solución
  if (!terminado && sigue) {
    //Sigue se convierte falso. Si realmente sigue, se vuelve true
    sigue = false
    // seguimos si hay algo en openset
    if (ruta.openset.length > 0) {
      let ganador = 0 // indice del mejor candidato

      // evaluamos el mejor candidato dentro de openset
      for (let i = 0; i < ruta.openset.length; i++) {
        if (ruta.openset[i].getF() < ruta.openset[ganador].getF()) {
          ganador = i
        }
      }

      // analizamos la casilla ganadora
      const actual = ruta.openset[ganador]
      // si es el destino, hemos terminado
      if (actual === ruta.destino) {
        let temp: Casilla = actual
        ruta.camino.push(temp)
        while (temp.getPadre() !== null) {
          // dibujamos el camino
          temp = temp.getPadre() as Casilla
          ruta.camino.push(temp)
        }
        console.log('Camino Encontrado!')
        logger(parent, 'Camino Encontrado!', true)
        createRestartButton(parent)
        terminado = true
      }
      // si no, seguimos
      else {
        sigue = true
        // borramos la casilla ganadora de openset
        ruta.openset.splice(ganador, 1)
        // la añadimos a closedset
        ruta.closedSet.push(actual)

        const vecinos = actual.getVecinos()
        // analizamos los vecinos
        for (let i = 0; i < vecinos.length; i++) {
          const vecino = vecinos[i]
          // si el vecino no está en closedset y no es un obstáculo
          if (!ruta.closedSet.includes(vecino) && !vecino.esObstaculo()) {
            // calculamos el coste del camino
            const tempG = actual.getG() + 1
            // si el vecino está en openset y su peso es mayor
            if (ruta.openset.includes(vecino) && tempG < vecino.getG()) {
              vecino.setG(tempG) // camino más corto
            }
            // si no está en openset
            else if (!ruta.openset.includes(vecino)) {
              vecino.setG(tempG)
              ruta.openset.push(vecino)
            }

            // calculamos el coste del camino
            vecino.setH(heuristica(vecino, ruta.destino))
            // calculamos el coste total
            vecino.setF(vecino.getG() + vecino.getH())

            // guardamos el padre (de dónde venimos)
            vecino.setPadre(actual)
          }
        }
      }
    }
  } else {
    console.log('No hay camino posible')
    logger(parent, 'No hay camino posible', false)
    createRestartButton(parent)
    terminado = true
  }
}

export const setup = async (canvas: HTMLCanvasElement) => {
  const context = canvas.getContext('2d')!
  // calculamos el tamaño de los tiles proporcionalmente
  const tileWidth = canvas.width / columnas
  const tileHeight = canvas.height / filas

  // creamos la matriz
  const escenario = createArray2D(filas, columnas)

  // añadimos casillas al escenario
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      escenario[i][j] = new Casilla(i, j)
    }
  }

  // añadimos los vecinos a cada casilla
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      escenario[i][j].setVecinos(escenario)
    }
  }

  // generamos ruta
  const ruta = new Ruta(escenario[0][0], escenario[filas - 1][columnas - 1])

  // si el origen y el destino son iguales, son casillas de tipo obstáculo
  if (ruta.origen === ruta.destino) {
    terminado = true
    console.log('No hay camino posible')
    logger(parent, 'No hay camino posible', false)
    createRestartButton(parent)
  }

  //   ejecutamos el bucle principal
  while (!terminado) {
    borrarCanvas(canvas)
    astar(ruta)
    //console.log(finalizado)
    dibujarEscenario(
      escenario,
      filas,
      columnas,
      context,
      tileWidth,
      tileHeight,
      ruta
    )
    // sleep 5 seconds
    await new Promise((r) => setTimeout(r, 5000 / FPS))
  }
}

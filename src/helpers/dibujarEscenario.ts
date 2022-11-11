import Casilla from '../classes/Casilla'
import Ruta from '../classes/Ruta'

export const dibujarEscenarioSinCamino = (
  escenario: Casilla[][],
  canvas: HTMLCanvasElement
) => {
  const filas = escenario.length
  const columnas = escenario[0].length
  const context = canvas.getContext('2d') as CanvasRenderingContext2D
  const tileHeight = canvas.height / filas
  const tileWidth = canvas.width / columnas
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      escenario[i][j].dibujar(context, tileWidth, tileHeight)
    }
  }
}

export const dibujarEscenarioConCamino = (
  escenario: Casilla[][],
  canvas: HTMLCanvasElement,
  ruta: Ruta
) => {
  const filas = escenario.length
  const columnas = escenario[0].length
  const context = canvas.getContext('2d') as CanvasRenderingContext2D
  const tileHeight = canvas.height / filas
  const tileWidth = canvas.width / columnas
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

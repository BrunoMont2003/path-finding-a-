import Casilla from '../classes/Casilla'

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

export const crearEscenarioDeUnaMatriz = (matrix: any[][]): Casilla[][] => {
  const filas = matrix.length
  const columnas = matrix[0].length

  // añadimos casillas al escenario
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      matrix[i][j] = new Casilla(i, j)
    }
  }

  // añadimos los vecinos a cada casilla
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      matrix[i][j].setVecinos(matrix)
    }
  }

  return matrix
}

export const crearEscenarioAleatorio = (
  filas: number,
  columnas: number
): Casilla[][] => {
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

  return escenario
}

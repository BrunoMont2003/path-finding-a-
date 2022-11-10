import Casilla from '../classes/Casilla'

const heuristica = (a: Casilla, b: Casilla) => {
  const x = Math.abs(a.getX() - b.getX())
  const y = Math.abs(a.getY() - b.getY())

  return x + y
}

export default heuristica

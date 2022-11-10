import Casilla from './Casilla'

class Ruta {
  public openset: Casilla[] = []
  public closedSet: Casilla[] = []
  public camino: Casilla[] = []
  constructor(public origen: Casilla, public destino: Casilla) {
    this.openset.push(origen)
  }
}

export default Ruta

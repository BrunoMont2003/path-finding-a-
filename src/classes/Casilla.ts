import colors from '../colors'
class Casilla {
  private tipo: number = 0 // 0: libre, 1: obstaculo
  private f: number = 0 // coste total (f = g + h)
  private g: number = 0
  private h: number = 0
  private vecinos: Casilla[] = []
  private padre: Casilla | null = null
  constructor(public x: number, public y: number) {
    if (Math.floor(Math.random() * 5) === 1) {
      this.tipo = 1
    }
  }

  public getX(): number {
    return this.x
  }
  public getY(): number {
    return this.y
  }
  public esObstaculo(): boolean {
    return this.tipo === 1
  }
  public getF(): number {
    return this.f
  }
  public setF(f: number): void {
    this.f = f
  }
  public getG(): number {
    return this.g
  }
  public setG(g: number): void {
    this.g = g
  }
  public getH(): number {
    return this.h
  }
  public setH(h: number): void {
    this.h = h
  }
  public setVecinos(escenario: Casilla[][]): void {
    if (this.x > 0) {
      this.vecinos.push(escenario[this.x - 1][this.y]) // vecino de la izquierda
    }
    if (this.x < escenario.length - 1) {
      this.vecinos.push(escenario[this.x + 1][this.y]) // vecino de la derecha
    }
    if (this.y > 0) {
      this.vecinos.push(escenario[this.x][this.y - 1]) // vecino de arriba
    }
    if (this.y < escenario[0].length - 1) {
      this.vecinos.push(escenario[this.x][this.y + 1]) // vecino de abajo
    }
  }

  public getVecinos(): Casilla[] {
    return this.vecinos
  }

  public getPadre(): Casilla | null {
    return this.padre
  }
  public setPadre(padre: Casilla): void {
    this.padre = padre
  }
  public dibujar(
    context: CanvasRenderingContext2D,
    tileWidth: number,
    tileHeight: number
  ): void {
    if (this.tipo === 0) {
      context.fillStyle = colors.libre
    }
    if (this.tipo === 1) {
      context.fillStyle = colors.obstaculo
    }
    context.fillRect(
      this.x * tileWidth, // donde empieza en el eje x a dibujar
      this.y * tileHeight, // donde empieza en el eje y a dibujar
      tileWidth, // ancho del rectangulo
      tileHeight // alto del rectangulo
    )
  }

  public dibujarOS(
    context: CanvasRenderingContext2D,
    tileWidth: number,
    tileHeight: number
  ): void {
    context.fillStyle = colors.openset
    context.fillRect(
      this.x * tileWidth, // donde empieza en el eje x a dibujar
      this.y * tileHeight, // donde empieza en el eje y a dibujar
      tileWidth, // ancho del rectangulo
      tileHeight // alto del rectangulo
    )
  }

  public dibujarCS(
    context: CanvasRenderingContext2D,
    tileWidth: number,
    tileHeight: number
  ): void {
    context.fillStyle = colors.closedset
    context.fillRect(
      this.x * tileWidth, // donde empieza en el eje x a dibujar
      this.y * tileHeight, // donde empieza en el eje y a dibujar
      tileWidth, // ancho del rectangulo
      tileHeight // alto del rectangulo
    )
  }

  public dibujarCamino(
    context: CanvasRenderingContext2D,
    tileWidth: number,
    tileHeight: number
  ): void {
    
    context.fillStyle = colors.camino
    context.fillRect(
      this.x * tileWidth, // donde empieza en el eje x a dibujar
      this.y * tileHeight, // donde empieza en el eje y a dibujar
      tileWidth, // ancho del rectangulo
      tileHeight // alto del rectangulo
    )
  }
}
export default Casilla

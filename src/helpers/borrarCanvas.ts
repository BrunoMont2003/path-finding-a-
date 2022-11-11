const borrarCanvas = (canvas: HTMLCanvasElement) => {
  const context = canvas.getContext('2d')!
  context.clearRect(0, 0, canvas.width, canvas.height)
}
export default borrarCanvas
